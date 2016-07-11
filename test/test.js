/**
 * Copyright (C) 2016 pantojs.xyz
 * test.js
 *
 * changelog
 * 2016-06-24[10:35:29]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.2.0
 * @since 0.1.0
 */
'use strict';
const assert = require('assert');
const panto = require('panto');
const PantoTransformer = require('../');

describe('panto-transformer', () => {
    describe('.options', () => {
        it('should be enumerable', () => {
            const p = new PantoTransformer();
            assert.ok(p.propertyIsEnumerable('options'));
        });

        it('should be sealed', () => {
            const p = new PantoTransformer();
            assert.throws(() => {
                p.options = 1;
            });
            assert.throws(() => {
                delete p.options;
            });
        });

        it('should extend "options"', () => {
            const p = new PantoTransformer({
                data: 0x0810
            });
            assert.deepEqual(p.options.data, 0x0810);
        });

        it('should throw error if options is illegal', () => {
            assert.throws(() => {
                new PantoTransformer([]);
            });
        });
    });
    describe('.options.isSkip', () => {
        it('should support boolean', done => {
            const file = {
                filename: 'a.js'
            };
            new PantoTransformer({
                isSkip: true
            }).transform(file).then(tfile => {
                assert.deepEqual(tfile, file);
            }).then(() => {
                done();
            });
        });
        it('should support function', done => {
            const file = {
                filename: 'a.js'
            };
            new PantoTransformer({
                isSkip: () => true
            }).transform(file).then(tfile => {
                assert.deepEqual(tfile, file);
            }).then(() => {
                done();
            });
        });
        it('should support string', done => {
            const file = {
                filename: 'a.js'
            };
            new PantoTransformer({
                isSkip: '*.js'
            }).transform(file).then(tfile => {
                assert.deepEqual(tfile, file);
            }).then(() => {
                done();
            });
        });
    });
    describe('#transform', () => {
        it('should get origin if null', done => {
            new PantoTransformer().transform(null).then(file => {
                assert.deepEqual(file, null);
                done();
            });
        });
        it('should get origin if undefined', done => {
            new PantoTransformer().transform(undefined).then(file => {
                assert.deepEqual(file, undefined);
                done();
            });
        });
        it('should get origin if "isSkip" is true', done => {
            const file = {
                filename: 'a.js'
            };
            new PantoTransformer().transform(file).then(tfile => {
                assert.deepEqual(tfile, file);
                done();
            });
        });
    });
    describe('#transformAll', () => {
        it('argument validation', () => {
            assert.throws(() => {
                new PantoTransformer().transformAll({});
            });
        });
        it('all pass', done => {
            const files = [{
                filename: 'a.js'
            }, {
                filename: 'b.js'
            }, {
                filename: 'c.js'
            }];
            new PantoTransformer().transformAll(files).then(tfiles => {
                assert.deepEqual(tfiles, files);
            }).then(() => done());
        });
        it('falsity value filtered', done => {
            const files = [null, {
                filename: 'b.js'
            }, {
                filename: 'c.js'
            }, NaN, 0, undefined];
            new PantoTransformer().transformAll(files).then(tfiles => {
                assert.deepEqual(tfiles, [{
                    filename: 'b.js'
                }, {
                    filename: 'c.js'
                }]);
            }).then(() => done());
        });
        it('skip a.js', done => {
            class TestTransformer extends PantoTransformer {
                _transform(file) {
                    return Promise.resolve(panto._.extend(file, {
                        content: file.content + file.content
                    }))
                }
            }
            const files = [{
                filename: 'a.js',
                content: 'a'
            }, {
                filename: 'b.js',
                content: 'b'
            }];
            new TestTransformer({
                isSkip: 'a.js'
            }).transformAll(files).then(tfiles => {
                assert.deepEqual(tfiles, [{
                    filename: 'a.js',
                    content: 'a'
                }, {
                    filename: 'b.js',
                    content: 'bb'
                }]);
            }).then(() => done());
        });
    });
    describe('#isTorrential', () => {
        it('should return false by default', () => {
            assert.deepEqual(new PantoTransformer().isTorrential(), false);
        });
    });
});