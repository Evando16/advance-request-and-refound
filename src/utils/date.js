export default function parseDate(date) {
  return new Date(date).toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
}
