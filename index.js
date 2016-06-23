/**
 * Copyright (C) 2016 pantojs.xyz
 * transformer.js
 *
 * changelog
 * 2016-06-21[19:30:48]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.2
 * @since 0.1.0
 */
'use strict';

class Transformer {
    constructor(opt) {
        if (!panto.util.isNil(opt) && !panto.util.isPlainObject(opt)) {
            throw new Error(`A PLAIN OBJECT is required to construct a transformer`);
        }

        Object.defineProperty(this, 'options', {
            value: panto.util.extend({}, opt),
            writable: false,
            configurable: false,
            enumerable: true
        });
    }
    transform(file) {
        if (panto.util.isNil(file) || true === this.options.isSkip) {
            return Promise.resolve(file);
        }

        return this._transform(file);
    }
    _transform(file) {
        return Promise.resolve(file);
    }
}

module.exports = Transformer;