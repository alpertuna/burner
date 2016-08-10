/*
 * src/core/Utils.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define(function () {
  /**
   * Utilities - helper tool set static class.
   * @class core/Utils
   */
  return /** @lends core/Utils */ {
    // Checkers
    /**
     * Returns if given value is string.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isString': function (value) {
      return typeof value === 'string'
    },
    /**
     * Returns if given value is boolean.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isBoolean': function (value) {
      return typeof value === 'boolean'
    },
    /**
     * Returns if given value is number.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isNumber': function (value) {
      return typeof value === 'number'
    },
    /**
     * Returns if given value is an Object.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isObject': function (value) {
      return typeof value === 'object'
    },
    /**
     * Returns if given value is an Array.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isArray': function (value) {
      return value instanceof Array
    },

    /**
     * Returns if given value is a function.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isFunction': function (value) {
      return typeof value === 'function'
    },

    /**
     * Returns if given value is undefined.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isUndefined': function (value) {
      return typeof value === 'undefined'
    },
    /**
     * Returns if given value is null.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isNull': function (value) {
      return value === null
    },

    /**
     * Returns if given value is set - not null and undefined.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isSet': function (value) {
      if (arguments.length > 1) {
        for (var i in arguments) {
          if (!this.isSet(arguments[i])) return false
        }
        return true
      }

      return !this.isUndefined(value) && !this.isNull(value)
    },
    /**
     * Returns if given value is unset - null or undefined.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isUnset': function (value) {
      if (arguments.length > 1) {
        for (var i in arguments) {
          if (!this.isUnset(arguments[i])) return false
        }
        return true
      }

      return this.isUndefined(value) || this.isNull(value)
    },
    /**
     * Returns if given value is empty. Empty values are; empty string, zero number, false, undefined, zero length arrays/objects.
     * @param {*} value - Value to check.
     * @return {boolean} Result.
     */
    'isEmpty': function (value) {
      if (arguments.length > 1) {
        for (var i in arguments) {
          if (!this.isEmpty(arguments[i])) return false
        }
        return true
      }

      switch (typeof value) {
        case 'string': return value === '' | value === '0'
        case 'boolean': return value === false
        case 'number': return value === 0
        case 'undefined': return true
        case 'object':
          if (value === null) return true
          if (this.isArray(value)) return value.length === 0
          return Object.keys(value).length === 0
        default: return value // as boolean
      }
    },

    // Converters
    /**
     * Converts given any value to string.
     * @param {*} value - Value to convert.
     * @return {string} Result.
     */
    'toString': function (value) {
      return value.toString()
    },
    /**
     * Converts given any value to number.
     * @param {*} value - Value to convert.
     * @return {number} Result.
     */
    'toFloat': function (value) {
      value = Number.parseFloat(value)
      if (isNaN(value)) return 0
      return value
    },
    /**
     * Converts given argument list to array.
     * @param {Arguments} value - Value to convert.
     * @return {Array} Result.
     */
    'argToArr': function (args) {
      return [].slice.call(args)
    },

    // String Operations
    /**
     * Adds pads to given string.
     * @param {string} n - String to pad.
     * @param {number} width - Pad width.
     * @param {string} z - Padding character.
     * @return {string} Padded string.
     */
    'pad': function (n, width, z) {
      z = z || '0'
      n = n + ''
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    },

    // Array Operations
    /**
     * Calls callback for each item of given array.
     * @param {Array} arr - Item list.
     * @param {function} callback - Callback function.
     * @param {Object} reference - Reference to pass into callback.
     */
    'each': function (arr, callback, reference) {
      if (!reference) reference = this
      for (var i in arr) {
        if (callback.call(reference, arr[i], i) === false) {
          break
        }
      }
    },
    /**
     * Creates new array using given array with calls callback for each item.
     * @param {Array} arr - Item list.
     * @param {function} callback - Callback function.
     * @param {Object} reference - Reference to pass into callback.
     * @return {Array} Result array.
     */
    'map': function (arr, callback, reference) {
      if (!reference) reference = this
      var result = []
      this.each(arr, function (item) {
        result.push(callback.call(reference, item))
      })
      return result
    },
    /**
     * Returns if array has search item.
     * @param {Array} arr - Item list.
     * @param {*} item - Search item.
     * @return {boolean} If array has search item.
     */
    'inArray': function (arr, item) {
      return arr.indexOf(item) !== -1
    },
    /**
     * Clones an array and returns new reference.
     * @param {Array} arr - Array to clone.
     * @return {Array} New cloned array.
     */
    'cloneArray': function (arr) {
      return arr.slice()
    },

    // Object Operations
    /**
     * Extends object given at first parameter with objects at other parameters.
     * @param {...Object} objects - Object list.
     * @return {Object} Extended first object at arguments.
     */
    'extend': function () {
      return Object.assign.apply(null, arguments)
    },
    /**
     * Creates new object and extends with all objects given as arguments.
     * @param {...Object} objects - Object list.
     * @return {Object} Extended new object.
     */
    'clone': function () {
      var args = this.argToArr(arguments)
      args.unshift({})
      return this.extend.apply(null, args)
    }

    // Function Operations
    /* 'multiply': function (func) {
      return function (param) {
        if (arguments.length > 1) {
          var result
          for (var i in arguments)
            result = func.call(this, arguments[i])
          return result
        }
        return func.call(this, param)
      }
    },*/
  }
})

