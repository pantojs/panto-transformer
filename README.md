# panto-transformer
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Base transformer for panto.

>Transformer can transform the content or anything else of a file or multiple files.It is used to pipe into streams to a chain.

```js
const Transformer = require('panto-transformer');

class CustomTransformer extends Transformer {
    transformAll(files) {
        return super.transformAll(files);
    }
    _transform(file) {
        return Promise.resolve(panto._.extend(file, {
            content: 'This is inserted by cutsom transformer'
        }));
    }
    isTorrential() {
        return false;
    }
    isCacheable() {
        return true;
    }
}

new CustomTransformer({
    isSkip: '3rd/*.js'
}).transformAll(files).then(...)
```

## options
 - options: Object, options
 - options.isSkip: Boolean|Function|String|RegExp, if skip this transformer on the file
 - options.isCacheable: Boolean, if is cacheable, used by isCacheable function by default

## apis
 - transformAll(array): Promise, call _transform_
 - transform(object): Promise, call _\_transform_
 - isTorrential(): Boolean, if torrential, default false
 - isCacheable(): Boolean, if cacheable, default equals options.isCacheable

[npm-url]: https://npmjs.org/package/panto-transformer
[downloads-image]: http://img.shields.io/npm/dm/panto-transformer.svg
[npm-image]: http://img.shields.io/npm/v/panto-transformer.svg
[travis-url]: https://travis-ci.org/pantojs/panto-transformer
[travis-image]: http://img.shields.io/travis/pantojs/panto-transformer.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-transformer
[david-dm-image]:https://david-dm.org/pantojs/panto-transformer.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-transformer#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-transformer/dev-status.svg
[coveralls-image]:https://coveralls.io/repos/github/pantojs/panto-transformer/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/pantojs/panto-transformer?branch=master