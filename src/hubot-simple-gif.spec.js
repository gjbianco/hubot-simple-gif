const sut = require('./hubot-simple-gif');

describe('hubot-simple-gif', () => {
  describe('#_weightedRand', () => {
    it('should return 0 if no spec defined', () => {
      expect(sut._weightedRand()).toBe('0');
    });

    it('should return a weighted random number when provided a spec', () => {
      const rand = sut._weightedRand([0, 1]);
      expect(rand).toBe('1');
    });

    it('should return values bound to size of spec array', () => {
      expect(sut._weightedRand([0.5])).toBe('0');
    });

    it('should return a value even if results dont add up to 100%', () => {
      expect(sut._weightedRand([0, 0.01, 0])).toBe('1');
    });
  });

  describe('#_processGif', () => {
    let gifList;
    beforeEach(() => {
      gifList = [
        { url: 'gif0url' },
        { url: 'gif1url' },
        { url: 'gif2url' },
        { url: 'gif3url' }
      ];
    });

    it('should return a url', () => {
      expect(sut._processGifList(gifList)).toMatch(/^gif\durl$/);
    });

    it('should return a nice error message if no results', () => {
      expect(sut._processGifList([])).toMatch(/^sorry.*$/);
    });
  });

  // TODO properly mock out axios to better test
  describe('#getGif', () => {
    it('should return a Promise', () => {
      sut.getGif('dummy query').then(result => {
        expect(result).toBeTruthy();
      });
    });
  });
});
