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

// async function addProblem(
//   userId: string,
//   title: string,
//   url: string,
//   tags: string[],
//   notes: string,
//   dateAdded: string,
//   confidence: number,
//   next_review: string,
//   review_interval_days: number,
// );

export { login };
