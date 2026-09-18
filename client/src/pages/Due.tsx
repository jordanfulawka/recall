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
  }, []);

  return (
    <div>
      {dueProblems.length > 0 ? (
        dueProblems?.map((problem) => (
          <ProblemCard problem={problem} key={problem.id} />
        ))
      ) : (
        <p>No problems to review!</p>
      )}
    </div>
  );
}

export default Due;
