export default function parseDate(date) {
  return new Date(date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
