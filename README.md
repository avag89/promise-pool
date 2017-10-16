# Promise Queue Pool

## Install

```npm install --save promise-pool2```

## Docs

- **constructor(capacity)** - accepts `capacity` the maximum number of promises that can be executed at every moment

- **.add(fn)** - accepts function with no arguments, which returns promise object that must be executed later. `add` method returns new `Promise` which will resolved/rejected later

## Usage

```
const PromisePool = require('promise-pool2');
const pool = new PromisePool(3);  // maximum 3 promises can be executed at every moment

Promise.all([
        pool.add(_ => wait(100, 'Hello!')).then(print),
        pool.add(_ => wait(100, 'This')).then(print),
        pool.add(_ => wait(100, 'is')).then(print),
        pool.add(_ => wait(100, 'a')).then(print),
        pool.add(_ => wait(100, 'simple')).then(print),
        pool.add(_ => wait(100, 'demo')).then(print),
        pool.add(_ => wait(100, 'of')).then(print),
        pool.add(_ => wait(100, 'promise-pool2')).then(print)
    ])
    .then(messages => {
        console.log(messages.join(' '));
    });



function wait (delay, txt) {
    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            resolve(txt);
        }, delay);
    });
}
function print (txt) {
    console.log(txt);
    return txt;
}
```

