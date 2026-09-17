function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function nextInterval(currentIntervalDays: number, confidence: number) {
  if (confidence <= 2) return 1;
  if (confidence === 3)
    return Math.max(1, Math.round(currentIntervalDays * 1.3));
  if (confidence === 4) return Math.round(currentIntervalDays * 2);
  return Math.round(currentIntervalDays * 2.5);
}

function computeSchedule(confidence: number, currentIntervalDays = 1) {
  const intervalDays = nextInterval(currentIntervalDays, confidence);
  const now = new Date();
  return {
    review_interval_days: intervalDays,
    next_review: addDays(now, intervalDays),
  };
}

export { addDays, nextInterval, computeSchedule };
