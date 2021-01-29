export default function parseToPascalCase(text) {
  if (!text || !text.trim()) {
    return text;
  }

  const wordArray = text.trim().split(' ');

  return wordArray.map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`).join(' ');
}
