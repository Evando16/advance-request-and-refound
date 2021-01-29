import formatCurrency from './currency';

describe('CurrencyUtils', () => {
  describe('Unit tests', () => {
    it('should formart value to BRL currency', () => {
      expect(formatCurrency(16000.16, 'BRL')).toEqual('16.000,16');
    });

    it('should formart when value is equal 0', () => {
      expect(formatCurrency(0, 'BRL')).toEqual('0');
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
});
