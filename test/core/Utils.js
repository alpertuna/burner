var vows = require('vows')
var assert = require('assert')
var requirejs = require('requirejs')
var requirejsConfig = require('../requirejs.config')
requirejs.config(requirejsConfig)

var Utils = requirejs('core/Utils')

vows.describe('Utils').addBatch({
  'Check if each one': {
    topic: {
      'null': null,
      'undefined': undefined,

      'positiveInteger': 10,
      'negativeInteger': -10,
      'zeroInteger': 0,
      'float': 0.5,
      'nan': NaN,
      'infinity': Infinity,

      'zeroString': '0',
      'emptyString': '',
      'string': 'Hello',

      'booleanTrue': true,
      'booleanFalse': false,

      'emptyArray': [],
      'array': [1, 2],

      'emptyObject': {},
      'object': {'key': 'value'},

      'function': function () {}
    },
    'is string': function (topic) {
      assert.strictEqual(Utils.isString(topic.null), false)
      assert.strictEqual(Utils.isString(topic.undefined), false)

      assert.strictEqual(Utils.isString(topic.positiveInteger), false)
      assert.strictEqual(Utils.isString(topic.negativeInteger), false)
      assert.strictEqual(Utils.isString(topic.zeroInteger), false)
      assert.strictEqual(Utils.isString(topic.float), false)
      assert.strictEqual(Utils.isString(topic.nan), false)
      assert.strictEqual(Utils.isString(topic.infinity), false)

      assert.strictEqual(Utils.isString(topic.zeroString), true)
      assert.strictEqual(Utils.isString(topic.emptyString), true)
      assert.strictEqual(Utils.isString(topic.string), true)

      assert.strictEqual(Utils.isString(topic.booleanTrue), false)
      assert.strictEqual(Utils.isString(topic.booleanFalse), false)

      assert.strictEqual(Utils.isString(topic.emptyArray), false)
      assert.strictEqual(Utils.isString(topic.array), false)

      assert.strictEqual(Utils.isString(topic.emptyObject), false)
      assert.strictEqual(Utils.isString(topic.object), false)

      assert.strictEqual(Utils.isString(topic.function), false)
    },
    'is boolean': function (topic) {
      assert.strictEqual(Utils.isBoolean(topic.null), false)
      assert.strictEqual(Utils.isBoolean(topic.undefined), false)

      assert.strictEqual(Utils.isBoolean(topic.positiveInteger), false)
      assert.strictEqual(Utils.isBoolean(topic.negativeInteger), false)
      assert.strictEqual(Utils.isBoolean(topic.zeroInteger), false)
      assert.strictEqual(Utils.isBoolean(topic.float), false)
      assert.strictEqual(Utils.isBoolean(topic.nan), false)
      assert.strictEqual(Utils.isBoolean(topic.infinity), false)

      assert.strictEqual(Utils.isBoolean(topic.zeroString), false)
      assert.strictEqual(Utils.isBoolean(topic.emptyString), false)
      assert.strictEqual(Utils.isBoolean(topic.string), false)

      assert.strictEqual(Utils.isBoolean(topic.booleanTrue), true)
      assert.strictEqual(Utils.isBoolean(topic.booleanFalse), true)

      assert.strictEqual(Utils.isBoolean(topic.emptyArray), false)
      assert.strictEqual(Utils.isBoolean(topic.array), false)

      assert.strictEqual(Utils.isBoolean(topic.emptyObject), false)
      assert.strictEqual(Utils.isBoolean(topic.object), false)

      assert.strictEqual(Utils.isBoolean(topic.function), false)
    },
    'is number': function (topic) {
      assert.strictEqual(Utils.isNumber(topic.null), false)
      assert.strictEqual(Utils.isNumber(topic.undefined), false)

      assert.strictEqual(Utils.isNumber(topic.positiveInteger), true)
      assert.strictEqual(Utils.isNumber(topic.negativeInteger), true)
      assert.strictEqual(Utils.isNumber(topic.zeroInteger), true)
      assert.strictEqual(Utils.isNumber(topic.float), true)
      assert.strictEqual(Utils.isNumber(topic.nan), true)
      assert.strictEqual(Utils.isNumber(topic.infinity), true)

      assert.strictEqual(Utils.isNumber(topic.zeroString), false)
      assert.strictEqual(Utils.isNumber(topic.emptyString), false)
      assert.strictEqual(Utils.isNumber(topic.string), false)

      assert.strictEqual(Utils.isNumber(topic.booleanTrue), false)
      assert.strictEqual(Utils.isNumber(topic.booleanFalse), false)

      assert.strictEqual(Utils.isNumber(topic.emptyArray), false)
      assert.strictEqual(Utils.isNumber(topic.array), false)

      assert.strictEqual(Utils.isNumber(topic.emptyObject), false)
      assert.strictEqual(Utils.isNumber(topic.object), false)

      assert.strictEqual(Utils.isNumber(topic.function), false)
    },
    'is object': function (topic) {
      assert.strictEqual(Utils.isObject(topic.null), true)
      assert.strictEqual(Utils.isObject(topic.undefined), false)

      assert.strictEqual(Utils.isObject(topic.positiveInteger), false)
      assert.strictEqual(Utils.isObject(topic.negativeInteger), false)
      assert.strictEqual(Utils.isObject(topic.zeroInteger), false)
      assert.strictEqual(Utils.isObject(topic.float), false)
      assert.strictEqual(Utils.isObject(topic.nan), false)
      assert.strictEqual(Utils.isObject(topic.infinity), false)

      assert.strictEqual(Utils.isObject(topic.zeroString), false)
      assert.strictEqual(Utils.isObject(topic.emptyString), false)
      assert.strictEqual(Utils.isObject(topic.string), false)

      assert.strictEqual(Utils.isObject(topic.booleanTrue), false)
      assert.strictEqual(Utils.isObject(topic.booleanFalse), false)

      assert.strictEqual(Utils.isObject(topic.emptyArray), true)
      assert.strictEqual(Utils.isObject(topic.array), true)

      assert.strictEqual(Utils.isObject(topic.emptyObject), true)
      assert.strictEqual(Utils.isObject(topic.object), true)

      assert.strictEqual(Utils.isObject(topic.function), false)
    },
    'is array': function (topic) {
      assert.strictEqual(Utils.isArray(topic.null), false)
      assert.strictEqual(Utils.isArray(topic.undefined), false)

      assert.strictEqual(Utils.isArray(topic.positiveInteger), false)
      assert.strictEqual(Utils.isArray(topic.negativeInteger), false)
      assert.strictEqual(Utils.isArray(topic.zeroInteger), false)
      assert.strictEqual(Utils.isArray(topic.float), false)
      assert.strictEqual(Utils.isArray(topic.nan), false)
      assert.strictEqual(Utils.isArray(topic.infinity), false)

      assert.strictEqual(Utils.isArray(topic.zeroString), false)
      assert.strictEqual(Utils.isArray(topic.emptyString), false)
      assert.strictEqual(Utils.isArray(topic.string), false)

      assert.strictEqual(Utils.isArray(topic.booleanTrue), false)
      assert.strictEqual(Utils.isArray(topic.booleanFalse), false)

      assert.strictEqual(Utils.isArray(topic.emptyArray), true)
      assert.strictEqual(Utils.isArray(topic.array), true)

      assert.strictEqual(Utils.isArray(topic.emptyObject), false)
      assert.strictEqual(Utils.isArray(topic.object), false)

      assert.strictEqual(Utils.isArray(topic.function), false)
    },
    'is function': function (topic) {
      assert.strictEqual(Utils.isFunction(topic.null), false)
      assert.strictEqual(Utils.isFunction(topic.undefined), false)

      assert.strictEqual(Utils.isFunction(topic.positiveInteger), false)
      assert.strictEqual(Utils.isFunction(topic.negativeInteger), false)
      assert.strictEqual(Utils.isFunction(topic.zeroInteger), false)
      assert.strictEqual(Utils.isFunction(topic.float), false)
      assert.strictEqual(Utils.isFunction(topic.nan), false)
      assert.strictEqual(Utils.isFunction(topic.infinity), false)

      assert.strictEqual(Utils.isFunction(topic.zeroString), false)
      assert.strictEqual(Utils.isFunction(topic.emptyString), false)
      assert.strictEqual(Utils.isFunction(topic.string), false)

      assert.strictEqual(Utils.isFunction(topic.booleanTrue), false)
      assert.strictEqual(Utils.isFunction(topic.booleanFalse), false)

      assert.strictEqual(Utils.isFunction(topic.emptyArray), false)
      assert.strictEqual(Utils.isFunction(topic.array), false)

      assert.strictEqual(Utils.isFunction(topic.emptyObject), false)
      assert.strictEqual(Utils.isFunction(topic.object), false)

      assert.strictEqual(Utils.isFunction(topic.function), true)
    },
    'is undefined': function (topic) {
      assert.strictEqual(Utils.isUndefined(topic.null), false)
      assert.strictEqual(Utils.isUndefined(topic.undefined), true)

      assert.strictEqual(Utils.isUndefined(topic.positiveInteger), false)
      assert.strictEqual(Utils.isUndefined(topic.negativeInteger), false)
      assert.strictEqual(Utils.isUndefined(topic.zeroInteger), false)
      assert.strictEqual(Utils.isUndefined(topic.float), false)
      assert.strictEqual(Utils.isUndefined(topic.nan), false)
      assert.strictEqual(Utils.isUndefined(topic.infinity), false)

      assert.strictEqual(Utils.isUndefined(topic.zeroString), false)
      assert.strictEqual(Utils.isUndefined(topic.emptyString), false)
      assert.strictEqual(Utils.isUndefined(topic.string), false)

      assert.strictEqual(Utils.isUndefined(topic.booleanTrue), false)
      assert.strictEqual(Utils.isUndefined(topic.booleanFalse), false)

      assert.strictEqual(Utils.isUndefined(topic.emptyArray), false)
      assert.strictEqual(Utils.isUndefined(topic.array), false)

      assert.strictEqual(Utils.isUndefined(topic.emptyObject), false)
      assert.strictEqual(Utils.isUndefined(topic.object), false)

      assert.strictEqual(Utils.isUndefined(topic.function), false)
    },
    'is null': function (topic) {
      assert.strictEqual(Utils.isNull(topic.null), true)
      assert.strictEqual(Utils.isNull(topic.undefined), false)

      assert.strictEqual(Utils.isNull(topic.positiveInteger), false)
      assert.strictEqual(Utils.isNull(topic.negativeInteger), false)
      assert.strictEqual(Utils.isNull(topic.zeroInteger), false)
      assert.strictEqual(Utils.isNull(topic.float), false)
      assert.strictEqual(Utils.isNull(topic.nan), false)
      assert.strictEqual(Utils.isNull(topic.infinity), false)

      assert.strictEqual(Utils.isNull(topic.zeroString), false)
      assert.strictEqual(Utils.isNull(topic.emptyString), false)
      assert.strictEqual(Utils.isNull(topic.string), false)

      assert.strictEqual(Utils.isNull(topic.booleanTrue), false)
      assert.strictEqual(Utils.isNull(topic.booleanFalse), false)

      assert.strictEqual(Utils.isNull(topic.emptyArray), false)
      assert.strictEqual(Utils.isNull(topic.array), false)

      assert.strictEqual(Utils.isNull(topic.emptyObject), false)
      assert.strictEqual(Utils.isNull(topic.object), false)

      assert.strictEqual(Utils.isNull(topic.function), false)
    },
    'is set': function (topic) {
      assert.strictEqual(Utils.isSet(topic.null), false)
      assert.strictEqual(Utils.isSet(topic.undefined), false)

      assert.strictEqual(Utils.isSet(topic.positiveInteger), true)
      assert.strictEqual(Utils.isSet(topic.negativeInteger), true)
      assert.strictEqual(Utils.isSet(topic.zeroInteger), true)
      assert.strictEqual(Utils.isSet(topic.float), true)
      assert.strictEqual(Utils.isSet(topic.nan), true)
      assert.strictEqual(Utils.isSet(topic.infinity), true)

      assert.strictEqual(Utils.isSet(topic.zeroString), true)
      assert.strictEqual(Utils.isSet(topic.emptyString), true)
      assert.strictEqual(Utils.isSet(topic.string), true)

      assert.strictEqual(Utils.isSet(topic.booleanTrue), true)
      assert.strictEqual(Utils.isSet(topic.booleanFalse), true)

      assert.strictEqual(Utils.isSet(topic.emptyArray), true)
      assert.strictEqual(Utils.isSet(topic.array), true)

      assert.strictEqual(Utils.isSet(topic.emptyObject), true)
      assert.strictEqual(Utils.isSet(topic.object), true)

      assert.strictEqual(Utils.isSet(topic.function), true)
    },
    'is unset': function (topic) {
      assert.strictEqual(Utils.isUnset(topic.null), true)
      assert.strictEqual(Utils.isUnset(topic.undefined), true)

      assert.strictEqual(Utils.isUnset(topic.positiveInteger), false)
      assert.strictEqual(Utils.isUnset(topic.negativeInteger), false)
      assert.strictEqual(Utils.isUnset(topic.zeroInteger), false)
      assert.strictEqual(Utils.isUnset(topic.float), false)
      assert.strictEqual(Utils.isUnset(topic.nan), false)
      assert.strictEqual(Utils.isUnset(topic.infinity), false)

      assert.strictEqual(Utils.isUnset(topic.zeroString), false)
      assert.strictEqual(Utils.isUnset(topic.emptyString), false)
      assert.strictEqual(Utils.isUnset(topic.string), false)

      assert.strictEqual(Utils.isUnset(topic.booleanTrue), false)
      assert.strictEqual(Utils.isUnset(topic.booleanFalse), false)

      assert.strictEqual(Utils.isUnset(topic.emptyArray), false)
      assert.strictEqual(Utils.isUnset(topic.array), false)

      assert.strictEqual(Utils.isUnset(topic.emptyObject), false)
      assert.strictEqual(Utils.isUnset(topic.object), false)

      assert.strictEqual(Utils.isUnset(topic.function), false)
    },
    'is empty': function (topic) {
      assert.strictEqual(Utils.isEmpty(topic.null), true)
      assert.strictEqual(Utils.isEmpty(topic.undefined), true)

      assert.strictEqual(Utils.isEmpty(topic.positiveInteger), false)
      assert.strictEqual(Utils.isEmpty(topic.negativeInteger), false)
      assert.strictEqual(Utils.isEmpty(topic.zeroInteger), true)
      assert.strictEqual(Utils.isEmpty(topic.float), false)
      assert.strictEqual(Utils.isEmpty(topic.nan), false)
      assert.strictEqual(Utils.isEmpty(topic.infinity), false)

      assert.strictEqual(Utils.isEmpty(topic.zeroString), true)
      assert.strictEqual(Utils.isEmpty(topic.emptyString), true)
      assert.strictEqual(Utils.isEmpty(topic.string), false)

      assert.strictEqual(Utils.isEmpty(topic.booleanTrue), false)
      assert.strictEqual(Utils.isEmpty(topic.booleanFalse), true)

      assert.strictEqual(Utils.isEmpty(topic.emptyArray), true)
      assert.strictEqual(Utils.isEmpty(topic.array), false)

      assert.strictEqual(Utils.isEmpty(topic.emptyObject), true)
      assert.strictEqual(Utils.isEmpty(topic.object), false)

      assert.strictEqual(Utils.isEmpty(topic.function), false)
    },
    'is set all of arguments': function (topic) {
      assert.strictEqual(Utils.isSet(topic.zeroInteger, topic.emptyString), true)
      assert.strictEqual(Utils.isSet(topic.zeroInteger, topic.undefined), false)
    },
    'is unset all of arguments': function (topic) {
      assert.strictEqual(Utils.isUnset(topic.zeroInteger, topic.emptyString), false)
      assert.strictEqual(Utils.isUnset(topic.zeroInteger, topic.undefined), false)
      assert.strictEqual(Utils.isUnset(topic.null, topic.undefined), true)
    },
    'is empty all of arguments': function (topic) {
      assert.strictEqual(Utils.isEmpty(topic.zeroInteger, topic.emptyString), true)
      assert.strictEqual(Utils.isEmpty(topic.zeroInteger, topic.undefined), true)
      assert.strictEqual(Utils.isEmpty(topic.null, topic.undefined), true)
      assert.strictEqual(Utils.isEmpty(topic.zeroInteger, topic.string), false)
    }
  }
}).addBatch({
  'Convert each one': {
    'topic': {
      'emptyString': '',
      'zeroString': '0',
      'numberString': '123',
      'alphaString': 'asd',
      'startWithNumberMixString': '123asd',
      'startWithAlphaMixString': 'asd123',

      'negativeInteger': -10,
      'positiveInteger': 10,
      'float': 0.5,

      'function': function () { return arguments }
    },
    'to string': function (topic) {
      assert.strictEqual(Utils.toString(topic.negativeInteger), '-10')
      assert.strictEqual(Utils.toString(topic.positiveInteger), '10')
      assert.strictEqual(Utils.toString(topic.float), '0.5')
    },
    'to float': function (topic) {
      assert.strictEqual(Utils.toFloat(topic.emptyString), 0)
      assert.strictEqual(Utils.toFloat(topic.zeroString), 0)
      assert.strictEqual(Utils.toFloat(topic.numberString), 123)
      assert.strictEqual(Utils.toFloat(topic.alphaString), 0)
      assert.strictEqual(Utils.toFloat(topic.startWithNumberMixString), 123)
      assert.strictEqual(Utils.toFloat(topic.startWithAlphaMixString), 0)
    },
    'arguments to array': function (topic) {
      var arg = [1, 2, 3]
      assert.notEqual(topic.function.apply(null, arg), arg)
      assert.deepEqual(Utils.argToArr(topic.function.apply(null, arg)), arg)
    }
  }
}).addBatch({
  'String operation': {
    'pad': function () {
      assert.strictEqual(Utils.pad(4, 3, '-'), '--4')
    }
  }
}).addBatch({
  'Array operation': {
    'topic': [1, 2, 3],
    'each': function (topic) {
      var newArray = []
      Utils.each(topic, function (item) {
        newArray.push(item)
      })

      assert.deepEqual(topic, newArray)
    },
    'map': function (topic) {
      var newArray = Utils.map(topic, function (item) {
        return item + 2
      })

      assert.deepEqual([3, 4, 5], newArray)
    },
    'inArray': function (topic) {
      assert.isTrue(Utils.inArray(topic, 2))
      assert.isFalse(Utils.inArray(topic, 4))
    },
    'cloneArray': function (topic) {
      var newArray = Utils.cloneArray(topic)
      assert.notEqual(newArray, topic)
      assert.deepEqual(newArray, topic)
    }
  }
}).addBatch({
  'Object operation': {
    'topic': {'a': 1, 'b': 1},
    'extend': function (topic) {
      assert.deepEqual(Utils.extend(topic, {'b': 2}), {'a': 1, 'b': 2})
    },
    'clone': function (topic) {
      var newObject = Utils.clone(topic)
      assert.notEqual(newObject, topic)
      assert.deepEqual(newObject, topic)
    }
  }
}).export(module)
