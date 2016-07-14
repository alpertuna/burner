/**
 * js/core/Utils.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */

'use strict';

define(function(){
    return {
        //Checkers
        'isString': function(value){
            return typeof value == 'string';
        },
        'isBoolean': function(value){
            return typeof value == 'boolean';
        },
        'isNumber': function(value){
            return typeof value == 'number';
        },
        'isObject': function(value){
            return typeof value == 'object';
        },
        'isArray': function(value){
            return value instanceof Array;
        },

        'isFunction': function(value){
            return typeof value == 'function';
        },

        'isUndefined': function(value){
            return typeof value == 'undefined';
        },
        'isNull': function(value){
            return value === null;
        },

        'isSet': function(value){
            if(arguments.length > 1){
                for(var i in arguments)
                    if(!this.isSet(arguments[i])) return false;
                return true;
            }

            return !this.isUndefined(value) && !this.isNull(value);
        },
        'isUnset': function(value){
            if(arguments.length > 1){
                for(var i in arguments)
                    if(!this.isUnset(arguments[i])) return false;
                return true;
            }

            return this.isUndefined(value) || this.isNull(value);
        },
        'isEmpty': function(value){
            if(arguments.length > 1){
                for(var i in arguments)
                    if(!this.isEmpty(arguments[i])) return false;
                return true;
            }

            switch(typeof value){
                case 'string': return value == '' | value == '0';
                case 'boolean': return value == false;
                case 'number': return value == 0;
                case 'undefined': return true;
                case 'object':
                    if(value === null) return true;
                    if(this.isArray(value)) return value.length == 0;
                    return Object.keys(value).length == 0;
                default: return value ? false : true;
            }
        },

        //Converters
        'toString': function(value){
            return value.toString();
        },
        'toFloat': function(value){
            value = Number.parseFloat(value);
            if(isNaN(value)) return 0;
            return value;
        },
        'argToArr': function(args){
            return [].slice.call(args);
        },

        //String Operations
        'pad': function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },

        //Array Operations
        'each': function(arr, callback, reference){
            if(!reference) reference = this;
            for(var i in arr)
                if(callback.call(reference, arr[i], i) === false)
                    break;
        },
        'map': function(arr, callback, reference){
            if(!reference) reference = this;
            var result = [];
            this.each(arr, function(item){
                result.push(callback.call(reference, item));
            });
            return result;
        },
        'inArray': function(arr, item){
            return arr.indexOf(item) != -1;
        },

        //Object Operations
        'extend': function(){
            return Object.assign.apply(null, arguments);
        },
        'clone': function(){
            var args = this.argToArr(arguments);
            args.unshift({});
            return this.extend.apply(null, args);
        },

        //Function Operations
        /*'multiply': function(func){
            return function(param){
                if(arguments.length > 1){
                    var result;
                    for(var i in arguments)
                        result = func.call(this, arguments[i]);
                    return result;
                }
                return func.call(this, param);
            }
        },*/
    }
});
