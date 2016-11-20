'use strict';

const co = require('co');
const koa = require('../dist/koa-browser');

function init() {
    co(function*() {
        const app = new koa();
        let calls = [];

        app.use(function*(next) {
            console.log(this.cookies.get('cityid'));
            console.log(this.query.cityid);
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
            alert(calls);
        });
        app.start();
    });
}
init();
