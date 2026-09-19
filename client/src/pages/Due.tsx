import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { getDueProblems } from '../lib/api';
import type { Problem } from '../lib/types';
import ProblemCard from '../components/ProblemCard';

function Due() {
  const [dueProblems, setDueProblems] = useState<Problem[]>([]);

  const { token } = useAuth();

  useEffect(() => {
    async function fetchDueProblems() {
      try {
        if (!token) return;
        const { dueProblems: problems } = await getDueProblems(token);
        console.log(problems);
        setDueProblems(problems);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDueProblems();
  }, [token]);

  return (
    <div className='flex flex-col gap-5'>
      {dueProblems.length > 0 ? (
        dueProblems.map((problem) => (
          <ProblemCard problem={problem} key={problem.id} />
        ))
      ) : (
        <div className='flex flex-col items-center gap-2 rounded-lg border border-dusk/40 bg-prussian py-16 text-center'>
          <span className='text-3xl'>🎉</span>
          <p className='text-sm font-medium text-alabaster'>
            You're all caught up!
          </p>
          <p className='text-xs text-lavender/70'>
            No problems are due for review right now.
          </p>
        </div>
      )}
    </div>
  );
}

export default Due;
