import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { getUser, updateUser, getCookie, setCookie, type User as ApiUser } from '../services/userService';

// This screen only displays info from your backend; inputs/actions are removed

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
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const uidCookie = getCookie('user_id');
      const uid = uidCookie ? parseInt(uidCookie, 10) : NaN;
      if (!uid || Number.isNaN(uid)) return;
      setUserId(uid);
      try {
        const res = await getUser(uid);
        if (res?.success && res?.data) {
          const u: ApiUser = res.data;
          setUserEmail(u.gmail);
          setUserName(u.name || null);
          setEmail(u.gmail || '');
          setName(u.name || '');
        }
      } catch (e) {
        // ignore for now
      }
    };
    load();
  }, []);

  // Prefill from Login.jsx storage when no cookie yet
  useEffect(() => {
    if (!userEmail) {
      try {
        const ls = localStorage.getItem('supaimg_email');
        if (ls) setEmail(ls);
      } catch {}
    }
  }, [userEmail]);

  // All auth actions are managed by your backend now. This screen only displays info from GET /api/users/:id

  return (
    <div className="px-4 lg:px-6 py-5 animate-fadeInUp">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Info card */}
        <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 p-6 hover-lift-md">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" className="h-7 w-7" />
            <div className="text-lg font-semibold">supaimg</div>
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-2">Welcome to your image infrastructure</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Authentication is handled by your custom backend. This panel shows the current user from the local cookie session.</p>
          <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
            <li>• Email + password and magic link</li>
            <li>• Session-based access to projects</li>
            <li>• Manage providers and gallery uploads</li>
          </ul>
          {userEmail && (
            <div className="mt-4">
              <Notice kind="success" message={`Signed in as ${userEmail}`} />
            </div>
          )}
        </div>

        {/* Right: Profile when logged in, else guidance */}
        {userEmail ? (
          <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-black p-6 shadow-sm animate-fadeInUp">
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Signed in</div>
              <div className="text-lg font-semibold">{userName || 'User'}</div>
              <div className="text-xs text-gray-600">{userEmail}</div>
            </div>
            {notice && <div className="mb-4"><Notice kind={notice.kind} message={notice.message} /></div>}

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Full name</label>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-black text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border_white/20 bg-white dark:bg-black text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">New password</label>
                <input
                  type="password"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-black text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div className="pt-1">
                <button
                  disabled={saving || !userId}
                  onClick={async () => {
                    if (!userId) return;
                    setSaving(true);
                    setNotice(null);
                    try {
                      const payload: any = {};
                      if (name) payload.name = name;
                      if (email) payload.gmail = email;
                      if (password) payload.password = password;
                      const res = await updateUser(userId, payload);
                      if (res?.success && res?.data) {
                        const u = res.data;
                        setUserEmail(u.gmail);
                        setUserName(u.name || null);
                        setCookie('gmail', u.gmail);
                        setNotice({ kind: 'success', message: 'Profile updated.' });
                        setPassword('');
                      }
                    } catch (e: any) {
                      setNotice({ kind: 'error', message: e?.message || 'Update failed' });
                    } finally {
                      setSaving(false);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-sm disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-black p-6 shadow-sm">
            <div className="text-sm text-gray-700 dark:text-gray-200">No session found. Use the Login screen to create an account. This page only reads your session cookie and displays your email.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
