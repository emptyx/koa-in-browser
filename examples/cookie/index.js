'use strict';

const co = require('co');
const koa = require('../../dist/koa-browser');

function init() {
    co(function*() {
        const app = koa();

        app.use(function*(next) {
            this.cookies.set('koa-browser', 'test' + new Date().valueOf());
            yield next;
        });

        app.use(function*(next) {
            console.log(`cookie: ${this.cookies.get('koa-browser')}`);
        });
        app.start();
    });
}
init();
