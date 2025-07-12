import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, AuthError } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, provider } from '../firebase';

const Login = () => {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, authEmail, authPassword);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const error = err as AuthError;
      setAuthError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const error = err as AuthError;
      setAuthError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo copy.png" alt="Supaimg" className="h-10 w-10 mr-1" />
          <h1 className="text-2xl font-bold tracking-tight mr-10">Supaimg</h1>
        </div>
        <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={authEmail}
            onChange={e => setAuthEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={authPassword}
            onChange={e => setAuthPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {authError && <div className="text-red-500 text-sm text-center">{authError}</div>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-xs font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors mb-2"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.91 2.54 30.34 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.13 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.99 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.13-3.37-1.13-7.01 0-10.38l-7.98-6.2C.99 16.09 0 19.94 0 24c0 4.06.99 7.91 2.69 12.29l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.34 0 11.91-2.09 15.88-5.7l-7.19-5.59c-2.01 1.35-4.59 2.15-8.69 2.15-6.43 0-11.87-3.63-14.33-8.89l-7.98 6.2C6.73 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          Sign up with Google
        </button>
        <div className="w-full text-center mt-2 text-gray-600 text-sm">
          Don&apos;t have an account? <span className="font-semibold text-black cursor-pointer hover:underline" onClick={() => {/* Add sign up logic here */}}>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Login; 