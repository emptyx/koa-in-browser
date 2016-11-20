'use strict';

/**
 * Module dependencies.
 */
const net = require('net');
const qs = require('qs');

/**
 * Prototype.
 */
module.exports = {
    /**
     * Return request header.
     *
     * @return {Object}
     * @api public
     */
    get header() {
        return {
            Cookie: document.cookie,
            Host: window.location.host,
            'User-Agent': window.navigator.userAgent
        };
    },

    /**
     * Return request header, alias as request.header
     *
     * @return {Object}
     * @api public
     */
    get headers() {
        return this.header;
    },

    /**
     * Get request URL.
     *
     * @return {String}
     * @api public
     */
    get url() {
        return window.location.href;
    },

    /**
     * Get origin of URL.
     *
     * @return {String}
     * @api public
     */
    get origin() {
        return window.location.protocol + '://' + window.location.host;
    },

    /**
     * Get full request URL.
     *
     * @return {String}
     * @api public
     */
    get href() {
        return window.location.href || '';
    },

    /**
     * Get request pathname.
     *
     * @return {String}
     * @api public
     */
    get path() {
        return window.location.pathname || '';
    },

    /**
     * Get parsed query-string.
     *
     * @return {Object}
     * @api public
     */
    get query() {
        const str = this.querystring;
        const c = this._querycache = this._querycache || {};
        return c[str] || (c[str] = qs.parse(str));
    },

    /**
     * Get query string.
     *
     * @return {String}
     * @api public
     */
    get querystring() {
        let search = this.search;
        if (search.indexOf('?') == -1) return '';
        return search.slice(1, search.length);
    },

    /**
     * Get the search string. Same as the querystring
     * except it includes the leading ?.
     *
     * @return {String}
     * @api public
     */
    get search() {
        return window.location.search || '';
    },

    /**
     * Parse the "Host" header field host
     * and support X-Forwarded-Host when a
     * proxy is enabled.
     *
     * @return {String} hostname:port
     * @api public
     */
    get host() {
        return window.location.host || '';
    },

    /**
     * Parse the "Host" header field hostname
     *
     * @return {String} hostname
     * @api public
     */
    get hostname() {
        const host = this.host;
        if (!host) return '';
        return host.split(':')[0];
    },

    /**
     * Return the protocol string "http" or "https"
     *
     * @return {String}
     * @api public
     */

    get protocol() {
        return window.location.protocol || '';
    },

    /**
     * Short-hand for:
     *
     *    this.protocol == 'https'
     *
     * @return {Boolean}
     * @api public
     */

    get secure() {
        return 'https' == this.protocol;
    },

    /**
     * Return subdomains as an array.
     *
     * Subdomains are the dot-separated parts of the host before the main domain of
     * the app. By default, the domain of the app is assumed to be the last two
     * parts of the host. This can be changed by setting `app.subdomainOffset`.
     *
     * For example, if the domain is "tobi.ferrets.example.com":
     * If `app.subdomainOffset` is not set, this.subdomains is `["ferrets", "tobi"]`.
     * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
     *
     * @return {Array}
     * @api public
     */

    get subdomains() {
        const offset = this.app.subdomainOffset;
        const hostname = this.hostname;
        if (net.isIP(hostname)) return [];
        return hostname
            .split('.')
            .reverse()
            .slice(offset);
    },

    /**
     * Return request header.
     *
     * The `Referrer` header field is special-cased,
     * both `Referrer` and `Referer` are interchangeable.
     *
     * Examples:
     *
     *     this.get('Content-Type');
     *     // => "text/plain"
     *
     *     this.get('content-type');
     *     // => "text/plain"
     *
     *     this.get('Something');
     *     // => undefined
     *
     * @param {String} field
     * @return {String}
     * @api public
     */
    get(field) {
        switch (field = field.toLowerCase()) {
            case 'referer':
            case 'referrer':
                return window.document.referrer || '';
            default:
                return this.headers[field] || '';
        }
    },

    /**
     * Inspect implementation.
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
     * @return {Object}
     * @api public
     */

    toJSON() {
        return {
            url: this.url,
            header: this.header
        };
    }
};
