/**
 * Copyright (C) 2016 pantojs.xyz
 * transformer.js
 *
 * changelog
 * 2016-06-21[19:30:48]:revised
 * 2016-06-26[12:38:57]:"isSkip" supports string/function 
 *
 * @author yanni4night@gmail.com
 * @version 0.2.0
 * @since 0.1.0
 */
'use strict';

const defineFrozenProperty = require('define-frozen-property');

class Transformer {
    constructor(opt) {
        if (!panto._.isNil(opt) && !panto._.isPlainObject(opt)) {
            throw new Error(`A PLAIN OBJECT is required to construct a transformer`);
        }

        defineFrozenProperty(this, 'options', panto._.extend({}, opt), true);
    }
    transformAll(files) {
        if (!Array.isArray(files)) {
            throw new Error(`files should be array, but it's ${files}`);
        }
        return Promise.all(files.map(file => this.transform(file))).then(panto._.flattenDeep).then(panto._.filter);
    }
    transform(file) {
        if (panto._.isNil(file)) {
            return Promise.resolve(file);
        }

        const {
            isSkip
        } = this.options;

        if (true === isSkip) {
            return Promise.resolve(file);
        } else if (panto._.isFunction(isSkip)) {
            if (isSkip.call(file, file)) {
                return Promise.resolve(file);
            }
        } else if (panto._.isString(isSkip)) {
            if (panto.file.match(file.filename, isSkip)) {
                return Promise.resolve(file);
            }
        }

        return this._transform(file);
    }
    _transform(file) {
        return Promise.resolve(file);
    }
}

module.exports = Transformer;