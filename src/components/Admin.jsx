import { useEffect, useState } from 'react';
import { FiInbox, FiLock, FiLogOut, FiMail, FiUser } from 'react-icons/fi';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../lib/firebase.js';

function friendlyAuthError(code) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is switched off — enable it in Firebase Console → Authentication.';
    case 'auth/invalid-email':
      return 'That email address is not valid.';
    default:
      return 'Could not sign in. Please check your connection and try again.';
  }
}

function formatWhen(value) {
  if (!value || typeof value.toDate !== 'function') return 'Just now';
  return value.toDate().toLocaleString();
}

function Admin() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [busy, setBusy] = useState(false);

  const [messages, setMessages] = useState([]);
  const [listError, setListError] = useState('');
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setAuthReady(true);
      },
      () => {
        setUser(null);
        setAuthReady(true);
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setListLoading(false);
      return undefined;
    }

    setListLoading(true);
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(100),
    );

    // If Firestore never answers (API disabled / offline), stop waiting
    // instead of showing "Loading…" forever.
    let answered = false;
    const stuckTimer = setTimeout(() => {
      if (answered) return;
      setListLoading(false);
      setListError(
        'Firebase is not answering. Check that Cloud Firestore is enabled for this project in the Firebase Console.',
      );
    }, 15000);

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        answered = true;
        clearTimeout(stuckTimer);
        setMessages(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
        setListError('');
        setListLoading(false);
      },
      (error) => {
        answered = true;
        clearTimeout(stuckTimer);
        console.error('Firestore listen failed:', error);
        setListError(
          error.code === 'permission-denied'
            ? 'Not allowed to read messages. Update the Firestore rules for the messages collection.'
            : `Could not load messages: ${error.message}`,
        );
        setListLoading(false);
      },
    );

    return () => {
      clearTimeout(stuckTimer);
      unsubscribe();
    };
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword('');
    } catch (error) {
      console.error('Sign-in failed:', error);
      setLoginError(friendlyAuthError(error.code));
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setLoginError('');
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  return (
    <div className="admin">
      <header className="admin__bar">
        <a className="brand" href="#home">
          <span className="brand__accent">J</span>
          awad.
        </a>
        <div className="admin__bar-actions">
          {user && (
            <>
              <span className="admin__who">
                <FiMail aria-hidden="true" />
                {user.email}
              </span>
              <button type="button" className="admin__btn" onClick={handleSignOut}>
                <FiLogOut aria-hidden="true" />
                Sign out
              </button>
            </>
          )}
          <a className="admin__btn" href="#home">
            Back to site
          </a>
        </div>
      </header>

      {!authReady && <p className="admin__note">Checking access…</p>}

      {authReady && !user && (
        <section className="admin__login" aria-labelledby="admin-login-heading">
          <h1 id="admin-login-heading">
            <FiLock aria-hidden="true" />
            Admin sign in
          </h1>
          <p>Sign in to read the messages sent from your portfolio.</p>

          <form onSubmit={handleLogin} noValidate>
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" className="btn btn--primary" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>

            {loginError && (
              <p className="admin__error" role="alert">
                {loginError}
              </p>
            )}
          </form>
        </section>
      )}

      {authReady && user && (
        <section className="admin__inbox" aria-labelledby="admin-inbox-heading">
          <div className="admin__inbox-head">
            <h1 id="admin-inbox-heading">
              <FiInbox aria-hidden="true" />
              Messages
            </h1>
            <span className="admin__count">
              {listLoading ? 'Loading…' : `${messages.length} message${messages.length === 1 ? '' : 's'}`}
            </span>
          </div>

          {listError && (
            <p className="admin__error" role="alert">
              {listError}
            </p>
          )}

          {!listLoading && !listError && messages.length === 0 && (
            <p className="admin__note">No messages yet — share your portfolio to get some.</p>
          )}

          <ul className="admin__list">
            {messages.map((item) => (
              <li className="admin__card" key={item.id}>
                <div className="admin__card-head">
                  <span className="admin__name">
                    <FiUser aria-hidden="true" />
                    {item.name || 'Anonymous'}
                  </span>
                  <time dateTime={item.createdAt?.toDate?.().toISOString?.() ?? undefined}>
                    {formatWhen(item.createdAt)}
                  </time>
                </div>

                <p className="admin__subject">{item.subject || '(no subject)'}</p>

                <a className="admin__email" href={`mailto:${item.email}`}>
                  {item.email}
                </a>

                <p className="admin__message">{item.message}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Admin;
