import type { Review } from '../lib/types';

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

function ReviewCard({ review }: { review: Review }) {
  const { confidence, notes, reviewed_at } = review;

  return (
    <div className='flex items-start gap-4 rounded-lg border border-dusk/40 bg-prussian p-4 shadow-sm'>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
          confidenceStyles[confidence] ?? 'border-dusk bg-dusk text-alabaster'
        }`}
        title={`Confidence: ${confidence}/5`}
      >
        {confidence}
      </span>

      <div className='flex flex-1 flex-col gap-1.5'>
        <span className='text-xs text-lavender/70'>
          {formatDate(reviewed_at)}
        </span>
        <p className='text-sm whitespace-pre-wrap text-alabaster'>
          {notes || 'No notes.'}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
