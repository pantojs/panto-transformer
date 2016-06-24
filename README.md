# panto-transformer
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Base transformer for panto.

```js
const Transformer = require('panto-transformer');

class CustomTransformer extends Transformer {
    _transform(file) {
        return Promise.resolve(panto.util.extend(file, {
            content: 'This is inserted by cutsom transformer'
        }));
    }
}
```

## options
 - options: object, options
 - isSkip: Boolean, if skip this transformer

[npm-url]: https://npmjs.org/package/panto-transformer
[downloads-image]: http://img.shields.io/npm/dm/panto-transformer.svg
[npm-image]: http://img.shields.io/npm/v/panto-transformer.svg
[travis-url]: https://travis-ci.org/pantojs/panto-transformer
[travis-image]: http://img.shields.io/travis/pantojs/panto-transformer.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-transformer
[david-dm-image]:https://david-dm.org/pantojs/panto-transformer.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-transformer#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-transformer/dev-status.svg