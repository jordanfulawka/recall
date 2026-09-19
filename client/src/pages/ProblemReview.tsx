import { useEffect, useState } from 'react';
import type { Problem } from '../lib/types';
import {
  deleteProblem,
  getProblemById,
  reviewProblem,
  updateProblemNotes,
} from '../lib/api';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate, useParams } from 'react-router';

const confidenceStyles: Record<number, string> = {
  1: 'border-red-700 bg-red-700 text-white',
  2: 'border-orange-600 bg-orange-600 text-white',
  3: 'border-amber-600 bg-amber-600 text-white',
  4: 'border-lime-600 bg-lime-600 text-white',
  5: 'border-emerald-700 bg-emerald-700 text-white',
};

const confidenceColours: Record<number, string> = {
  1: 'text-red-700',
  2: 'text-orange-600',
  3: 'text-amber-600',
  4: 'text-lime-600',
  5: 'text-emerald-700',
};

const difficultyStyles: Record<string, string> = {
  easy: 'border-emerald-700 text-emerald-700',
  medium: 'border-amber-600 text-amber-600',
  hard: 'border-red-700 text-red-700',
};

const ratingStyles: Record<number, { idle: string; selected: string }> = {
  1: {
    idle: 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white',
    selected: 'border-red-700 bg-red-700 text-white',
  },
  2: {
    idle: 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white',
    selected: 'border-orange-600 bg-orange-600 text-white',
  },
  3: {
    idle: 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white',
    selected: 'border-amber-600 bg-amber-600 text-white',
  },
  4: {
    idle: 'border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white',
    selected: 'border-lime-600 bg-lime-600 text-white',
  },
  5: {
    idle: 'border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white',
    selected: 'border-emerald-700 bg-emerald-700 text-white',
  },
};

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ProblemReview() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewedProblem, setReviewedProblem] = useState<Problem | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProblem() {
      try {
        if (!token) return;
        if (typeof id !== 'string') return;
        const { problem } = await getProblemById(token, id);
        setProblem(problem);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProblem();
  }, [token, id]);

  if (!problem) {
    return (
      <div className='mx-auto w-full max-w-2xl px-4 py-10 text-lavender'>
        Loading...
      </div>
    );
  }

  const {
    title,
    url,
    notes,
    difficulty,
    tags,
    confidence,
    date_added,
    last_reviewed,
    next_review,
  } = problem;

  function handleNotesEditStart() {
    setNotesDraft(notes ?? '');
    setIsEditingNotes(true);
  }

  function handleNotesCancel() {
    setIsEditingNotes(false);
  }

  async function handleNotesSubmit() {
    try {
      if (!token) return;
      if (typeof id !== 'string') return;
      const { updatedProblem } = await updateProblemNotes(
        token,
        id,
        notesDraft,
      );
      setProblem(updatedProblem);
      setIsEditingNotes(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      if (!token) return;
      if (typeof id !== 'string') return;
      setDeleting(true);
      await deleteProblem(token, id);
      navigate('/all');
    } catch (err) {
      console.log(err);
      setDeleting(false);
    }
  }

  async function handleReviewSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      if (!token) return;
      if (typeof id !== 'string') return;
      if (!selectedRating) return;
      const { reviewedProblem } = await reviewProblem(
        token,
        id,
        selectedRating,
        reviewNotes,
      );
      setReviewedProblem(reviewedProblem);
      console.log(reviewedProblem);
      setReviewSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='mx-auto w-full max-w-2xl px-4 py-10'>
      <div className='mb-6 flex items-center justify-between'>
        <button
          onClick={() => navigate(-1)}
          className='text-sm text-lavender transition hover:text-alabaster'
        >
          ← back
        </button>

        {confirmingDelete ? (
          <div className='flex items-center gap-2'>
            <span className='text-sm text-lavender'>Delete this problem?</span>
            <button
              type='button'
              onClick={() => setConfirmingDelete(false)}
              disabled={deleting}
              className='rounded-md border border-dusk/60 px-3 py-1 text-xs font-medium text-lavender transition hover:bg-dusk/20 disabled:opacity-50'
            >
              cancel
            </button>
            <button
              type='button'
              onClick={handleDelete}
              disabled={deleting}
              className='rounded-md border border-red-700 bg-red-700 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-50'
            >
              {deleting ? 'deleting...' : 'confirm delete'}
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => setConfirmingDelete(true)}
            className='text-sm text-red-500 transition hover:text-red-400'
          >
            delete
          </button>
        )}
      </div>

      <div className='flex flex-col gap-5 rounded-lg border border-dusk/40 bg-prussian p-6 shadow-sm'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl font-semibold text-alabaster'>
                {title}
              </h1>
              {difficulty && (
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
                    difficultyStyles[difficulty] ??
                    'border-dusk text-lavender'
                  }`}
                >
                  {difficulty}
                </span>
              )}
            </div>
            {url && (
              <a
                href={url}
                target='_blank'
                rel='noreferrer'
                className='text-sm text-lavender transition hover:text-alabaster hover:underline'
              >
                open problem ↗
              </a>
            )}
          </div>

          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
              confidenceStyles[confidence] ??
              'border-dusk bg-dusk text-alabaster'
            }`}
            title={`Confidence: ${confidence}/5`}
          >
            {confidence}
          </span>
        </div>

        <div className='flex flex-col gap-2 border-l-2 border-dusk pl-3'>
          {isEditingNotes ? (
            <div className='flex flex-col gap-2'>
              <textarea
                autoFocus
                className='w-full resize-none rounded-md border border-dusk/60 bg-prussian px-3 py-2 text-sm text-alabaster placeholder:text-lavender/50 transition focus:border-lavender focus:outline-none'
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder='Add some notes...'
              />
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={handleNotesCancel}
                  className='rounded-md border border-dusk/60 px-3 py-1 text-xs font-medium text-lavender transition hover:bg-dusk/20'
                >
                  cancel
                </button>
                <button
                  type='button'
                  onClick={handleNotesSubmit}
                  className='rounded-md border border-emerald-700 bg-emerald-700 px-3 py-1 text-xs font-medium text-white transition hover:bg-emerald-600'
                >
                  submit
                </button>
              </div>
            </div>
          ) : (
            <div className='flex items-start justify-between gap-3'>
              <p className='text-sm whitespace-pre-wrap text-alabaster'>
                {notes || 'No notes yet.'}
              </p>
              <button
                type='button'
                onClick={handleNotesEditStart}
                className='shrink-0 text-xs text-lavender transition hover:text-alabaster hover:underline'
              >
                edit
              </button>
            </div>
          )}
        </div>

        {tags?.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-dusk/60 px-2.5 py-0.5 text-xs text-lavender'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className='h-px bg-dusk/40' />

        {!reviewSubmitted && (
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-medium uppercase tracking-wide text-lavender'>
              How'd it go?
            </span>
            <div
              role='radiogroup'
              aria-label='Rate this review'
              className='flex gap-2'
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type='button'
                  role='radio'
                  aria-checked={selectedRating === value}
                  onClick={() => setSelectedRating(value)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    selectedRating === value
                      ? ratingStyles[value].selected
                      : ratingStyles[value].idle
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedRating && !reviewSubmitted && (
          <div className='flex flex-col gap-3 rounded-lg border border-dusk/40 bg-ink/40 p-4'>
            <p className='text-sm text-lavender'>
              rated{' '}
              <span
                className={`${confidenceColours[selectedRating]} text-xl font-bold`}
              >
                {selectedRating}
              </span>
            </p>
            <form className='flex flex-col gap-3' onSubmit={handleReviewSubmit}>
              <textarea
                className='w-full resize-none rounded-md border border-dusk/60 bg-prussian px-3 py-2 text-sm text-alabaster placeholder:text-lavender/50 transition focus:border-lavender focus:outline-none'
                rows={5}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder='Anything to add for this solve?'
              ></textarea>
              <button
                type='submit'
                className='self-end rounded-md border border-emerald-700 bg-emerald-700 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-600'
              >
                save review
              </button>
            </form>
          </div>
        )}
        {reviewedProblem && (
          <div>
            <div className='flex items-center gap-4 rounded-lg border border-emerald-700/40 bg-emerald-700/10 p-4'>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                  confidenceStyles[reviewedProblem.confidence] ??
                  'border-dusk bg-dusk text-alabaster'
                }`}
              >
                {reviewedProblem.confidence}
              </span>
              <div className='flex flex-col gap-0.5'>
                <p className='text-sm font-medium text-alabaster'>
                  Review saved
                </p>
                <p className='text-xs text-lavender'>
                  Next review {formatDate(reviewedProblem.next_review)}
                </p>
              </div>
            </div>
            <div className='flex justify-end gap-2 pt-3'>
              <button
                onClick={() => navigate(-1)}
                className='rounded-md border border-dusk/60 px-3 py-1.5 text-sm font-medium text-lavender transition hover:bg-dusk/20 hover:text-alabaster'
              >
                back to list
              </button>
              <button
                onClick={() => navigate(`/history/${id}`)}
                className='rounded-md border border-emerald-700 bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-600'
              >
                history
              </button>
            </div>
          </div>
        )}

        <div className='flex flex-wrap gap-x-6 gap-y-1 text-xs text-lavender/70'>
          <span>Added {formatDate(date_added)}</span>
          {last_reviewed && (
            <span>Last reviewed {formatDate(last_reviewed)}</span>
          )}
          {next_review && <span>Next review {formatDate(next_review)}</span>}
        </div>
      </div>
    </div>
  );
}

export default ProblemReview;
