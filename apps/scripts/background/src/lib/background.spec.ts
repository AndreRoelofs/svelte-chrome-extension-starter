import { background } from './lib/background.ts';

describe('background', () => {
    it('should work', () => {
        expect(background()).toEqual('background');
    });
});
