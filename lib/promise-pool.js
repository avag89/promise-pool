
module.exports = function (poolCapacity) {
    this.add = add;

    const pool = [];
    let ongoing = 0;

    function add (promiseExecutorFn) {
        return new Promise((resolve, reject) => {
            pool.push({ promiseExecutorFn, resolve, reject });

            next();
        });
    }

    function next() {
        //No items in the pool
        if (!pool.length) {
            return;
        }

        if (ongoing < poolCapacity) {
            const { promiseExecutorFn, resolve, reject } = pool.shift();

            ongoing++;
            promiseExecutorFn().then(data => {
                ongoing--;

                resolve(data);

                next();
            }).catch(err => {
                ongoing--;

                reject(err);

                next();
            });
        }
    }
};
