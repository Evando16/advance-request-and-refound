import parseDate from './date';

describe('DateUtils', () => {
  describe('Unit tests', () => {
    it('should parse event date to DD/MM/YYYY text date', () => {
      expect(parseDate(1611679537969)).toEqual('26/01/2021');
    });
  });
});
