/**
 * Copyright (C) 2016 pantojs.xyz
 * test.js
 *
 * changelog
 * 2016-06-24[10:35:29]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
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
});