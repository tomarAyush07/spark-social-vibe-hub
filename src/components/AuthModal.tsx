import React from 'react';
import { Mail, Lock, Eye, EyeOff, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AuthModal: React.FC<{
  open: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  setMode: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;
  onAuth?: (user: { name: string; email: string; gender: string }) => void;
}> = ({ open, onClose, mode, setMode, onAuth }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [gender, setGender] = React.useState('male');
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((mode === 'signup' && !name) || !email || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ name: mode === 'signup' ? name : email.split('@')[0], email, gender }));
        if (onAuth) onAuth({ name: mode === 'signup' ? name : email.split('@')[0], email, gender });
        onClose();
        navigate('/feed');
      }, 1200);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-modal">
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md outline-none border border-indigo-100 dark:border-indigo-800 glass-modal ${shake ? 'animate-shake' : ''} animate-modal-in`}
        style={{ boxShadow: '0 8px 40px #6366f133' }}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-2xl font-bold transition focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 mb-2 animate-robot-float">
            {/* Robot mascot SVG */}
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="32" cy="56" rx="18" ry="4" fill="#e0e7ff" />
              <rect x="14" y="16" width="36" height="28" rx="12" fill="#6366f1" />
              <rect x="20" y="22" width="24" height="16" rx="7" fill="#fff" />
              <circle cx="26" cy="30" r="3" fill="#6366f1" />
              <circle cx="38" cy="30" r="3" fill="#6366f1" />
              <rect x="28" y="38" width="8" height="2" rx="1" fill="#a5b4fc" />
              <rect x="30" y="8" width="4" height="8" rx="2" fill="#6366f1" />
              <circle cx="32" cy="8" r="2" fill="#a5b4fc" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">{mode === 'signin' ? 'Welcome Back!' : 'Join Vibe Social'}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1"><span className="animate-waving-hand">👋</span> {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}</p>
        </div>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${mode === 'signin' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}`}
            onClick={() => setMode('signin')}
            tabIndex={0}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}`}
            onClick={() => setMode('signup')}
            tabIndex={0}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name field for both sign in and sign up */}
          <div className="relative">
            <input
              type="text"
              id="auth-name"
              className={`w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none bg-white/80 dark:bg-slate-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ${name || focusedField === 'auth-name' ? 'pt-5 pb-1' : ''}`}
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocusedField('auth-name')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label 
              htmlFor="auth-name" 
              className={`absolute left-4 text-gray-400 dark:text-gray-500 pointer-events-none transition-all duration-200 ${name || focusedField === 'auth-name' ? 'top-2 text-xs text-indigo-500 dark:text-indigo-400' : 'top-1/2 -translate-y-1/2'}`}
            >
              Name
            </label>
          </div>
          {/* Gender field with radio buttons */}
          <div className="relative">
            <label className="absolute left-4 top-2 text-xs text-indigo-500 dark:text-indigo-400 pointer-events-none transition-all duration-200 bg-white/80 dark:bg-slate-800/80 px-1">
              Gender
            </label>
            <div className="pt-5 pb-1 px-4">
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
              </div>
            </div>
          </div>
          {/* Email field with floating label and icon */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 dark:text-indigo-400 w-5 h-5 pointer-events-none transition-all duration-200" />
            <input
              type="email"
              id="auth-email"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none bg-white/80 dark:bg-slate-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ${email || focusedField === 'auth-email' ? 'pt-5 pb-1' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField('auth-email')}
              onBlur={() => setFocusedField(null)}
              required
              autoFocus
            />
            <label 
              htmlFor="auth-email" 
              className={`absolute left-10 text-gray-400 dark:text-gray-500 pointer-events-none transition-all duration-200 ${email || focusedField === 'auth-email' ? 'top-2 text-xs text-indigo-500 dark:text-indigo-400' : 'top-1/2 -translate-y-1/2'}`}
            >
              Email
            </label>
          </div>
          {/* Password field with floating label, icon, and show/hide toggle */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 dark:text-indigo-400 w-5 h-5 pointer-events-none transition-all duration-200" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="auth-password"
              className={`w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none bg-white/80 dark:bg-slate-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ${password || focusedField === 'auth-password' ? 'pt-5 pb-1' : ''}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedField('auth-password')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label 
              htmlFor="auth-password" 
              className={`absolute left-10 text-gray-400 dark:text-gray-500 pointer-events-none transition-all duration-200 ${password || focusedField === 'auth-password' ? 'top-2 text-xs text-indigo-500 dark:text-indigo-400' : 'top-1/2 -translate-y-1/2'}`}
            >
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-600 transition focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 active:scale-95 focus:ring-2 focus:ring-indigo-300 relative overflow-hidden ${loading ? 'opacity-80' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="loader mr-2"></span>
                {mode === 'signin' ? 'Signing in...' : 'Signing up...'}
              </span>
            ) : success ? (
              <span className="flex items-center gap-2 text-green-400 font-bold animate-fade-in">
                <Smile className="w-5 h-5" /> Success!
              </span>
            ) : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            {/* Confetti burst on success */}
            {success && <span className="confetti-burst absolute left-1/2 top-1/2" />}
          </button>
        </form>
      </div>
      {/* Modal Animations & Styles */}
      <style>{`
        .glass-modal { box-shadow: 0 8px 40px #6366f133; }
        .animate-modal-in { animation: modal-in 0.6s cubic-bezier(0.4,0,0.2,1); }
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.85) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-modal { animation: fade-in 0.5s cubic-bezier(0.4,0,0.2,1); }
        .animate-shake { animation: shake 0.4s; }
        @keyframes shake {
          0%,100%{transform:translateX(0);} 20%{transform:translateX(-8px);} 40%{transform:translateX(8px);} 60%{transform:translateX(-6px);} 80%{transform:translateX(6px);}
        }
        .loader {
          border: 2.5px solid #fff;
          border-top: 2.5px solid #6366f1;
          border-radius: 50%;
          width: 1.2em;
          height: 1.2em;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .confetti-burst {
          pointer-events: none;
          width: 80px; height: 80px;
          left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          z-index: 10;
          background: radial-gradient(circle, #fbbf24 0%, #a5b4fc 40%, transparent 70%);
          opacity: 0.7;
          border-radius: 9999px;
          animation: sparkle-burst 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes sparkle-burst {
          0% { opacity: 0.7; transform: translate(-50%,-50%) scale(0.2); }
          60% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(1.4); }
        }
      `}</style>
    </div>
  );
}; 