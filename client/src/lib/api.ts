async function login(username: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function register(username: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function createProblem(
  token: string,
  title: string,
  url: string,
  difficulty: string,
  tags: string[],
  notes: string,
  confidence: number,
) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, url, difficulty, tags, notes, confidence }),
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function getProblems(token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function getDueProblems(token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems/due`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function getProblemById(token: string, problemId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems/${problemId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function reviewProblem(
  token: string,
  problemId: string,
  confidence: number,
  notes: string,
) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems/${problemId}/review`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ confidence, notes }),
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function getProblemReviews(token: string, problemId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems/${problemId}/review`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function updateProblemNotes(
  token: string,
  problemId: string,
  notes: string,
) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems/${problemId}/notes`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ notes }),
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

async function getStats(token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/problems/stats`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

export {
  login,
  register,
  createProblem,
  getProblems,
  getDueProblems,
  getProblemById,
  reviewProblem,
  updateProblemNotes,
  getProblemReviews,
  getStats,
};
