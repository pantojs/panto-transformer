/**
  * Copyright (C) 2016 pentojs.xyz
  * transformer.js
  *
  * changelog
  * 2016-06-21[19:30:48]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */
'use strict';

class Transformer {
    constructor(opt) {
        if (!panto.util.isNil(opt) && !panto.util.isPlainObject(opt)) {
            throw new Error(`A PLAIN OBJECT is required to construct a transformer`);
        }
        this.options = panto.util.extend({}, opt);
    }
    transform(file) {
        if (panto.util.isNil(file) || true === this.options.isSkip) {
            return Promise.resolve([]);
        }

        return this._transform(file);
    }
    _transform(file) {
        return Promise.resolve(file);
    }
}

module.exports = Transformer;