import { useEffect, useState } from 'react';
import type { Problem } from '../lib/types';
import { getProblems } from '../lib/api';
import { useAuth } from '../contexts/AuthProvider';
import ProblemCard from '../components/ProblemCard';

function All() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    async function fetchProblems() {
      try {
        setLoading(true);
        if (!token) return;
        const { problems } = await getProblems(token);
        console.log(problems);
        setProblems(problems);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, [token]);

  return (
    <div className='flex flex-col gap-5'>
      {loading ? (
        <div className='flex items-center justify-center py-16'>
          <div className='h-8 w-8 animate-spin rounded-full border-2 border-dusk/40 border-t-alabaster' />
        </div>
      ) : (
        problems?.map((problem) => (
          <ProblemCard problem={problem} key={problem.id} />
        ))
      )}
    </div>
  );
}

export default All;
