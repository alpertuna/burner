var vows = require('vows')
var assert = require('assert')
var requirejs = require('requirejs')
var requirejsConfig = require('../requirejs.config')
requirejs.config(requirejsConfig)

var createClass = requirejs('core/createClass')

vows.describe('createClass').addBatch({
  'A class': {
    'with init method gets and sets parameter as its own property': {
      'topic': createClass({
        'init': function (param) {
          this.set('param', param)
        }
      }),

      'creating instance with parameter 7': {
        'topic': function (AClass) {
          return AClass.new(7)
        },
        'should return 7 when you `get()` property': function (topic) {
          assert.equal(topic.get('param'), 7)
        },
        'should return 8 when you `inc()` and get property': function (topic) {
          assert.equal(topic.inc('param').get('param'), 8)
        },
        'should return undefined when you `unset()` and get property': function (topic) {
          assert.isUndefined(topic.unset('param').get('param'))
        },

        'checking if it `isInstanceOf(AClass)`': {
          'topic': function (instance, AClass) {
            return instance.isInstanceOf(AClass)
          },
          'should return true': function (topic) {
            assert.isTrue(topic)
          }
        }
      },

      'extending it with `getParam` method': {
        'topic': function (AClass) {
          return AClass.extend({
            'getParam': function () {
              return this.get('param')
            }
          })
        },
        'creating instance with parameter 9': {
          'topic': function (ExtendedClass) {
            return ExtendedClass.new(9)
          },
          'should return 9 when you call `getParam()`': function (topic) {
            assert.equal(topic.getParam(), 9)
          }
        },
        'extending again with override `getParam` method which increases param by 2 and returns super method': {
          'topic': function (ExtendedClass) {
            return ExtendedClass.extend({
              'getParam': function () {
                this.inc('param', 2)
                return this.super.getParam()
              }
            })
          },
          'creating instance with parameter 3': {
            'topic': function (ExtendedExtendedClass) {
              return ExtendedExtendedClass.new(3)
            },
            'should return 5 when you call `getParam()`': function (topic) {
              assert.equal(topic.getParam(), 5)
            },
            'checking if it `isInstanceOf(AClass)`': {
              'topic': function (instance, ExtendedExtendedClass, ExtendedClass, AClass) {
                return instance.isInstanceOf(AClass)
              },
              'should return true': function (topic) {
                assert.isTrue(topic)
              }
            },
            'checking if it `isInstanceOf(ExtendedClass)`': {
              'topic': function (instance, ExtendedExtendedClass, ExtendedClass, AClass) {
                return instance.isInstanceOf(ExtendedClass)
              },
              'should return true': function (topic) {
                assert.isTrue(topic)
              }
            }
          }
        }
      }
    },

    'with `getName` and `getFullName`': {
      'topic': createClass({
        'getName': function () {
          return 'Alice'
        },
        'getFullName': function () {
          return 'Mrs. ' + this.getName()
        }
      }),
      'creating instance of the class': {
        'topic': function (AClass) {
          return AClass.new()
        },
        'should return "Mrs. Alice" when you call `getFullName`': function (topic) {
          assert.equal(topic.getFullName(), 'Mrs. Alice')
        }
      },
      'extending it with override `getName`': {
        'topic': function (AClass) {
          return AClass.extend({
            'getName': function () {
              return 'Bob and ' + this.super.getName()
            }
          })
        },
        'creating instance of the extended class': {
          'topic': function (ExtendedClass) {
            return ExtendedClass.new()
          },
          'should return "Mrs. Alice" again when you call `getFullName`': function (topic) {
            assert.equal(topic.getFullName(), 'Mrs. Alice')
          },
          'should return "Bob and Alice" when you call `getName`': function (topic) {
            assert.equal(topic.getName(), 'Bob and Alice')
          }
        }
      }
    }
  }
}).export(module)
