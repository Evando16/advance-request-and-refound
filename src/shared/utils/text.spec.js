import parseToPascalCase from './text';

describe('TextUtils', () => {
  describe('Unit tests', () => {
    it('should parse a full UPPERCASE text to PascalCase', () => {
      expect(parseToPascalCase('FULL UPPER CASE')).toEqual('Full Upper Case');
    });

    it('should parse a full lowercase text to PascalCase', () => {
      expect(parseToPascalCase('full lower case')).toEqual('Full Lower Case');
    });

    it('should not parse when not a valid text', () => {
      expect(parseToPascalCase(null)).toBeNull();
    });

    it('should parse only space text', () => {
      expect(parseToPascalCase('       ')).toEqual('       ');
    });
  });
});
