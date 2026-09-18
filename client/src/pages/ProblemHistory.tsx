import { useEffect, useState } from 'react';
import type { Review } from '../lib/types';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import { getProblemReviews } from '../lib/api';
import ReviewCard from '../components/ReviewCard';

function ProblemHistory() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReviews() {
      try {
        if (!token) return;
        if (typeof id !== 'string') return;
        const { problemReviews } = await getProblemReviews(token, id);
        setReviews(problemReviews);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [token, id]);

  const sortedReviews = [...reviews].sort(
    (a, b) =>
      new Date(b.reviewed_at).getTime() - new Date(a.reviewed_at).getTime(),
  );

  return (
    <div className='mx-auto w-full max-w-2xl px-4 py-10'>
      <button
        onClick={() => navigate(-1)}
        className='mb-6 text-sm text-lavender transition hover:text-alabaster'
      >
        ← back
      </button>

      <h1 className='mb-5 text-xl font-semibold text-alabaster'>
        Review history
      </h1>

      {loading ? (
        <p className='text-sm text-lavender'>Loading...</p>
      ) : sortedReviews.length > 0 ? (
        <div className='flex flex-col gap-3'>
          {sortedReviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      ) : (
        <p className='text-sm text-lavender'>No reviews yet.</p>
      )}
    </div>
  );
}

export default ProblemHistory;
