import React, { useEffect, useState } from 'react';
import { Mail, Lock, User, CheckCircle2, AlertCircle, Loader2, LogIn, UserPlus, Link2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  autoComplete?: string;
}> = ({ label, type = 'text', value, onChange, icon, placeholder, autoComplete }) => {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/30 text-sm"
        />
      </div>
    </div>
  );
};

const Notice: React.FC<{ kind: 'success' | 'error'; message: string }> = ({ kind, message }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
    kind === 'success'
      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200'
  }`}>
    {kind === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
    <span>{message}</span>
  </div>
);

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [userUsername, setUserUsername] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
      const display = (data.user?.user_metadata as any)?.name || (data.user?.email ? data.user.email.split('@')[0] : null);
      const uname = (data.user?.user_metadata as any)?.username || null;
      setUserName(display ?? null);
      setUserUsername(uname);
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUserEmail(session?.user?.email ?? null);
      const display = (session?.user?.user_metadata as any)?.name || (session?.user?.email ? session.user.email.split('@')[0] : null);
      const uname = (session?.user?.user_metadata as any)?.username || null;
      setUserName(display ?? null);
      setUserUsername(uname);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Prefill from Login.jsx storage when signed out
  useEffect(() => {
    if (!userEmail) {
      try {
        const ls = localStorage.getItem('supaimg_email');
        if (ls) setEmail(ls);
      } catch {}
      try {
        const pw = sessionStorage.getItem('supaimg_password');
        if (pw) setPassword(pw);
      } catch {}
    }
  }, [userEmail]);

  const act = async (fn: () => Promise<any>, successMessage: string) => {
    setLoading(true);
    setNotice(null);
    try {
      const { error } = await fn();
      if (error) throw error;
      setNotice({ kind: 'success', message: successMessage });
    } catch (e: any) {
      setNotice({ kind: 'error', message: e?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  const signIn = () => act(
    async () => await supabase.auth.signInWithPassword({ email, password }),
    'Signed in successfully.'
  );

  const signUp = async () => {
    setLoading(true);
    setNotice(null);
    try {
      const { error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (signUpError) throw signUpError;

      // Try immediate sign-in so the profile panel appears right away
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (!signInError && signInData?.session) {
        const { data: me } = await supabase.auth.getUser();
        const u = me.user;
        setUserEmail(u?.email ?? email);
        const display = (u?.user_metadata as any)?.name || (u?.email ? u.email.split('@')[0] : name || null);
        const uname = (u?.user_metadata as any)?.username || null;
        setUserName(display ?? null);
        setUserUsername(uname);
        setNotice({ kind: 'success', message: 'Account created and signed in.' });
        return;
      }

      // If confirmation is required, inform the user
      setNotice({ kind: 'success', message: 'Account created. Please check your inbox to verify your email.' });
    } catch (e: any) {
      setNotice({ kind: 'error', message: e?.message || 'Sign up failed.' });
    } finally {
      setLoading(false);
    }
  };

  const magicLink = () => act(
    async () => await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } }),
    'Magic link sent. Check your email.'
  );

  const signOut = () => act(async () => await supabase.auth.signOut(), 'Signed out.');

  const updateDisplayName = async () => {
    await act(async () => await supabase.auth.updateUser({ data: { name: newName } }), 'Display name updated.');
    const { data } = await supabase.auth.getUser();
    const display = (data.user?.user_metadata as any)?.name || userName;
    setUserName(display ?? null);
    setNewName('');
  };

  const changePassword = () => act(
    async () => await supabase.auth.updateUser({ password: newPassword }),
    'Password changed successfully.'
  );

  const updateUsername = async () => {
    await act(async () => await supabase.auth.updateUser({ data: { username: newUsername } }), 'Username updated.');
    const { data } = await supabase.auth.getUser();
    const uname = (data.user?.user_metadata as any)?.username || userUsername;
    setUserUsername(uname ?? null);
    setNewUsername('');
  };

  return (
    <div className="px-4 lg:px-6 py-5 animate-fadeInUp">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Marketing/premium card */}
        <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 p-6 hover-lift-md">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" className="h-7 w-7" />
            <div className="text-lg font-semibold">supaimg</div>
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-2">Welcome to your image infrastructure</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Secure authentication built on Supabase. Create an account or sign in to manage your projects and providers.</p>
          <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
            <li>• Email + password and magic link</li>
            <li>• Session-based access to projects</li>
            <li>• Manage providers and gallery uploads</li>
          </ul>
          {userEmail && (
            <div className="mt-4">
              <Notice kind="success" message={`Signed in as ${userEmail}`} />
              <button onClick={signOut} className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-sm">
                <LogIn className="h-4 w-4 rotate-180" />
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Right: Profile when logged in, else Auth form */}
        {userEmail ? (
          <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-black p-6 shadow-sm animate-fadeInUp">
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Signed in</div>
              <div className="text-lg font-semibold">{userName || 'User'}</div>
              <div className="text-xs text-gray-600">{userEmail}</div>
            </div>

            {notice && <div className="mb-4"><Notice kind={notice.kind} message={notice.message} /></div>}

            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 dark:border-white/15 p-4">
                <div className="text-sm font-medium mb-3">Profile</div>
                <Field
                  label="Display name"
                  value={newName}
                  onChange={setNewName}
                  placeholder={userName || 'Your name'}
                  icon={<User className="h-4 w-4" />}
                  autoComplete="name"
                />
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="mt-1 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/20 text-sm text-gray-800 dark:text-white/90 bg-white/50 dark:bg-black/30">{userEmail}</div>
                  </div>
                  <div>
                    <Field
                      label="Username"
                      value={newUsername}
                      onChange={setNewUsername}
                      placeholder={userUsername || 'your_username'}
                      icon={<User className="h-4 w-4" />}
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button disabled={loading || !newName} onClick={updateDisplayName} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-sm">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Save name
                  </button>
                  <button disabled={loading || !newUsername} onClick={updateUsername} className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-white/5 text-sm">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Save username
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-white/15 p-4">
                <div className="text-sm font-medium mb-3">Security</div>
                <Field
                  label="New password"
                  type="password"
                  value={newPassword}
                  onChange={setNewPassword}
                  placeholder="Set a new password"
                  icon={<Lock className="h-4 w-4" />}
                  autoComplete="new-password"
                />
                <div className="mt-3 flex items-center gap-2">
                  <button disabled={loading || newPassword.length < 8} onClick={changePassword} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-sm">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} Change password
                  </button>
                  <span className="text-[11px] text-gray-500">Minimum 8 characters.</span>
                </div>
              </div>

              <div className="pt-2">
                <button onClick={signOut} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-white/5 text-sm">
                  <LogIn className="h-4 w-4 rotate-180" /> Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-black p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${mode==='signin' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 dark:border-white/20'}`}
                onClick={() => setMode('signin')}
              >
                <LogIn className="h-3.5 w-3.5" /> Sign in
              </button>
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${mode==='signup' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 dark:border-white/20'}`}
                onClick={() => setMode('signup')}
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </button>
            </div>

            {notice && <div className="mb-4"><Notice kind={notice.kind} message={notice.message} /></div>}

            <div className="space-y-3">
              {mode === 'signup' && (
                <Field
                  label="Full name"
                  value={name}
                  onChange={setName}
                  placeholder="Ada Lovelace"
                  icon={<User className="h-4 w-4" />}
                  autoComplete="name"
                />
              )}

              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
                autoComplete="email"
              />

              {(mode === 'signin' || mode === 'signup') && (
                <Field
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  autoComplete={mode==='signin' ? 'current-password' : 'new-password'}
                />
              )}

              <div className="flex items-center gap-2 pt-1">
                {mode === 'signin' ? (
                  <button
                    disabled={loading}
                    onClick={signIn}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-sm"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                    Sign in
                  </button>
                ) : (
                  <button
                    disabled={loading}
                    onClick={signUp}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-sm"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                    Create account
                  </button>
                )}

                <button
                  disabled={loading || !email}
                  onClick={magicLink}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-white/5 text-sm"
                >
                  <Link2 className="h-4 w-4" /> Send magic link
                </button>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-gray-500">By continuing you agree to our Terms and Privacy Policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
