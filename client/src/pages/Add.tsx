import { useState } from 'react';
import problemTags from '../lib/problemTags';
import { createProblem } from '../lib/api';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router';

const fieldStyles =
  'rounded-md border border-dusk bg-ink px-3 py-2 text-sm text-alabaster outline-none transition focus:border-lavender';

const labelStyles = 'text-xs font-medium uppercase tracking-wide text-lavender';

function Add() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const { token } = useAuth();
  const navigate = useNavigate();

  function toggleTag(newTag: string) {
    const tagIncluded = tags.some((tag) => tag === newTag);
    if (tagIncluded) {
      setTags((tags) => tags.filter((tag) => tag !== newTag));
    } else {
      setTags((tags) => [newTag, ...tags]);
    }
  }

  async function handleSubmit(e: React.SubmitEvent) {
    try {
      e.preventDefault();
      if (!token) return;
      const newProblem = await createProblem(
        token,
        title,
        url,
        tags,
        notes,
        confidence,
      );
      console.log(newProblem);
      navigate('/dashboard/all');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='mx-auto w-full max-w-lg px-4 py-10 text-alabaster'>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1.5'>
          <label className={labelStyles} htmlFor='title'>
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Two Sum'
            className={fieldStyles}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className={labelStyles} htmlFor='url'>
            URL
          </label>
          <input
            id='url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='https://leetcode.com/problems/...'
            className={fieldStyles}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className={labelStyles} htmlFor='confidence'>
            Confidence
          </label>
          <div
            id='confidence'
            role='radiogroup'
            aria-label='Confidence'
            className='flex gap-1.5'
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type='button'
                role='radio'
                aria-checked={confidence === value}
                onClick={() => setConfidence(value)}
                className={`flex h-9 flex-1 items-center justify-center rounded-md border text-sm transition ${
                  confidence === value
                    ? 'border-lavender bg-lavender text-ink'
                    : 'border-dusk text-lavender hover:border-lavender hover:text-alabaster'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <span className={labelStyles}>Tags</span>
          <div className='flex flex-wrap gap-2'>
            {problemTags.map((problemTag) => (
              <button
                type='button'
                onClick={() => toggleTag(problemTag)}
                key={problemTag}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  tags.includes(problemTag)
                    ? 'border-dusk bg-dusk text-alabaster'
                    : 'border-dusk/60 text-lavender hover:border-lavender hover:text-alabaster'
                }`}
              >
                {problemTag}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className={labelStyles} htmlFor='notes'>
            Notes
          </label>
          <textarea
            id='notes'
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='What tripped you up?'
            className={`${fieldStyles} resize-y`}
          />
        </div>

        <div className='flex justify-end gap-2 pt-1'>
          <button
            type='button'
            className='rounded-md px-4 py-2 text-sm text-lavender transition hover:text-alabaster'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md bg-alabaster px-4 py-2 text-sm font-medium text-ink transition hover:bg-lavender'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
