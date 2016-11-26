'use strict';

const co = require('co');
const koa = require('../../dist/koa-browser');

function init() {
    co(function*() {
        const app = koa();

        app.use(function*(next) {
            console.log('cityid:' + this.query.cityid);
        });
        app.start();
    });
}
init();
