interface Problem {
  id: string;
  title: string;
  url?: string;
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

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ProblemCard({ problem }: { problem: Problem }) {
  const { title, confidence, tags, date_added, next_review } = problem;
  return (
    <div className='flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-neutral-300 hover:shadow-md cursor-pointer hover:scale-105'>
      <div className='flex items-start justify-between gap-3'>
        <span className='text-sm font-semibold text-neutral-900 hover:underline'>
          {title}
        </span>

        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
            confidenceStyles[confidence] ??
            'border-neutral-300 bg-neutral-100 text-neutral-600'
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
              className='rounded-full border border-neutral-300 px-2 py-0.5 text-xs text-neutral-600'
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center justify-between text-xs text-neutral-400'>
        <span>Added {formatDate(date_added)}</span>
        {next_review && <span>Next review {formatDate(next_review)}</span>}
      </div>
    </div>
  );
}

export default ProblemCard;
