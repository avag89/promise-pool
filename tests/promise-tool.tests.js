const {expect} = require('chai');

describe('Promise pool tests', () => {
    const PromisePool = require('../lib/promise-pool');

    it('should preserve call order', () => {
        const pool = new PromisePool(7);

        const ps = [];
        for (let i = 0; i < 10; i++) {
            ps.push(pool.add(() => wait(i*100, _ => i)));
        }

        return Promise.all(ps).then(nums => {
            expect(nums.join()).to.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join())
        });
    });

    function wait(delay, fn) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(fn());
            }, delay);
        });
    }
});