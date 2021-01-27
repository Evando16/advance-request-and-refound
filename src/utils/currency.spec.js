import formatCurrency from './currency';

describe('Unit tests', () => {
  it('should formart value to BRL currency', () => {
    expect(formatCurrency(16000.16, 'BRL')).toEqual('16.000,16');
  });

  it('should not format null currency value', () => {
    expect(formatCurrency(null, 'BRL')).toEqual(null);
  });

  it('should not format NaN currency value', () => {
    expect(formatCurrency('NaN', 'BRL')).toEqual(null);
  });

  it('should not format null currency code', () => {
    expect(formatCurrency(16000.16, null)).toEqual(null);
  });
});
