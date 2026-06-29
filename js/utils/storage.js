const STORAGE_KEYS = {
  ANSWERS: 'ff_answers',
  LEAD: 'ff_lead',
  RESULTS: 'ff_results'
};

export function saveAnswers(answers) {
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
}

export function getAnswers() {
  const data = localStorage.getItem(STORAGE_KEYS.ANSWERS);
  return data ? JSON.parse(data) : {};
}

export function saveLead(lead) {
  localStorage.setItem(STORAGE_KEYS.LEAD, JSON.stringify(lead));
}

export function getLead() {
  const data = localStorage.getItem(STORAGE_KEYS.LEAD);
  return data ? JSON.parse(data) : null;
}

export function saveResults(results) {
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
}

export function getResults() {
  const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
  return data ? JSON.parse(data) : null;
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEYS.ANSWERS);
  localStorage.removeItem(STORAGE_KEYS.RESULTS);
}

export function clearLead() {
  localStorage.removeItem(STORAGE_KEYS.LEAD);
}
