import { useEffect, useState } from 'react';
import problemTags from '../lib/problemTags';

const fieldStyles =
  'rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-neutral-900';

const labelStyles =
  'text-xs font-medium uppercase tracking-wide text-neutral-500';

function Add() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const paddedMonth = month.toString().length == 1 ? '0' + month : month;
    const day = date.getDate();
    setDate(`${year}-${paddedMonth}-${day}`);
  }, []);

  function toggleTag(newTag: string) {
    const tagIncluded = tags.some((tag) => tag === newTag);
    if (tagIncluded) {
      setTags((tags) => tags.filter((tag) => tag !== newTag));
    } else {
      setTags((tags) => [newTag, ...tags]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='mx-auto w-full max-w-lg px-4 py-10'>
      <form className='flex flex-col gap-5'>
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

        <div className='flex gap-4'>
          <div className='flex flex-1 flex-col gap-1.5'>
            <label className={labelStyles} htmlFor='date'>
              Date
            </label>
            <input
              id='date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldStyles}
            />
          </div>

          <div className='flex flex-1 flex-col gap-1.5'>
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
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
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
                    ? 'border-amber-700 bg-amber-700 text-white'
                    : 'border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
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
            className='rounded-md px-4 py-2 text-sm text-neutral-500 transition hover:text-neutral-900'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
