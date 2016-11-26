'use strict';

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
function compose(middleware) {
    return function*(next) {
        if (!next) next = noop();
        let i = middleware.length;

        while (i--) {
            next = middleware[i].call(this, next);
        }

        return yield * next;
    };
}
/**
 * Noop.
 *
 * @api private
 */

function* noop() {}

/**
 * Expose compositor.
 */
module.exports = compose;
