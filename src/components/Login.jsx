import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const ensureProfile = async (userId) => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      // If profile doesn't exist, create it with just user_id
      if (checkError || !existingProfile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({ id: userId });

        if (insertError) {
          console.error('Error creating profile:', insertError);
        }
      }
    } catch (err) {
      console.error('Profile check/create error:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setMessage(null);
      setLoading(true);
      const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err?.message || 'Google sign-in failed.');
    } finally {
      // keep loading until redirect happens
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      // Register 
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (!signUpError && signUpData.user) {
        // Create profile with user_id
        await ensureProfile(signUpData.user.id);
        try { localStorage.setItem('supaimg_email', email); } catch {}
        try { sessionStorage.setItem('supaimg_password', password); } catch {}
        setTimeout(() => {
          onLogin?.();
        }, 600); // small delay so the skeleton is visible
        return;
      }

      // If user already exists, fall back to sign-in
      const alreadyRegistered = /already registered|user already exists|exists/i.test(signUpError.message || '') || signUpError.status === 422;
      if (alreadyRegistered) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        if (signInData.session && signInData.user) {
          // Ensure profile exists for existing user
          await ensureProfile(signInData.user.id);
          setMessage('Signed in successfully.');
          try { localStorage.setItem('supaimg_email', email); } catch {}
          try { sessionStorage.setItem('supaimg_password', password); } catch {}
          setTimeout(() => {
            onLogin?.();
          }, 600);
          return;
        }
      }

      // Any other error
      throw signUpError;
    } catch (err) {
      const msg = err?.message || 'Authentication failed.';
      // Friendlier errors for common cases
      if (/password/.test(msg) && /weak|short|least/i.test(msg)) {
        setError('Password is too weak. Please use at least 8 characters.');
      } else if (/invalid login credentials/i.test(msg)) {
        setError('Invalid email/password. Please try again.');
      } else {
        setError(msg);
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex auth-rounded">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="/first.png" 
          alt="Blue stairs in Morocco" 
          className="w-full h-full object-cover"
        />
        {/* Logo overlay on image */}
        <div className="absolute top-8 left-8">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Supaimg!</h1>
            <p className="text-gray-600">Create your account or sign in</p>
          </div>

          {/* Login Form */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-300 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-16 bg-gray-100 rounded-xl" />
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</div>
            )}
            {message && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">{message}</div>
            )}
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="auth-cta w-full bg-gray-900 text-white py-3 px-4 font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60"
            >
              Register
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              {/* Sign in as Zeeshan (demo button only) */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">Z</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">Sign in as Zeeshan</div>
                    <div className="text-xs text-gray-500">zeeshan@gmail.com</div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {/* Sign in with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors space-x-3"
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 