export default function parseDate(date) {
  return new Date(date).toLocaleString('br', { year: 'numeric', month: 'numeric', day: 'numeric' });
}
