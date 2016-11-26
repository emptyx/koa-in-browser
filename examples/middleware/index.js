'use strict';

const co = require('co');
const koa = require('../../dist/koa-browser');

function init() {
    co(function*() {
        const app = koa();
        let calls = [];

        app.use(function*(next) {
            calls.push(1);
            yield next;
            calls.push(6);
        });

        app.use(function*(next) {
            calls.push(2);
            yield next;
            calls.push(5);
        });

        app.use(function*(next) {
            calls.push(3);
            yield next;
            calls.push(4);
        });
        app.on('finish', () => {
            console.log(`result should be [1,2,3,4,5,6],and now is ${JSON.stringify(calls)}`);
        });
        app.start();
    });
}
init();
