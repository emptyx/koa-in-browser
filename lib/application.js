'use strict';
/**
 * Module dependencies
 */
const Emitter = require('events').EventEmitter;
const compose = require('koa-compose');
const Context = require('./context');
// https://www.npmjs.com/package/browser-cookies
const Cookies = require('browser-cookies');
const assert = require('assert');
const co = require('co');

/**
 * Initialize a new `Application`.
 */
class Application extends Emitter {
    constructor() {
        super();
        if (!(this instanceof Application)) return new Application;
        // todo
        this.env = 'production';
        this.subdomainOffset = 2;
        this.middleware = [];
        this.context = Object.create(Context);
    }

    /**
     * Use the given middleware `fn`.
     *
     * @param {GeneratorFunction} fn
     * @return {Application} self
     * @api public
     */
    use(fn) {
        // es7 async functions are not allowed,
        // so we have to make sure that `fn` is a generator function
        assert(fn && 'GeneratorFunction' == fn.constructor.name, 'app.use() requires a generator function');
        this.middleware.push(fn);
        return this;
    }

    /**
     * When koa in Node,we return a request handler callback for node's native http server.
     * But now in browser,we just call start.
     */
    start() {
        const fn = co.wrap(compose(this.middleware));
        if (!this.listeners('error').length) this.on('error', this.onerror);

        const ctx = this._createContext();
        fn.call(ctx).then(() => {
            finish.call(ctx);
        }).catch(ctx.onerror);
    }

    /**
     * Initialize a new context.
     *
     * @return {Object}
     * @api private
     */
    _createContext() {
        const context = Object.create(this.context);
        context.app = this;
        context.onerror = context.onerror.bind(context);
        context.originalUrl = window.location.href;
        context.cookies = Cookies;
        context.state = {};
        return context;
    }

    onerror(err) {
        assert(err instanceof Error, 'non-error thrown: ' + err);

        const msg = err.stack || err.toString();
        console.error();
        console.error(msg.replace(/^/gm, '  '));
        console.error();
    }
}

function finish() {
    // todo
    const body = this.body;
    console.log(body);
}

module.exports = Application;
