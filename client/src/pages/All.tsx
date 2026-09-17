import { useEffect, useState } from 'react';
import type { Problem } from '../lib/types';
import { getProblems } from '../lib/api';
import { useAuth } from '../contexts/AuthProvider';
import ProblemCard from '../components/ProblemCard';

function All() {
  const [problems, setProblems] = useState<Problem[]>([]);

  const { token } = useAuth();

  useEffect(() => {
    async function fetchProblems() {
      try {
        if (!token) return;
        const { problems } = await getProblems(token);
        console.log(problems);
        setProblems(problems);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProblems();
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      {problems &&
        problems?.map((problem) => (
          <ProblemCard problem={problem} key={problem.id} />
        ))}
    </div>
  );
}

export default All;
