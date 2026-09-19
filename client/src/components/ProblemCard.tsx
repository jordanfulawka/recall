import { useNavigate } from 'react-router';

interface Problem {
  id: string;
  title: string;
  url?: string;
  difficulty: string;
  tags: string[];
  confidence: number;
  date_added: string;
  last_reviewed?: string | null;
  next_review?: string | null;
}

const confidenceStyles: Record<number, string> = {
  1: 'border-red-700 bg-red-700 text-white',
  2: 'border-orange-600 bg-orange-600 text-white',
  3: 'border-amber-600 bg-amber-600 text-white',
  4: 'border-lime-600 bg-lime-600 text-white',
  5: 'border-emerald-700 bg-emerald-700 text-white',
};

const difficultyStyles: Record<string, string> = {
  easy: 'border-emerald-700 text-emerald-700',
  medium: 'border-amber-600 text-amber-600',
  hard: 'border-red-700 text-red-700',
};

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ProblemCard({ problem }: { problem: Problem }) {
  const { title, confidence, difficulty, tags, date_added, next_review } =
    problem;

  const navigate = useNavigate();

  return (
    <div
      className='flex flex-col gap-3 rounded-lg border border-dusk/40 bg-prussian p-4 shadow-sm transition hover:border-lavender hover:shadow-md cursor-pointer hover:scale-105'
      onClick={() => navigate(`/review/${problem.id}`)}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-semibold text-alabaster hover:underline'>
            {title}
          </span>
          {difficulty && (
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
                difficultyStyles[difficulty] ?? 'border-dusk text-lavender'
              }`}
            >
              {difficulty}
            </span>
          )}
        </div>

        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
            confidenceStyles[confidence] ?? 'border-dusk bg-dusk text-alabaster'
          }`}
          title={`Confidence: ${confidence}/5`}
        >
          {confidence}
        </span>
      </div>

      {tags?.length > 0 && (
        <div className='flex flex-wrap gap-1.5'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full border border-dusk/60 px-2 py-0.5 text-xs text-lavender'
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center justify-between text-xs text-lavender/70'>
        <span>Added {formatDate(date_added)}</span>
        {next_review && <span>Next review {formatDate(next_review)}</span>}
      </div>
    </div>
  );
}

export default ProblemCard;
