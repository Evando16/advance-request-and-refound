const CODES = {
  BRL: 'pt-BR',
  ARS: 'es-AR',
  MXN: 'es-MX',
  USD: 'en-US',
  AUD: 'en-AU',
};

export default function formatCurrency(currencyValue, currencyCode) {
  if (!currencyValue || Number.isNaN(Number(currencyValue)) || !currencyCode) {
    return '0';
  }

  return new Intl.NumberFormat(CODES[currencyCode]).format(currencyValue);
}
