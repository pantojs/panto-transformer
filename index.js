/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-06-21[19:30:48]:revised
 * 2016-06-26[12:38:57]:"isSkip" supports string/function 
 * 2016-07-06[21:36:53]:add #isTorrential #transformAll
 * 2016-07-30[09:16:21]:add #isCacheable
 *
 * @author yanni4night@gmail.com
 * @version 0.2.5
 * @since 0.1.0
 */
'use strict';

const defineFrozenProperty = require('define-frozen-property');

/** Class representing a transformer */
class Transformer {
    constructor(opt) {
        if (!panto._.isNil(opt) && !panto._.isPlainObject(opt)) {
            throw new Error(`A PLAIN OBJECT is required to construct a transformer`);
        }

        defineFrozenProperty(this, 'options', panto._.extend({}, opt), true);
    }
    /**
     * If this transformer is torrential.
     *
     * Torrential means #transformAll will be called
     * instead of #transform. You can use it make some
     * special multiple-to-one transforming. Note that
     * torrential makes increment transforming much slower.
     * 
     * @return {Boolean}
     */
    isTorrential() {
        return false;
    }
    /**
     * If cacheable.
     * 
     * @return {Boolean}
     */
    isCacheable() {
        return !!this.options.isCacheable;
    }
    /**
     * Transform some files, by default,
     * it will call #transform for each file.
     * 
     * @param  {Array}
     * @return {Promise}
     */
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
            if (panto.file.match(file.filename, isSkip).length) {
                return Promise.resolve(file);
            }
        }

        return this._transform(file);
    }
    /**
     * Overide this to transform a file.
     * 
     * @param  {Object}
     * @return {Promise}
     */
    _transform(file) {
        return Promise.resolve(file);
    }
}

module.exports = Transformer;
