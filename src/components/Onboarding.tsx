import React, { useState } from 'react';
import { ChevronRight, Check, Star, Globe2, Briefcase, Users, Megaphone, Cpu } from 'lucide-react';

interface OnboardingProps {
  onDone: () => void;
}

const questions = [
  {
    key: 'heardFrom',
    title: 'Where did you hear about us?',
    icon: <Megaphone className="h-4 w-4" />,
    options: ['Twitter/X', 'Reddit', 'Product Hunt', 'Friend/Colleague', 'Search', 'Other'],
  },
  {
    key: 'role',
    title: 'What best describes your role?',
    icon: <Briefcase className="h-4 w-4" />,
    options: ['Founder', 'Engineer', 'Designer', 'Student', 'Hobbyist', 'Other'],
  },
  {
    key: 'teamSize',
    title: 'How big is your team?',
    icon: <Users className="h-4 w-4" />,
    options: ['Just me', '2-5', '6-20', '21-50', '51+'],
  },
  {
    key: 'useCase',
    title: 'Primary use case for supaimg?',
    icon: <Star className="h-4 w-4" />,
    options: ['Personal project', 'Client work', 'Startup/MVP', 'Enterprise app', 'Content delivery', 'Other'],
  },
  {
    key: 'platform',
    title: 'What platforms are you building for?',
    icon: <Globe2 className="h-4 w-4" />,
    options: ['Web', 'Mobile', 'Desktop', 'Backend services', 'Other'],
  },
  {
    key: 'imageNeeds',
    title: 'Top image workflow needs?',
    icon: <Cpu className="h-4 w-4" />,
    options: ['Upload & storage', 'CDN delivery', 'Optimization', 'Transformations', 'Multi-provider routing'],
  },
] as const;

type Answers = Partial<Record<(typeof questions)[number]['key'], string>>;

const Onboarding: React.FC<OnboardingProps> = ({ onDone }) => {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const currentAnswered = !!answers[current.key];

  const setAnswer = (key: keyof Answers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const next = () => {
    if (!currentAnswered) return;
    if (isLast) onDone(); else setStep(s => s + 1);
  };

  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="intro-rounded min-h-screen bg-white dark:bg-black px-4 lg:px-6 py-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Welcome — let’s personalize your setup</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Answer a few quick questions. This helps us tailor defaults for you.</p>
          </div>
          <button onClick={onDone} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Skip</button>
        </div>

        {/* Progress */}
        <div className="mb-5 text-xs text-gray-600 dark:text-gray-400">Step {step + 1} of {questions.length}</div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-black p-5 animate-fadeInUp">
          <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
            {current.icon}
            <div className="text-sm font-medium">{current.title}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.options.map(opt => {
              const active = answers[current.key] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswer(current.key, opt)}
                  className={`px-3 py-2 rounded-[12px] text-xs border text-left transition ${active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white dark:bg-black text-gray-800 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                >
                  {active && <Check className="h-3.5 w-3.5 inline mr-1" />}
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs border ${step === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-white/10'} border-gray-300 dark:border-white/20 text-gray-800 dark:text-white`}
            >
              Back
            </button>
            <button
              onClick={next}
              disabled={!currentAnswered}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${currentAnswered ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-300 text-white cursor-not-allowed'}`}
            >
              {isLast ? 'Finish' : 'Continue'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
