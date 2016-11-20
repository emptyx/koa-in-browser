'use strict';

/**
 * Module dependencies.
 */
const assert = require('assert');
const delegate = require('delegates');

const proto = module.exports = {
    /**
     * util.inspect() implementation, which
     * just returns the JSON output.
     *
     * @return {Object}
     * @api public
     */

    inspect() {
        return this.toJSON();
    },

    /**
     * Return JSON representation.
     *
     * Here we explicitly invoke .toJSON() on each
     * object, as iteration will otherwise fail due
     * to the getters and cause utilities such as
     * clone() to fail.
     *
     * @return {Object}
     * @api public
     */

    toJSON() {
        return {
            request: this.request.toJSON(),
            app: this.app.toJSON(),
            originalUrl: this.originalUrl
        };
    },
    assert,

    throw: function() {
        throw new Error(arguments);
    },

    /**
     * Default error handling.
     *
     * @param {Error} err
     * @api private
     */

    onerror(err) {
        // don't do anything if there is no error.
        // this allows you to pass `this.onerror`
        // to node-style callbacks.
        if (null == err) return;

        if (!(err instanceof Error)) err = new Error('non-error thrown: ' + err);

        // delegate
        this.app.emit('error', err, this);
        console.error(err);
    }
};

/**
 * Request delegation.
 */

delegate(proto, 'request')
    .method('get')
    .access('querystring')
    .access('search')
    .access('query')
    .access('path')
    .access('url')
    .getter('origin')
    .getter('href')
    .getter('subdomains')
    .getter('protocol')
    .getter('host')
    .getter('hostname')
    .getter('header')
    .getter('headers')
    .getter('secure');
