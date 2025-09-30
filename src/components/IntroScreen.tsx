import React, { useEffect, useState } from 'react';
interface IntroScreenProps {
  onSkip: () => void;
  onGetStarted: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onSkip, onGetStarted }) => {
  const fullTitle = 'Welcome to your image infrastructure';
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isSplash) onGetStarted();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [isSplash, onGetStarted]);

  useEffect(() => {
    const t = setTimeout(() => setIsSplash(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="intro-rounded relative min-h-screen w-full overflow-hidden bg-black text-white">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%,100% { opacity: .35 } 50% { opacity: .6 } }
        @keyframes floatSlow { 0% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(0,-6px,0) scale(1.02); } 100% { transform: translate3d(0,0,0) scale(1); } }
        @keyframes logoReveal { 0% { opacity: 0; transform: translateY(8px) scale(.96) rotate(-2deg); filter: blur(2px);} 60% { filter: blur(0);} 100% { opacity: 1; transform: translateY(0) scale(1) rotate(0);} }
        @keyframes nameReveal { 0% { opacity: 0; transform: translateY(8px);} 100% { opacity: 1; transform: translateY(0);} }
        @keyframes caretBlink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
        @keyframes ringPulse { 0% { transform: scale(1); opacity: .35 } 70% { opacity: .05 } 100% { transform: scale(1.35); opacity: 0 } }
        @keyframes sweep { 0% { transform: translateX(-120%); opacity: .0 } 20% { opacity: .2 } 80% { opacity: .2 } 100% { transform: translateX(120%); opacity: 0 } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 0px rgba(255,255,255,0.12), 0 0 0px rgba(59,130,246,0.0);} 50% { box-shadow: 0 10px 40px rgba(59,130,246,0.25), 0 0 60px rgba(236,72,153,0.18);} }
      `}</style>

      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-500/30 blur-3xl" style={{ animation: 'glowPulse 6s ease-in-out infinite' }} />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/30 blur-3xl" style={{ animation: 'glowPulse 7s ease-in-out infinite' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Splash Phase: 3s full-screen logo + name only */}
        {isSplash ? (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="relative flex items-center gap-4 p-6 rounded-2xl" style={{ animation: 'glow 2.2s ease-in-out infinite' }}>
              {/* Ripple rings */}
              <div className="absolute left-0 right-0 mx-auto -z-0" style={{ width: 160, height: 160 }}>
                <span className="absolute inset-0 rounded-full border border-white/10" style={{ animation: 'ringPulse 1.8s ease-out .0s infinite' }} />
                <span className="absolute inset-0 rounded-full border border-white/10" style={{ animation: 'ringPulse 2s ease-out .25s infinite' }} />
                <span className="absolute inset-0 rounded-full border border-white/10" style={{ animation: 'ringPulse 2.2s ease-out .5s infinite' }} />
              </div>
              {/* Logo */}
              <div className="relative z-10">
                <img src="/logo.png" alt="supaimg" className="h-16 w-16 sm:h-20 sm:w-20 object-contain" style={{ animation: 'logoReveal .9s cubic-bezier(0.2,0.8,0.2,1) both' }} />
              </div>
              {/* Brand name */}
              <span className="relative z-10 text-3xl sm:text-4xl font-extrabold supaimg-gradient" style={{ animation: 'nameReveal .6s ease-out .25s both' }}>supaimg</span>
              {/* Gradient sweep */}
              <span className="pointer-events-none absolute -inset-y-8 -left-1/2 -right-1/2 opacity-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)', height: 2, animation: 'sweep 1.6s ease .3s 1 forwards' }} />
            </div>
          </div>
        ) : (
          <>
            {/* Brand row above headline */}
            <div className="mb-3 flex items-center justify-center gap-2" style={{ animation: 'fadeUp .5s ease-out both' }}>
              <img src="/logo.png" alt="supaimg" className="h-12 w-12 object-contain" />
              <span className="text-2xl font-semibold">supaimg</span>
            </div>
            {/* Headline (full text, no typewriter) */}
            <h1 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl" style={{ animation: 'fadeUp .5s ease-out both' }}>
              {fullTitle}
            </h1>
            <p className="mt-4 text-center text-base sm:text-lg text-white/70 max-w-2xl" style={{ animation: 'fadeUp .5s ease-out .06s both' }}>
              Upload, process, and deliver images across providers with a beautiful, unified workspace.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3" style={{ animation: 'fadeUp .5s ease-out .12s both' }}>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Get started
              </button>
              <button
                className="text-sm text-white/70 hover:text-white/90"
                onClick={onSkip}
              >
                Skip intro
              </button>
            </div>

            {/* Footnote row mimicking onboarding hints */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl" style={{ animation: 'fadeUp .5s ease-out .18s both' }}>
              <div className="intro-card rounded-xl border border-white/10 bg-white/5 px-4 py-3 will-change-transform" style={{ animation: 'floatSlow 5s ease-in-out .2s infinite' }}>
                <div className="text-sm font-medium">Connect a provider</div>
                <div className="text-xs text-white/60 mt-1">AWS S3, Cloudinary, and more</div>
              </div>
              <div className="intro-card rounded-xl border border-white/10 bg-white/5 px-4 py-3 will-change-transform" style={{ animation: 'floatSlow 5.8s ease-in-out .4s infinite' }}>
                <div className="text-sm font-medium">Upload & manage</div>
                <div className="text-xs text-white/60 mt-1">Drag-and-drop, organize files</div>
              </div>
              <div className="intro-card rounded-xl border border-white/10 bg-white/5 px-4 py-3 will-change-transform" style={{ animation: 'floatSlow 6.4s ease-in-out .6s infinite' }}>
                <div className="text-sm font-medium">Deliver anywhere</div>
                <div className="text-xs text-white/60 mt-1">Fast CDN and transformations</div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-xs text-white/50" style={{ animation: 'fadeUp .5s ease-out .24s both' }}>Press Enter to continue</div>
          </>
        )}
      </div>
    </div>
  );
};

export default IntroScreen;
