/**
 * JS Burner
 * Copyright (c) 2016 H.Alper Tuna <halpertuna@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

;
define("license", function(){});

/*
 * src/core/Utils.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/core/Utils',[],function(){
    /**
     * Utilities - helper tool set static class.
     * @class core/Utils
     */
    return /** @lends core/Utils */ {
        //Checkers
        /**
         * Returns if given value is string.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isString': function(value){
            return typeof value == 'string';
        },
        /**
         * Returns if given value is boolean.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isBoolean': function(value){
            return typeof value == 'boolean';
        },
        /**
         * Returns if given value is number.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isNumber': function(value){
            return typeof value == 'number';
        },
        /**
         * Returns if given value is an Object.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isObject': function(value){
            return typeof value == 'object';
        },
        /**
         * Returns if given value is an Array.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isArray': function(value){
            return value instanceof Array;
        },

        /**
         * Returns if given value is a function.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isFunction': function(value){
            return typeof value == 'function';
        },

        /**
         * Returns if given value is undefined.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isUndefined': function(value){
            return typeof value == 'undefined';
        },
        /**
         * Returns if given value is null.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isNull': function(value){
            return value === null;
        },

        /**
         * Returns if given value is set - not null and undefined.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isSet': function(value){
            if(arguments.length > 1){
                for(var i in arguments)
                    if(!this.isSet(arguments[i])) return false;
                return true;
            }

            return !this.isUndefined(value) && !this.isNull(value);
        },
        /**
         * Returns if given value is unset - null or undefined.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
        'isUnset': function(value){
            if(arguments.length > 1){
                for(var i in arguments)
                    if(!this.isUnset(arguments[i])) return false;
                return true;
            }

            return this.isUndefined(value) || this.isNull(value);
        },
        /**
         * Returns if given value is empty. Empty values are; empty string, zero number, false, undefined, zero length arrays/objects.
         * @param {*} value - Value to check.
         * @return {boolean} Result.
         */
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
        /**
         * Converts given any value to string.
         * @param {*} value - Value to convert.
         * @return {string} Result.
         */
        'toString': function(value){
            return value.toString();
        },
        /**
         * Converts given any value to number.
         * @param {*} value - Value to convert.
         * @return {number} Result.
         */
        'toFloat': function(value){
            value = Number.parseFloat(value);
            if(isNaN(value)) return 0;
            return value;
        },
        /**
         * Converts given argument list to array.
         * @param {Arguments} value - Value to convert.
         * @return {Array} Result.
         */
        'argToArr': function(args){
            return [].slice.call(args);
        },

        //String Operations
        /**
         * Adds pads to given string.
         * @param {string} n - String to pad.
         * @param {number} width - Pad width.
         * @param {string} z - Padding character.
         * @return {string} Padded string.
         */
        'pad': function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },

        //Array Operations
        /**
         * Calls callback for each item of given array.
         * @param {Array} arr - Item list.
         * @param {function} callback - Callback function.
         * @param {Object} reference - Reference to pass into callback.
         */
        'each': function(arr, callback, reference){
            if(!reference) reference = this;
            for(var i in arr)
                if(callback.call(reference, arr[i], i) === false)
                    break;
        },
        /**
         * Creates new array using given array with calls callback for each item.
         * @param {Array} arr - Item list.
         * @param {function} callback - Callback function.
         * @param {Object} reference - Reference to pass into callback.
         * @return {Array} Result array.
         */
        'map': function(arr, callback, reference){
            if(!reference) reference = this;
            var result = [];
            this.each(arr, function(item){
                result.push(callback.call(reference, item));
            });
            return result;
        },
        /**
         * Returns if array has search item.
         * @param {Array} arr - Item list.
         * @param {*} item - Search item.
         * @return {boolean} If array has search item.
         */
        'inArray': function(arr, item){
            return arr.indexOf(item) != -1;
        },
        /**
         * Clones an array and returns new reference.
         * @param {Array} arr - Array to clone.
         * @return {Array} New cloned array.
         */
        'cloneArray': function(arr){
            return arr.slice();
        },

        //Object Operations
        /**
         * Extends object given at first parameter with objects at other parameters.
         * @param {...Object} objects - Object list.
         * @return {Object} Extended first object at arguments.
         */
        'extend': function(){
            return Object.assign.apply(null, arguments);
        },
        /**
         * Creates new object and extends with all objects given as arguments.
         * @param {...Object} objects - Object list.
         * @return {Object} Extended new object.
         */
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

/**
 * src/core/createClass.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 16.04.2016
 */



define('burner/core/createClass',['./Utils'], function(Utils){
    /* ===============================
     * CLASS CREATION HELPER FUNCTIONS
     * =============================== */
    var lastId = 0;
    function generateId(){
        return lastId++;
    }
    function createCore(){
        return {
            '_id': generateId(),
            'new': nev,
            'extend': extend,
            'implement': implement
        }
    }
    function splitProto(object){
        var properties = {}
        var methods = {}

        if(object.init) object._init = object.init;
        delete object.init;

        for(var i in object){
            if(Utils.isFunction(object[i])){
                methods[i] = object[i];
                continue;
            }
            if(Utils.isObject(object[i]))
               //TODO Error
               throw 'Class initial properties cannot be an object or null. You should define them inside constructor (init) function.';
            properties[i] = object[i];
        }
        return {
            '_properties': properties,
            '_methods': methods
        }
    }
    function findMethod(method, Class){ //For implementation
        if(Utils.isSet(Class._methods[method]) && Utils.isFunction(Class._methods[method]))
            return true;

        if(!Class._super) return false;

        return findMethod(method, Class._super);
    }

    /* ==================
     * INSTANCE FUNCTIONS
     * ================== */
    function isInstanceOf(Class){
        if(!Utils.isSet(Class._id)) throw 'Parameter has to be a Class';

        if(this._classId == Class._id) return true;
        if(!Utils.isSet(this.super)) return false;
        return isInstanceOf.call(this.super, Class);
    }
    function isImplementedBy(Interface){
        if(!Utils.isArray(Interface)) throw 'Parameter has to be an Interface';

        var implemented = false;
        Utils.each(this._implements, function(implement){
            if(implement === Interface){
                implemented = true;
                return false;
            }
        }, this);
        if(implemented) return true;
        if(!Utils.isSet(this.super)) return false;
        return isImplementedBy.call(this.super, Interface);
    }
    function get(name){
        return this._properties[name];
    }
    function set(name, value){
        this._properties[name] = value;
        return this.ref;
    }
    function unset(name){
        delete this._properties[name];
        return this.ref;
    }
    function inc(name, value){
        if(!Utils.isSet(value))
            value = 1;
        this._properties[name] += value;
        return this.ref;
    }

    /* ==================================
     * INSTANCE CREATION HELPER FUNCTIONS
     * ================================== */
    function createInstance(Class, childInstances, base){
        var instance;
        if(!base){
            base = instance = {}
            instance._properties = Utils.clone(Class._properties);
        }else instance = function(){this.super._init.apply(this.super, arguments)}

        Utils.extend(
            instance,
            /** @lends core/createClass# */
            {
                '_classId': Class._id,
                '_implements': Class._implements,
                /**
                 * To check is this an instance of given class or a class extends given class.
                 * @function
                 * @param {Class} Class - Class
                 * @return {boolean} If it is instance of given class.
                 */
                'isInstanceOf': isInstanceOf,
                /**
                 * To check is this an instance implemented by given interface.
                 * @function
                 * @param {Interface} Interface - Interface
                 * @return {boolean} If it is implemented by given interface.
                 */
                'isImplementedBy': isImplementedBy,
                /**
                 * Returns value of a property.
                 * @function
                 * @param {string} name - Property name.
                 * @return {*} Value of property.
                 */
                'get': get.bind(base),
                /**
                 * Sets a value to a property.
                 * @function
                 * @param {string} name - Property name.
                 * @param {*} value - Property value.
                 * @return {Object} Instance reference.
                 */
                'set': set.bind(base),
                /**
                 * Unsets / deletes a property.
                 * @function
                 * @param {string} name - Property name.
                 * @return {Object} Instance reference.
                 */
                'unset': unset.bind(base),
                /**
                 * Increments given number property as given value.
                 * @function
                 * @param {string} name - Property name.
                 * @param {number} value - Value to increment.
                 * @return {Object} Instance reference.
                 */
                'inc': inc.bind(base),
                /**
                 * Instance reference.
                 * @type {Object}
                 */
                'ref': base
            }
        );

        for(var i in Class._methods)
            instance[i] = Class._methods[i].bind(instance);

        if(childInstances.length > 0){
            for(var j in Class._methods){
                for(var i in childInstances){
                    if(childInstances[i][j]) break;
                    childInstances[i][j] = Class._methods[j].bind(instance);
                }
            }
        }

        if(Class._super){
            childInstances.unshift(instance);
            instance.super = createInstance(Class._super, childInstances, base);
        }

        return instance;
    }

    /* ===============
     * CLASS FUNCTIONS
     * =============== */
    function nev(){
        var instance = createInstance(this, []);
        instance._init.apply(instance, arguments);
        return instance;
    }
    function extend(proto){
        var Extension = splitProto(proto);
        return Utils.extend(
            createCore(),
            {
                '_methods': Extension._methods,
                '_properties': Utils.clone(this._properties, Extension._properties),
                '_super': this,
                '_implements': []
            }
        )
    }
    function implement(){
        Utils.each(arguments, function(methods){
            this._implements.push(methods);

            for(var i in methods){
                var method = methods[i];
                if(!findMethod(method, this))
                    //TODO Error
                    console.error('"' + method + '" method is not defined according to implemented interface.');
                    //throw '"' + method + '" method is not defined according to implemented interface.';
            }
        }, this);

        return this;
    }

    /* =====
     * ENTRY
     * ===== */
    /**
     * Class Factory - Creates new class with core methods.
     * @class core/createClass
     */
    return function(proto){
        if(!proto.init) proto._init = function(){}
        return Utils.extend(
            createCore(),
            splitProto(proto)
        )
    }
});

/*
 * src/core/EventHandler.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 07.08.2016
 */

define('burner/core/EventHandler',['./createClass'], function(createClass){
    /**
     * EventHandler class.
     * @class core/EventHandler
     * @augments core/createClass
     */
    return createClass(/** @lends core/EventHandler# */{
        /*
         * Event Handling
         *===========================================================*/
        /**
         * Make action ready to use with .on() method.
         * @param {string} action - Action name.
         * @return {Object} Instance reference.
         */
        'handle': function(action){
            var events = this.get('events');
            if(!events){
                events = {};
                this.set('events', events);
            }
            events[action] = [];
            return this.ref;
        },
        /**
         * Adds event listener to handled action.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return {Object} Instance reference.
         */
        'on': function(action, func){
            var events = this.get('events');
            if(!events || !events[action])
                //TODO Error
                throw [
                    'NO_ACTION',
                    'There is no "' + action + '" action to handle.'
                ];

            events[action].push(func);
            return this.ref;
        },
        /**
         * Removes event listener from handled action.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return {Object} Instance reference.
         */
        'off': function(action, func){
            var events = this.get('events');
            //If there is no func, clear action
            if(!func){
                events[action] = [];
                return this.ref;
            }

            if(!events || !events[action])
                //TODO Error
                throw [
                    'NO_ACTION',
                    'There is no "' + action + '" action to handle.'
                ];

            var index = events[action].indexOf(func);
            if(index != -1) events[action].splice(index, 1);
            return this.ref;
        },
        /**
         * Triggers event listener of handled action.
         * @param {string} action - Action name.
         * @param {Object} event - Event object.
         * @return {Object} Instance reference.
         */
        'emit': function(action, event){
            var events = this.get('events');
            if(!events || !events[action])
                //TODO Error
                throw [
                    'NO_ACTION',
                    'There is no "' + action + '" action to handle.'
                ];

            for(var i in events[action])
                events[action][i].call(this.ref, event);

            return this.ref;
        }
    })
})
;
/*
 * src/core/Ajax.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/core/Ajax',[
    './Utils', './EventHandler'
], function(
    Utils, EventHandler
){
    function readyStateChange(){
        var xhttp = this.get('xhttp');
        if(xhttp.readyState == 4){
            //"always" closes connection and "success" may open new connection, so to prevent excessing maxConnection, always is at top of other triggers
            this.emit('always', xhttp.responseText);

            var fail = false;
            if(xhttp.status == 200){
                if(this.get('events').success.length){
                    var json;
                    try{
                        json = JSON.parse(xhttp.responseText);
                    }catch(e){
                        fail = true;
                    }
                    if(!fail)
                        this.emit('success', json);
                }
            }else fail = true;

            if(fail)
                this.emit('fail', xhttp.responseText);
        }
    }

    function parse(key, value, result){
        if(Utils.isArray(value)){
            key += '[]';
            for(var i in value)
                parse(key, value[i], result);
        }else if(Utils.isObject(value)){
            for(var i in value)
                parse(key + '[' + i + ']', value[i], result);
        }else
            result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }

    function toParam(object){
        var result = [];

        for(var key in object){
            var value = object[key];
            parse(key, value, result)
        }

        return result.join('&');
    }

    return EventHandler.extend(/** @lends core/Ajax# */{
        'connectionIsOpen': false,

        /**
         * Ajax component class.
         * @constructs
         * @param {string} url - Url address.
         * @augments ui/EventHandler
         */
        'init': function(url){
            /**
             * On send event.
             * @event core/Ajax.core/Ajax:send
             */
            /**
             * On respond is successful event.
             * @event core/Ajax.core/Ajax:success
             * @param {Object} Responded json object
             */
            /**
             * On respond is fail event.
             * @event core/Ajax.core/Ajax:fail
             * @param {string} Responded non-parsed text.
             */
            /**
             * On respond is got event.
             * @event core/Ajax.core/Ajax:always
             * @param {string} Responded non-parsed text.
             */
            /**
             * On reached maximum connection event.
             * @event core/Ajax.core/Ajax:maxConnection
             */
            this.handle('send');
            this.handle('success');
            this.handle('fail');
            this.handle('always');
            this.handle('maxConnection');

            this.on('send', this.set.bind(this, 'connectionIsOpen', true));
            this.on('always', this.set.bind(this, 'connectionIsOpen', false));

            //TODO debug tool
            this.on('fail', function(c){
                console.warn('Response for ajax has fail: "' + c + '"');
            });
            //TODO debug tool
            this.on('maxConnection', function(c){
                console.warn('Reached max connection.');
            });

            var xhttp;
            if(window.XMLHttpRequest)
                xhttp = new XMLHttpRequest();
            else
                //For IE6, IE5
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            this.set('xhttp', xhttp);
            if(url)
                this.setUrl(url);
        },
        'method': 'POST',

        /**
         * Sets request method.
         * @param {string} method - Method name.
         * @return {Object} Instance reference.
         */
        'setMethod': function(method){
            this.set('method', method);
            return this.ref;
        },
        /**
         * Sets url address.
         * @param {string} method - Url address.
         * @return {Object} Instance reference.
         */
        'setUrl': function(url){
            this.set('url', url);
            return this.ref;
        },
        /**
         * Sends ajax request.
         * @param {Object} [object] - Request data.
         * @return {Object} Instance reference.
         * @fires core/Ajax.core/Ajax:maxConnection
         * @fires core/AjaxGroup.core/AjaxGroup:maxConnection
         * @fires core/AjaxGroup.core/AjaxGroup:openedConnection
         * @fires core/Ajax.core/Ajax:send
         */
        'send': function(object){
            if(this.get('connectionIsOpen')){
                console.warn('Last connection hasn\'t closed yet.');

                return this.ref;
            }

            var ajaxGroup = this.get('ajaxGroup');
            if(ajaxGroup){
                if(!ajaxGroup.hasRoom()){
                    this.emit('maxConnection');
                    ajaxGroup.emit('maxConnection');
                    return this.ref;
                }
                ajaxGroup.emit('openedConnection');
            }

            var xhttp = this.get('xhttp');
            var params = toParam(object);
            var method = this.get('method');
            var url = this.get('url');
            if(method == 'GET') url += '?' + params;
            xhttp.open(method, url, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.onreadystatechange = readyStateChange.bind(this);
            if(!object || method == 'GET') xhttp.send();
            else xhttp.send(params);

            this.emit('send');

            return this.ref;
        },

        'bound': false,
        /**
         * Binds to an AjaxGroup to work with other Ajaxs.
         * @param {core/AjaxGroup} ajaxGroup - Ajax group to bind.
         * @return {Object} Instance reference.
         */
        'bind': function(ajaxGroup){
            if(this.get('bound')){
                //TODO error
                throw 'This ajax instance is already bound a group.';
                return this.ref;
            }

            this.set('bound', true);
            this.set('ajaxGroup', ajaxGroup);
            this.on('always', ajaxGroup.emit.bind(ajaxGroup, 'closedConnection'));
            return this.ref;
        }
    })
})
;
/*
 * src/core/AjaxGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/core/AjaxGroup',['./EventHandler'], function(EventHandler){
    function onOpenedConnection(){
        if(this.get('connections') == 0)
            this.emit('openedFirstConnection');
        this.inc('connections');
        this.emit('change');
    }
    function onClosedConnection(){
        this.inc('connections', -1);
        if(this.get('connections') == 0)
            this.emit('closedLastConnection');
        this.emit('change');
    }

    return EventHandler.extend(/** @lends core/AjaxGroup# */{
        'connections': 0,
        'maxConnection': 0,

        /**
         * AjaxGroup component class.
         * @constructs
         * @augments ui/EventHandler
         */
        'init': function(){
            /**
             * On any connection is closed or opened event.
             * @event core/AjaxGroup.core/AjaxGroup:change
             */
            /**
             * On any connection is opened event.
             * @event core/AjaxGroup.core/AjaxGroup:openedConnection
             */
            /**
             * On any connection is closed event.
             * @event core/AjaxGroup.core/AjaxGroup:closedConnection
             */
            /**
             * On opened first active connection event.
             * @event core/AjaxGroup.core/AjaxGroup:openedFirstConnection
             */
            /**
             * On closed last active connection event.
             * @event core/AjaxGroup.core/AjaxGroup:closedLastConnection
             */
            /**
             * On reached maximum connection event.
             * @event core/AjaxGroup.core/AjaxGroup:maxConnection
             */
            this.handle('change');
            this.handle('openedConnection');
            this.handle('closedConnection');
            this.handle('openedFirstConnection');
            this.handle('closedLastConnection');
            this.handle('maxConnection');
            this.on('openedConnection', onOpenedConnection.bind(this));
            this.on('closedConnection', onClosedConnection.bind(this));
        },

        /**
         * Sets maximum connection waits respond at the same time.
         * @param {number} value - Connection number.
         * @return {Object} Instance reference.
         */
        'setMaxConnection': function(value){
            this.set('maxConnection', value);
            return this.ref;
        },

        /**
         * Returns if there is room for new connection.
         * @return {boolean} If there is room for new connection.
         */
        'hasRoom': function(){
            var maxConnection = this.get('maxConnection');
            if(maxConnection == 0) return true;
            return this.countConnections() < maxConnection;
        },
        /**
         * Returns number of active connections.
         * @return {number} Number of active connections.
         */
        'countConnections': function(){
            return this.get('connections');
        }
    })
})
;
/*
 * src/ui/TextElement.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



//To avoid loop and unnecessary ElementCore class, this is Element likely class
define('burner/ui/TextElement',['../core/createClass'], function(createClass){
    return createClass(/** @lends ui/TextElement# */{
        /**
         * TextElement component class.
         * @constructs
         * @augments core/createClass
         * @param {string} text - Content text.
         */
        'init': function(text){
            /*this.set('dom', document.createElement('span'));
            this.get('dom').innerHTML = text;*/
           if(text == '&nbsp;') text = '\u00A0';
            this.set('dom', document.createTextNode(text));
        },
        /**
         * Returns dom object.
         * @return {dom} Element dom object.
         */
        'getDom': function(){
            return this.get('dom');
        }
    })
})
;
/*
 * src/ui/Element.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 07.08.2016
 */



define('burner/ui/Element',['../core/EventHandler', '../core/Utils', './TextElement'], function(EventHandler, Utils, TextElement){

    return EventHandler.extend(/** @lends ui/Element# */{
        /**
         * Element component class.
         * @constructs
         * @augments core/EventHandler
         * @param {string} [tag=div] - Html dom tag name.
         */
        'init': function(tag){
            /**
             * Show event.
             * @event ui/Element.ui/Element:show
             */
            /**
             * Hide event.
             * @event ui/Element.ui/Element:hide
             */
            if(!tag) tag = 'div';

            this.set('dom', Utils.isString(tag) ? document.createElement(tag) : tag);
            this.set('children', []);
            this.handle('show');
            this.handle('hide');
            this.on('show', this.removeClass.bind(this, 'jb-hidden'));
            this.on('hide', this.addClass.bind(this, 'jb-hidden'));
        },


        /*
         * Attribute Managing
         *===========================================================*/
        /**
         * Returns attribute value.
         * @param {string} attr - Attribute name.
         * @return {string} Attribute value.
         */
        'getAttr': function(attr){
            return this.getDom().getAttribute(attr);
        },
        /**
         * Sets attribute.
         * @param {string} attr - Attribute name.
         * @param {string} value - Attribute value.
         * @return {Object} Instance reference.
         */
        'setAttr':  function(attr, value){
            if(Utils.isBoolean(value)){
                if(!value){
                    this.removeAttr(attr);
                    return this.ref;
                }
                value = attr;
            }

            this.getDom().setAttribute(attr, value);
            return this.ref;
        },
        /**
         * Removes attribute.
         * @param {string} attr - Attribute name.
         * @return {Object} Instance reference.
         */
        'removeAttr': function(attr){
            this.getDom().removeAttribute(attr);
            return this.ref;
        },
        /**
         * Returns style value.
         * @param {string} key - Style name.
         * @return {string} Style value.
         */
        'getStyle': function(key){
            var styles = this.getAttr('style');
            if(styles == null) return;

            styles = styles.split(';');
            for(var i in styles){
                if(styles[i] == '') continue;
                var style = styles[i].split(':');
                if(style[0] == key) return style[1];
            }
        },
        /**
         * Sets styles.
         * @param {string|Array} key - Style key or key-value array.
         * @param {string} [value] - Style value. If first parameter is array, no need to pass arguments to value.
         * @return {Object} Instance reference.
         */
        'setStyle': function(key, value){
            var newStyles;
            if(Utils.isSet(value)){
                newStyles = {}
                newStyles[key] = value;
            }else if(Utils.isObject(key))
                newStyles = key;

            var oldStyles = this.getAttr('style');
            var styles = {}
            if(oldStyles != null){
                oldStyles = oldStyles.split(';');
                for(var i in oldStyles){
                    if(oldStyles[i] == '') continue;
                    var style = oldStyles[i].split(':');
                    styles[style[0]] = style[1];
                }
            }

            Utils.extend(styles, newStyles);

            var stylesAttr = '';
            for(var i in styles){
                if(Utils.isNumber(styles[i])) styles[i] += 'px';
                stylesAttr += i + ':' + styles[i] + ';';
            }

            this.setAttr('style', stylesAttr);

            return this.ref;
        },
        /**
         * Removes style.
         * @param {string} key - Style name.
         * @return {Object} Instance reference.
         */
        'removeStyle': function(key){
            var oldStyles = this.getAttr('style');
            var styles = {}
            if(oldStyles != null){
                oldStyles = oldStyles.split(';');
                for(var i in oldStyles){
                    if(oldStyles[i] == '') continue;
                    var style = oldStyles[i].split(':');
                    if(style[0] == key) continue;
                    styles[style[0]] = style[1];
                }
            }

            var stylesAttr = '';
            for(var i in styles){
                if(Utils.isNumber(styles[i])) styles[i] += 'px';
                stylesAttr += i + ':' + styles[i] + ';';
            }

            this.setAttr('style', stylesAttr);

            return this.ref;
        },

        /**
         * Adds css classes.
         * @param {string} newClasses - Css class name or list separated with space.
         * @return {Object} Instance reference.
         */
        'addClass': function(newClasses){
            var classList = this.getDom().classList;
            newClasses = newClasses.split(' ');
            for(var i in newClasses)
                classList.add(newClasses[i]);

            return this.ref;
        },
        /**
         * Removes css classes.
         * @param {string} oldClasses - Css class name or list separated with space.
         * @return {Object} Instance reference.
         */
        'removeClass': function(oldClasses){
            var classList = this.getDom().classList;
            if(classList.length == 0)
                return this.ref;

            oldClasses = oldClasses.split(' ');
            for(var i in oldClasses)
                classList.remove(oldClasses[i]);

            return this.ref;
        },
        /**
         * Returns if element has given css class.
         * @param {string} className - Single css class name.
         * @return {boolean} If element has given class.
         */
        'hasClass': function(className){
            return this.getDom().classList.contains(className);
        },
        /**
         * Toggles css class.
         * @param {string} className - Single css class name.
         * @return {Object} Instance reference.
         */
        'toggleClass': function(className){
            return this.setClass(className, !this.hasClass(className));
        },
        /**
         * Adds or removes classname according to second parameter.
         * @param {string} className - Css class name.
         * @param {boolean} value - If true, css class will be added, otherwise removed.
         * @return {Object} Instance reference.
         */
        'setClass': function(className, value){
            if(value)
                return this.addClass(className);
            return this.removeClass(className);
        },

        /*
         * Content Managing
         *===========================================================*/
        /**
         * Clears content of element.
         * @return {Object} Instance reference.
         */
        'clear': function(){
            this.getDom().innerHTML = '';
            return this.ref;
        },
        /**
         * Adds given element as a child to a specified position.
         * @param {ui/Element} element - Child element.
         * @param {number} index - Position index.
         * @return {Object} Instance reference.
         */
        'addAt': function(element, index){
            var children = this.get('children');

            if(Utils.isUnset(element)) return;
            if(Utils.isNumber(element)) element = Utils.toString(element);
            if(!Utils.isString(element) && !element.getDom)
                //TODO Error
                throw 'Child has to be an Element, string or number. (' + element + ')';

            if(Utils.isString(element))
                element = TextElement.new(element);

            var thisDom = this.getDom();
            var elementDom = element.getDom();
            if(Utils.isUnset(index) || index == children.length){
                thisDom.appendChild(elementDom);
                children.push(element);
            }else{
                thisDom.insertBefore(elementDom, children[index].getDom());
                children.splice(index, 0, element);
            }

            element.set('parent', this.ref);

            return this.ref;
        },
        /**
         * Adds given element as a child.
         * @param {...ui/Element} element - Child element.
         * @return {Object} Instance reference.
         */
        'add': function(){
            Utils.each(arguments, function(element){
                this.addAt(element);
            }, this);
            return this.ref;
        },

        /**
         * Adds given element as a child to the begginin of content.
         * @param {...ui/Element} element - Child element.
         * @return {Object} Instance reference.
         */
        'prepend': function(){
            Utils.each(arguments, function(element, i){
                this.addAt(element, i);
            }, this);
            return this.ref;
        },
        /**
         * Adds given element as a child to near target element. This is core method of addAfter and addBefore.
         * @param {ui/Element} element - Child element.
         * @param {ui/Element} targetElement - Target element to put child near it.
         * @param {boolean} nextToIt - Direction of child to put it to after or before target element.
         * @return {Object} Instance reference.
         *
         * @see #addAfter
         * @see #addBefore
         */
        'addNear': function(element, targetElement, nextToIt){
            if(targetElement.getParent() != this){
                //TODO error
                throw 'Target element\'s parent and parent which will be added into must be the same element';
                return;
            }

            var index = this.getChildren().indexOf(targetElement);
            if(nextToIt) index++;

            return this.addAt(element, index);
        },
        /**
         * Adds given element as a child after target element.
         * @param {ui/Element} element - Child element.
         * @param {ui/Element} targetElement - Target element to put child near it.
         * @return {Object} Instance reference.
         */
        'addAfter': function(element, targetElement){
            return this.addNear(element, targetElement, true);
        },
        /**
         * Adds given element as a child before target element.
         * @param {ui/Element} element - Child element.
         * @param {ui/Element} targetElement - Target element to put child near it.
         * @return {Object} Instance reference.
         */
        'addBefore': function(element, targetElement){
            return this.addNear(element, targetElement);
        },
        /**
         * Remove child. If parameter is given, given child removes from itself, otherwise instance is removed from parent.
         * @param {string} [element] - Child element.
         * @return {Object} Instance reference.
         */
        'remove': function(element){
            //Remove element
            if(element){
                this.getDom().removeChild(element.getDom());

                element.unset('parent');
                var children = this.get('children');
                children.splice(children.indexOf(element) - 1, 1);
                return this.ref;
            }

            //Remove this from parent
            var parent = this.get('parent');
            if(parent) parent.remove(this);

            return this.ref;
        },

        /**
         * Returns parent.
         * @return {ui/Element} Parent element.
         */
        'getParent': function(){
            return this.get('parent');
        },
        /**
         * Returns children.
         * @return {ui/Element[]} Child elements.
         */
        'getChildren': function(){
            return this.get('children');
        },
        /**
         * Returns child at specified position.
         * @param {number} index - Position of child.
         * @return {ui/Element} Child element.
         */
        'getChildAt': function(index){
            return this.getChildren()[index];
        },

        /*
         * Event Handling
         *===========================================================*/
        /**
         * Adds event listener to native dom element.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return {Object} Instance reference.
         */
        'onDom': function(action, func){
            this.getDom().addEventListener(action, func);
            return this.ref;
        },
        /**
         * Removes event listener from native dom element.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return {Object} Instance reference.
         */
        'offDom': function(action, func){
            this.getDom().removeEventListener(action, func);
            return this.ref;
        },
        /**
         * Triggers event listener of native dom element.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return {Object} Instance reference.
         */
        'emitDom': function(action){
            this.getDom().dispatchEvent(new Event(action));
            return this.ref;
        },

        /*
         * Ready-to-use handled events
         *===========================================================*/
        /**
         * Hides element.
         * @return {Object} Instance reference.
         * @fires ui/Element.ui/Element.hide
         */
        'hide': function(){
            if(this.hasClass('jb-hidden'))
                return this.ref;

            return this.emit('hide');
        },
        /**
         * Shows element.
         * @return {Object} Instance reference.
         * @fires ui/Element.ui/Element.show
         */
        'show': function(){
            if(!this.hasClass('jb-hidden'))
                return this.ref;

            return this.emit('show');
        },
        /**
         * Returns element visibility status.
         * @return {boolean} Visibility status.
         */
        'isShown': function(){
            return !this.hasClass('jb-hidden');
        },

        /*'animate': function(property, value, unit, duration){
            var clock = this.get('animationClock');
            if(Utils.isSet(clock)) clearInterval(clock);

            if(!unit) unit = 'px';
            if(!duration) duration = 200;
            var FRAME_RATE = 50;
            var frameNumber = Math.round(FRAME_RATE/1000*duration);
            var frameDuration = Math.round(1000/FRAME_RATE);
            var currentFrame = 0;

            [>var rect = this.getDom().getBoundingClientRect();
              var diff = value - rect[property];<]
            var from = Utils.toFloat(this.style(property));
            var diff = value - from;
            var clock = setInterval((function(){
                currentFrame++;
                var rate = currentFrame / frameNumber;
                this.style(property, (from - diff * rate * (rate - 2)) + unit);
                if(currentFrame == frameNumber){
                    clearInterval(clock);
                    this.set('animationClock', null);
                }
            }).bind(this), frameDuration);
            this.set('animationClock', clock);

            return this.ref;
        },*/

        /*
         * Dom returner
         *===========================================================*/
        /**
         * Returns dom object.
         * @return {dom} Element dom object.
         */
        'getDom': function(){
            return this.get('dom');
        }
    });
});

/*
 * src/ui/interfaces/iComponent.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/interfaces/iComponent',[],function(){
    /**
     * Implements visiual component methods.
     * @interface iComponent
     */
    return [
        /**
         * Focuses on button.
         * @function
         * @name iComponent#focus
         * @return {Object} Instance reference.
         */
        'focus',
        /**
         * Sets disabled status.
         * @function
         * @name iComponent#setDisabled
         * @param {boolean} value - Disabled status.
         * @return {Object} Instance reference.
         */
        'setDisabled',
        /**
         * Sets color theme.
         * @function
         * @name iComponent#setTheme
         * @param {string} theme - Theme name.
         * @return {Object} Instance reference.
         */
        'setTheme'
    ]
})
;
/*
 * src/ui/Group.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Group',[
    '../core/Utils',
    './Element',
    './interfaces/iComponent'
], function(Utils, Element, iComponent){
    return Element.extend(/** @lends ui/Group# */{
        /**
         * Group component class.
         * @constructs
         * @augments ui/Element
         * @param {string} mod - Mod name to present children.
         * @implements iComponent
         */
        'init': function(mod){
            this.super();

            var className;
            switch(mod){
                /*case 'VERTICAL':
                    className = 'jb-vertical-group';
                    break;*/
                case 'SPACED':
                    className = 'jb-spaced-group';
                    break;
                case 'BLOCK':
                    className = 'jb-group jb-group-block';
                    break;
                default:
                    className = 'jb-group';
                    break;
            }
            this.addClass(className);
        },

        //Inherited from iInput interface
        'setDisabled': function(value){
            Utils.each(this.get('children'), function(child){
                child.setDisabled(value);
            });

            return this.ref;
        },
        //Inherited from iInput interface
        'setTheme': function(value){
            Utils.each(this.get('children'), function(child){
                child.setTheme(value);
            });

            return this.ref;
        },
        //Inherited from iInput interface
        'focus': function(){
            this.getChildAt(0).focus();
            return this.ref;
        }
    }).implement(iComponent)
});

/*
 * src/ui/Breadcrumb.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Breadcrumb',['./Group'], function(Group){
    return Group.extend(/** @lends ui/Breadcrumb# */{
        /**
         * Breadcrumb component class.
         * @constructs
         * @augments ui/Group
         * @param {string} mod - Mod name to present children.
         */
        'init': function(mod){
            this.super(mod);

            this.addClass('jb-breadcrumb')
        }
    })
})
;
/*
 * src/ui/ComponentContainer.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/ComponentContainer',[
    './Element'
], function(
    Element
){
    return Element.extend(/** @lends ui/ComponentContainer# */{
        /**
         * ComponentContainer component class.
         * @constructs
         * @augments ui/Element
         * @param {ui/Element} component - Component element to wrap it.
         */
        'init': function(component){
            this.super();
            this.addClass('jb-com-container');
            this.add(component);
            this.set('component', component);

            var message = Element.new().addClass('jb-com-message').hide();
            this.add(message);
            this.set('message', message);
        },

        /**
         * Returns component element.
         * @return {ui/Element} Component element.
         */
        'getComponent': function(){
            return this.get('component');
        },

        /**
         * Sets container style as block.
         * @param {boolean} value - Value.
         * @return {Object} Instance reference.
         */
        'setBlock': function(value){
            this.setClass('jb-com-container-block', value);
            return this.ref;
        },

        /**
         * Prints message under component with given color theme.
         * @param {string} text - Message text.
         * @param {string} theme - Color theme of message.
         * @return {Object} Instance reference.
         */
        'setMessage': function(text, theme){
            var message = this.get('message')
                .clear()
                .add(text)
                .removeClass('jb-text-primary jb-text-success jb-text-danger jb-text-warning jb-text-info')
                .show();

            switch(theme){
                case 'PRIMARY':
                    message.addClass('jb-text-primary');
                    break;
                case 'SUCCESS':
                    message.addClass('jb-text-success');
                    break;
                case 'DANGER':
                    message.addClass('jb-text-danger');
                    break;
                case 'WARNING':
                    message.addClass('jb-text-warning');
                    break;
                case 'INFO':
                    message.addClass('jb-text-info');
                    break;
            }

            return this.ref;
        },
        /**
         * Clears message under component.
         * @return {Object} Instance reference.
         */
        'clearMessage': function(){
            this.get('message').hide();
        }
    })
})
;
/*
 * src/ui/Icon.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Icon',['../core/Utils', './Element'], function(Utils, Element){
    return Element.extend(/** @lends ui/Icon# */{
        /**
         * Icon component class.
         * @constructs
         * @param {string} name - Icon name
         * @augments ui/Element
         */
        'init': function(name){
            this.super('i');

            this.addClass('fa fa-' + name);
        }
    });
});


/**
 * src/ui/utils/setTheme.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 02.08.2016
 */



define('burner/ui/utils/setTheme',['../../core/Utils'], function(Utils){
    return function(theme){
        var component = this.getComponent();
        var classPrefix = this.themeClassPrefix;
        if(Utils.isUnset(classPrefix)) classPrefix = '';

        component.removeClass('jb-' + classPrefix + 'primary jb-' + classPrefix + 'danger jb-' + classPrefix + 'warning jb-' + classPrefix + 'info jb-' + classPrefix + 'dark');

        switch(theme){
            case 'PRIMARY':
                component.addClass('jb-' + classPrefix + 'primary');
                break;
            case 'SUCCESS':
                component.addClass('jb-' + classPrefix + 'success');
                break;
            case 'DANGER':
                component.addClass('jb-' + classPrefix + 'danger');
                break;
            case 'WARNING':
                component.addClass('jb-' + classPrefix + 'warning');
                break;
            case 'INFO':
                component.addClass('jb-' + classPrefix + 'info');
                break;
            case 'DARK':
                component.addClass('jb-' + classPrefix + 'dark');
                break;
        }

        return this.ref;
    }
})
;
/*
 * src/ui/Button.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Button',[
    '../core/Utils',
    './ComponentContainer', './Element', './Icon',
    './utils/setTheme',
    './interfaces/iComponent'
], function(
    Utils,
    ComponentContainer, Element, Icon,
    setTheme,
    iComponent
){
    return ComponentContainer.extend(/** @lends ui/Button# */{
        /**
         * Button component class.
         * @constructs
         * @augments ui/ComponentContainer
         * @implements iComponent
         * @param {string} caption - Caption of button.
         */
        'init': function(caption){
            /**
             * Click event.
             * @event ui/Button.ui/Button:click
             */
            var component = Element.new('button')
                .setAttr('type', 'button')
                .addClass('jb-button');
            this.super(component);

            this.handle('click');
            component.getDom().addEventListener('click', this.emit.bind(this, 'click'));

            var captionElement = Element.new()
                .addClass('jb-button-caption');
            component.add(captionElement);
            this.set('captionElement', captionElement);

            if(!Utils.isSet(caption)) caption = '';
            this.setCaption(caption);
        },

        /**
         * Sets caption.
         * @param {string} caption - Caption of button.
         * @return {Object} Instance reference.
         */
        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption == '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        /**
         * Sets icon.
         * @param {string} name - Icon name.
         * @return {Object} Instance reference.
         */
        'setIcon': function(name){
            var component = this.getComponent();

            var iconElement = this.get('iconElement');
            if(iconElement){
                if(name == this.get('iconName')) return this.ref;
                iconElement.remove();
            }

            iconElement = Icon.new(name).addClass('jb-button-icon');
            component.prepend(iconElement);

            this.set('iconElement', iconElement);
            this.set('iconName', name);

            return this.ref;
        },

        //Inherited from iComponent interface
        'setTheme': setTheme,

        //Inherited from iComponent interface
        'setDisabled': function(value){
            if(value)
                this.getComponent().setAttr('disabled', 'disabled');
            else
                this.getComponent().removeAttr('disabled');

            return this.ref;
        },
        //Inherited from iComponent interface
        'focus': function(){
            this.getComponent().getDom().focus();

            return this.ref;
        }
    }).implement(iComponent)
})
;
/**
 * js/ui/iInput.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define('burner/ui/interfaces/iInput',[],function(){
    /**
     * Implements main component controller methods.
     * @interface iInput
     */
    return [
        /**
         * Returns value of component.
         * @function
         * @name iInput#getValue
         * @return{string|number} Value.
         */
        'getValue',
        /**
         * Sets value to default value.
         * @function
         * @name iInput#resetValue
         * @return {Object} Instance reference.
         */
        'resetValue',
        /**
         * Sets default value.
         * @function
         * @name iInput#setDefaultValue
         * @param {string|number} value - Default value.
         * @return {Object} Instance reference.
         */
        'setDefaultValue',
        /**
         * Sets value.
         * @function
         * @name iInput#setValue
         * @param {string|number} value - Value.
         * @return {Object} Instance reference.
         */
        'setValue'
    ]
});

/*
 * src/ui/Check.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Check',[
    '../core/Utils',
    './ComponentContainer', './Element', './Icon',
    './utils/setTheme',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element, Icon,
    setTheme,
    iComponent, iInput
){
    function repaint(){
        var icon = this.get('icon');
        if(this.getValue())
            icon.removeClass('jb-unvisible');
        else
            icon.addClass('jb-unvisible');
    }
    function toggle(){
        var oldValue = this.get('value');
        var group = this.get('group');
        var isRadioGroup = group && group.get('type') == 'RADIO';
        if(isRadioGroup)
            var oldGroupValue = group.getValue();

        this.toggle();

        var newValue = this.get('value');

        if(oldValue != newValue){
            this.emit('change',{
                'value': newValue
            });

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.emit('change', {'value': false});
                        return false;
                    }
                });
                group.emit('change', {
                    'value': group.getValue()
                });
            }
        }
    }

    return ComponentContainer.extend(/** @lends ui/Check# */{
        'value': false,

        /**
         * Check component class.
         * @constructs
         * @param {string|number} groupValue - Group value to use for CheckGroup or RadioGroup
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(groupValue){
            /**
             * Click event.
             * @event ui/Check.ui/Check:change
             */
            /**
             * Change event.
             * @event ui/Check.ui/Check:click
             * @param {boolean} value - Check state.
             */
            var component = Element.new('button');
            component.addClass('jb-check');
            this.super(component);

            this.setIcon('check');
            this.set('groupValue', groupValue);
            this.handle('change');
            this.handle('click');
            this.on('click', toggle.bind(this));
            component.getDom().addEventListener('click', toggle.bind(this));
        },

        //Inherited from iInput interface
        'setValue': function(value, force){
            if(!force){
                var group = this.get('group');
                if(group){
                    //Radio Group
                    if(group.get('type') == 'RADIO'){
                        if(value) group.setValue(this.get('groupValue'));
                        return this.ref;
                    }

                    //Check Group
                    var groupValues = group.getValue();
                    var groupValue = this.get('groupValue');
                    if(value) groupValues.push(this.get('groupValue'));
                    else groupValues.splice(groupValues.indexOf(groupValue), 1);
                }
            }

            this.set('value', value);
            repaint.call(this);
            return this.ref;
        },
        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },
        'defaultValue': false,
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },

        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'setDisabled': function(value){
            var component = this.getComponent();

            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },
        //Inherited from iComponent interface
        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        },

        /**
         * Toggles value.
         * @return {Object} Instance reference.
         */
        'toggle': function(){
            return this.setValue(!this.get('value'));
        },
        /**
         * Sets value to true.
         * @return {Object} Instance reference.
         */
        'check': function(){
            return this.setValue(true);
        },
        /**
         * Sets value to false.
         * @return {Object} Instance reference.
         */
        'uncheck': function(){
            return this.setValue(false);
        },

        /**
         * Binds a CheckGroup or RadioGroup to work with other Checks and Switches.
         * @param {CheckGroup|RadioGroup} gruop - Group instance to bind.
         * @return {Object} Instance reference.
         */
        'bind': function(group){
            this.set('group', group);
            var options = group.get('options');
            options.push(this);
            if(group.get('type') == 'RADIO'){
                this.getComponent().addClass('jb-radio');
                this.setIcon('circle');
                if(options.length == 1) this.check();
            }
            return this.ref;
        },

        /**
         * Sets check icon.
         * @param {string} name - Icon name.
         * @return {Object} Instance reference.
         */
        'setIcon': function(name){
            var icon = this.get('icon');
            if(icon)
                icon.remove();

            icon = Icon.new(name+ ' jb-check-icon');
            this.getComponent().add(icon);
            this.set('icon', icon);
            repaint.call(this);

            return this.ref;
        },

        /**
         * Sets value to represent in a group.
         * @param {string|number} value - Value to represent in a group.
         * @return {Object} Instance reference.
         */
        'setGroupValue': function(value){
            return this.set('groupValue', value);
        }
    }).implement(iComponent, iInput)
})
;
/**
 * js/ui/CheckGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.05.2016
 */

define('burner/ui/CheckGroup',[
    '../core/Utils', '../core/EventHandler',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils, EventHandler,
    iComponent, iInput
){
    return EventHandler.extend(/** @lends ui/CheckGroup# */{
        'type': 'CHECK',

        /**
         * CheckGroup component class.
         * @constructs
         * @augments ui/EventHandler
         * @implements iComponent
         * @implements iInput
         */
        'init': function(){
            /**
             * Change event.
             * @event ui/CheckGroup.ui/CheckGroup:change
             * @param {string|number} value - New value of component.
             */
            this.set('options', []);
            this.set('value', []);
            this.set('defaultValue', []);
            this.handle('change');
        },
        /**
         * Sets value.
         * @param {Array<string|number>} values - Value list to check.
         * @return {Object} Instance reference.
         */
        'setValue': function(values){
            this.set('value', values);
            Utils.each(this.get('options'), function(option){
                option.setValue(Utils.inArray(values, option.get('groupValue')), true);
            });
            return this.ref;
        },
        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(Utils.cloneArray(value));
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            this.setValue(Utils.cloneArray(this.get('defaultValue')));
            return this.ref;
        },

        //Inherited from iComponent interface
        'setDisabled': function(value){
            Utils.each(this.get('options'), function(option){
                option.setDisabled(value);
            });
            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': function(theme){
            Utils.each(this.get('options'), function(option){
                option.setTheme(theme);
            });
            return this.ref;
        },
        //Inherited from iComponent interface
        'focus': function(){
            this.get('options')[0].focus();
        }
    }).implement(iComponent, iInput);
})
;
/*
 * src/ui/Document.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Document',['../core/Utils', './Element'], function(Utils, Element){
    var children = [];

    return Element.extend(/** @lends ui/Document# */{
        /**
         * Document component class.
         * @constructs
         * @augments ui/Element
         */
        'init': function(){
            this.set('dom', document.body);
            this.set('children', children)
        }
    });
});


/*
 * src/ui/List.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/List',[
    '../core/Utils',
    './ComponentContainer', './Element',
    './utils/setTheme',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element,
    setTheme,
    iComponent, iInput
){
    function focus(e){
        this.getComponent().addClass('jb-focus');
    }
    function blur(e){
        this.getComponent().removeClass('jb-focus');
    }
    function select(item, callTrigger){
        var selectedItem = this.get('selectedItem');
        if(selectedItem){
            if(selectedItem.value == item.value) return;
            selectedItem.button.removeClass('jb-selected');
        }

        item.button.addClass('jb-selected');
        this.set('selectedItem', item);

        if(callTrigger)
            this.emit('change', {
                'value': item.value,
                'title': item.title
            });

        this.emit('selectedInternally');
    }
    return ComponentContainer.extend(/** @lends ui/List# */{
        /**
         * List component class.
         * @constructs
         * @param {Object[]} items - Item list
         * @param {string} items[].title - Title of an item
         * @param {string|number} items[].value - Value of an item
         * @param {string} items[].type - Type of an item
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(items){
            /**
             * Change event.
             * @event ui/List.ui/List:change
             * @param {string|number} value - Selected items value.
             */
            /**
             * Event of internally selection. It fired not only when user select an item, but also when set a value.
             * @event ui/List.ui/List:selectedInternally
             */
            var component = Element.new('ul')
                .addClass('jb-list');
            this.super(component);

            this.handle('change');
            this.handle('selectedInternally');

            this.addClass('jb-list-container');
            this.setItems(items);
        },

        //Inherited from iComponent interface
        'setDisabled': function(value){
            this.getComponent().setClass('jb-disabled', value);
            Utils.each(this.get('options'), function(item){
                item.button.setAttr('disabled', value);
            });
            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'focus': function(){
            this.get('firstItem').button.emitDom('focus');
            return this.ref;
        },

        //Inherited from iInput interface
        'getValue': function(){
            return this.get('selectedItem').value;
        },
        /**
         * Returns title of selected item.
         * @return {string} Title of selected item.
         */
        'getTitle': function(){
            return this.get('selectedItem').title;
        },
        //Inherited from iInput interface
        'setValue': function(value){
            var options = this.get('options');
            if(Utils.isUnset(options[value])){
                //TODO error
                throw 'There is no option has "' + value + '" value';
                return this.ref;
            }
            select.call(this, options[value]);
            return this.ref;
        },
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },

        /**
         * Sets items of list.
         * @param {Object[]} items - Item list
         * @param {string} items[].title - Title of an item
         * @param {string|number} items[].value - Value of an item
         * @param {string} items[].type - Type of an item
         * @return {Object} Instance reference.
         */
        'setItems': function(items){
            var options = {};
            this.set('options', options);

            var body = this.getComponent();
            var firstItem;
            Utils.each(items, function(item){
                if(item.type == 'SEPARATOR'){
                    var separator = Element.new('li')
                        .addClass('jb-list-separator');
                    if(Utils.isSet(item.title))
                        separator.add(
                            Element.new()
                                .addClass('jb-list-separator-title')
                                .add(item.title)
                        );
                    body.add(separator);
                    return;
                }

                body.add(
                    item.li = Element.new('li').add(
                        item.button = Element.new('button')
                            .addClass('jb-list-button')
                            .add(item.title)
                            .onDom('focus', focus.bind(this))
                            .onDom('blur', blur.bind(this))
                            .onDom('click', select.bind(this, item, true))
                    )
                );
                if(Utils.isSet(item.value))
                    if(Utils.isSet(options[item.value]))
                        //TODO error
                        throw 'Duplicate item value "' + item.value + '" with title "' + item.title + '" at List component.';
                    else
                        options[item.value] = item;
                    if(Utils.isUnset(firstItem)) firstItem = item;
            }, this);

            this.set('firstItem', firstItem);
            this.setDefaultValue(firstItem.value);

            return this.ref;
        },

        /**
         * Sets height to fix.
         * @param {string|number} Css value for height.
         * @return {Object} Instance reference.
         */
        'setHeight': function(height){
            this.getComponent().setStyle('height', height);
            return this.ref;
        }
    }).implement(iComponent, iInput)
})
;
/*
 * src/ui/utils/SpaceFinder.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 04.08.2016
 */

define('burner/ui/utils/SpaceFinder',[
    '../../core/Utils'
], function(
    Utils
){
    return {
        'targetRect': null,
        'thisRect': null,
        'checkDirection': function(direction){
            switch(direction){
                case 'TOP':
                    return this.targetRect.top >= this.thisRect.height;
                    break;
                case 'BOTTOM':
                    return document.documentElement.clientHeight - this.targetRect.top - this.targetRect.height >= this.thisRect.height;
                    break;
                case 'LEFT':
                    return this.targetRect.left >= this.thisRect.width;
                    break;
                case 'RIGHT':
                    return document.documentElement.clientWidth - this.targetRect.left - this.targetRect.width >= this.thisRect.width;
                    break;
            }
        },
        'calculateAlign': function(align){
            switch(align){
                case 'CENTER':
                    return this.targetRect.left + (this.targetRect.width - this.thisRect.width)/2;
                case 'MIDDLE':
                    return this.targetRect.top + (this.targetRect.height - this.thisRect.height)/2;
                case 'LEFT':
                    return this.targetRect.left;
                case 'RIGHT':
                    return this.targetRect.left + this.targetRect.width - this.thisRect.width;
                case 'TOP':
                    return this.targetRect.top;
                case 'BOTTOM':
                    return this.targetRect.top + this.targetRect.height - this.thisRect.height;
                case 'PAGE_TOP':
                    return 0;
                case 'PAGE_BOTTOM':
                    return document.documentElement.clientHeight - this.thisRect.height;
                case 'PAGE_LEFT':
                    return 0;
                case 'PAGE_RIGHT':
                    return document.documentElement.clientWidth - this.thisRect.width;
            }
        },
        'find': function(targetRect, thisRect, direction, align){
            this.targetRect = targetRect;
            this.thisRect = thisRect;

            var top, left;

            //Specify alternative positions by order if positioning fails
            var checkOrder;
            switch(direction){
                case 'TOP':
                    checkOrder = [
                        ['TOP', align],
                        ['BOTTOM', align],
                        ['RIGHT', direction == 'TOP' ? 'BOTTOM' : 'TOP'],
                        ['LEFT', direction == 'TOP' ? 'BOTTOM' : 'TOP']
                    ];
                    break;
                case 'BOTTOM':
                    checkOrder = [
                        ['BOTTOM', align],
                        ['TOP', align],
                        ['RIGHT', direction == 'TOP' ? 'BOTTOM' : 'TOP'],
                        ['LEFT', direction == 'TOP' ? 'BOTTOM' : 'TOP']
                    ];
                    break;
                case 'RIGHT':
                    checkOrder = [
                        ['RIGHT', align],
                        ['BOTTOM', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['TOP', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['LEFT', align]
                    ];
                    break;
                case 'LEFT':
                    checkOrder = [
                        ['LEFT', align],
                        ['BOTTOM', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['TOP', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['RIGHT', align]
                    ];
                    break;
            }

            //Try positions
            direction = 'CORNER';
            align = '';
            Utils.each(checkOrder, function(_direction){
                if(this.checkDirection(_direction[0])){
                    direction = _direction[0];
                    align = _direction[1];
                    return false;
                }
            }, this);

            //If aligning fails, specify alternative aligns. If doesn't fit, offers size
            var calculatedAlign = this.calculateAlign(align);
            var height = false;
            var width = false;
            if(
                align == 'TOP' ||
                align == 'BOTTOM' ||
                align == 'MIDDLE'
            ){
                var fitsScreen = this.thisRect.height <= document.documentElement.clientHeight;
                if(!fitsScreen){
                    align = 'PAGE_TOP';
                    height = document.documentElement.clientHeight;
                }else if(calculatedAlign < 0)
                    align = 'PAGE_TOP';
                else if(calculatedAlign + this.thisRect.height > document.documentElement.clientHeight){
                    align = 'PAGE_BOTTOM';
                }
            }else if(
                align == 'LEFT' ||
                align == 'RIGHT' ||
                align == 'CENTER'
            ){
                if(calculatedAlign < 0)
                    align = 'PAGE_LEFT';
                else if(calculatedAlign + this.thisRect.width > document.documentElement.clientWidht){
                    align = this.calculateAlign('PAGE_RIGHT') < 0 ?
                        'PAGE_LEFT' :
                        'PAGE_RIGHT';
                }
            }

            //Apply direction and align
            switch(direction){
                case 'TOP':
                    top = this.targetRect.relativeTop - this.thisRect.height;
                    break;
                case 'BOTTOM':
                    top = this.targetRect.relativeTop + this.targetRect.height;
                    break;
                case 'LEFT':
                    left = this.targetRect.relativeLeft - this.thisRect.width;
                    break;
                case 'RIGHT':
                    left = this.targetRect.relativeLeft + this.targetRect.width;
                    break;
                case 'CORNER':
                    left = this.targetRect.relativeLeft - this.targetRect.left;
                    top = this.targetRect.relativeTop - this.targetRect.top;
                    break;
            }
            switch(align){
                case 'CENTER':
                case 'LEFT':
                case 'RIGHT':
                case 'PAGE_LEFT':
                case 'PAGE_RIGHT':
                    left = this.calculateAlign(align) - this.targetRect.left + this.targetRect.relativeLeft;
                    break;

                case 'MIDDLE':
                case 'TOP':
                case 'BOTTOM':
                case 'PAGE_TOP':
                case 'PAGE_BOTTOM':
                    top = this.calculateAlign(align) - this.targetRect.top + this.targetRect.relativeTop;
                    break;
            }

            //Set style according to align to put space
            var popupClass;
            switch(align){
                case 'LEFT':
                case 'RIGHT':
                case 'TOP':
                case 'BOTTOM':
                    popupClass = 'jb-popup-align-' + align.toLowerCase();
                    break;
            }

            //Result
            return {
                'popupClass': popupClass,
                'top': top,
                'left': left,
                'height': height
            }
        }
    }
})
;
/*
 * src/ui/Popup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Popup',[
    '../core/Utils',
    './Element', './Group',
    './utils/SpaceFinder'
], function(
    Utils,
    Element, Group,
    SpaceFinder
){
    var shownPopup;

    function targetClickedInClickMode(e){
        if(this.hasClass('jb-hidden')){
            this.show();
        }else
            this.hide();
        e.stopPropagation();
    }
    function popupOnShowInClickMode(){
        //Close Other Popup
        if(shownPopup && shownPopup !== this) shownPopup.hide();
        shownPopup = this;

        //Put hide trigger
        window.addEventListener('click', this.hide);
    }
    function popupOnHideInClickMode(){
        shownPopup = null;

        //Remove hide trigger
        window.removeEventListener('click', this.hide);
    }
    function stopPropagation(e){
        e.stopPropagation();
    }
    function adjustPosition(){
        if(!this.getParent())
            this.get('target').add(this);

        //Remove prev styles affects position to avoid incorrect rect
        this.removeClass('jb-popup-align-top jb-popup-align-bottom jb-popup-align-left jb-popup-align-right');
        this.removeStyle('height'); //Full client height cases

        var targetRect = this.get('targetDom').getBoundingClientRect();
        targetRect.relativeTop = this.get('targetDom').offsetTop;
        targetRect.relativeLeft = this.get('targetDom').offsetLeft;
        var thisRect = this.getDom().getBoundingClientRect();

        var result = SpaceFinder.find(
            targetRect,
            thisRect,
            this.get('direction'),
            this.get('align')
        );

        if(result.popupClass)
            this.addClass(result.popupClass);

        //Result
        this.setStyle({
            'top': result.top,
            'left': result.left
        });

        //Calculate overflow for full client height
        //TODO This control is designed for Dropdown List, it has to be ready for other components
        if(result.height !== false){
            if(!this.getChildAt(0).getComponent) return;

            var computedStylesComponent = window.getComputedStyle(this.getChildAt(0).getComponent().getDom(), null);
            var computedStylesPopup = window.getComputedStyle(this.getDom(), null);
            result.height -= (
                parseInt(computedStylesComponent.getPropertyValue('padding-top')) +
                parseInt(computedStylesComponent.getPropertyValue('border-top-width'))
            ) * 2 +
            parseInt(computedStylesPopup.getPropertyValue('padding-top')) * 2;

            this.setStyle('height', result.height);
        }
    }

    return Element.extend(/** @lends ui/Popup# */{
        /**
         * Popup component class.
         * @constructs
         * @param {ui/Element} content - An element as content
         * @augments ui/Element
         */
        'init': function(content){
            this.super();
            this.addClass('jb-popup');
            this.hide();
            this.on('show', adjustPosition.bind(this));

            if(content)
                this.add(content);
        },

        'direction': 'TOP',
        'align': 'CENTER',
        /**
         * Sets direction of popup to target component.
         * @param {string} direction - Direction name. Options are TOP, BOTTOM, RIGHT, LEFT.
         * @param {string} align - Align name. Options are CENTER, MIDDLE, TOP, BOTTOM, RIGHT, LEFT.
         * @return {Object} Instance reference.
         */
        'setDirection': function(direction, align){
            //TODO error (also include default align value)
            switch(direction){
                case 'TOP':
                case 'BOTTOM':
                    if(Utils.isUnset(align))
                        align = 'CENTER';
                    else if(align != 'LEFT' && align != 'RIGHT' &&  align != 'CENTER')
                        throw 'Align have to be LEFT, RIGHT or CENTER for direction ' + direction;
                    break;
                case 'LEFT':
                case 'RIGHT':
                    if(Utils.isUnset(align))
                        align = 'MIDDLE';
                    else if(align != 'TOP' && align != 'BOTTOM' &&  align != 'MIDDLE')
                        throw 'Align have to be TOP, BOTTOM or MIDDLE for direction ' + direction;
                    break;
                default:
                    throw 'Direction have to be one of TOP, BOTTOM, LEFT and RIGHT';
            }

            this.set('direction', direction);
            this.set('align', align);

            return this.ref;
        },

        'bound': false,
        /**
         * Binds popup to a component.
         * @param {ui/ComponentContainer} target - Target component.
         * @param {string} [trigger=HOVER] - Trigger name. Options are CLICK, HOVER, FOCUS, NONE.
         * @return {Object} Instance reference.
         */
        'bind': function(target, trigger){
            //TODO Error
            if(this.get('bound')) throw 'Popup is already bound.';
            this.set('bound', true);
            //TODO error
            if(!target.hasClass('jb-com-container'))
                throw 'To bind popup, component has to have container.';

            var targetComponent = target.getComponent();
            var targetComponentDom = targetComponent.getDom();

            this.set('target', target);
            this.set('targetComponent', targetComponent);
            this.set('targetDom', targetComponent.getDom());

            if(trigger == 'NONE') return this;

            switch(trigger){
                case 'FOCUS':
                    targetComponentDom.addEventListener('focus', this.show);
                    targetComponentDom.addEventListener('blur', this.hide);
                    break;
                case 'CLICK':
                    target.on('click', targetClickedInClickMode.bind(this));
                    this.on('show', popupOnShowInClickMode.bind(this));
                    this.on('hide', popupOnHideInClickMode.bind(this));
                    this.getDom().addEventListener('click', stopPropagation.bind(this));
                    break;
                case 'HOVER':
                default:
                    targetComponentDom.addEventListener('mouseover', this.show);
                    targetComponentDom.addEventListener('mouseout', this.hide);
                    break;
            }

            return this.ref;
        }
    });
});

/*
 * src/ui/Dropdown.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define('burner/ui/Dropdown',[
    '../core/Utils',
    './Button', './Element', './Icon', './List', './Popup',
    './interfaces/iInput'
], function(
    Utils,
    Button, Element, Icon, List, Popup,
    iInput
){
    function change(e){
        this.emit('change', e);
    }
    function listSelectedInternally(){
        this.setCaption(this.getTitle());
        this.get('popup').hide();
    }

    return Button.extend(/** @lends ui/Dropdown# */{
        /**
         * Dropdown component class.
         * @constructs
         * @param {Object[]} items - Item list
         * @param {string} items[].title - Title of an item
         * @param {string|number} items[].value - Value of an item
         * @param {string} items[].type - Type of an item
         * @augments ui/Button
         * @implements iInput
         */
        'init': function(items){
            /**
             * Change event.
             * @event ui/Dropdown.ui/Dropdown:change
             * @param {string|number} value - Value of selected item.
             * @param {string} title - Title of selected item.
             */
            this.super();
            this.addClass('jb-dropdown');
            this.handle('change');

            this.getComponent().add(Icon.new('caret-down jb-button-icon'));

            var list = List.new(items)
                .addClass('jb-dropdown-list')
                .on('selectedInternally', listSelectedInternally.bind(this))
                .on('change', change.bind(this))
            this.set('list', list);

            var popup = Popup.new(list)
                .bind(this, 'CLICK')
                .setDirection('BOTTOM', 'RIGHT');
            this.set('popup', popup);

            this.setCaption(list.getTitle());
        },

        //Inherited from iInput interface
        'getValue': function(){
            return this.get('list').getValue();
        },
        /**
         * Returns title of selected item.
         * @return {string} Title of selected item.
         */
        'getTitle': function(){
            return this.get('list').getTitle();
        },
        //Inherited from iInput interface
        'setValue': function(value){
            this.get('list').setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.get('list').setDefaultValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            this.get('list').resetValue();
            return this.ref;
        }
    }).implement(iInput);
})
;
/*
 * src/ui/Input.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Input',[
    '../core/Utils',
    './ComponentContainer', './Element',
    './utils/setTheme',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element,
    setTheme,
    iComponent, iInput
){
    function change(e){
        this.emit('change',{
            value: e.target.value
        });
    }

    return ComponentContainer.extend(/** @lends ui/Input# */{
        /**
         * Input component class.
         * @constructs
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(){
            /**
             * Change event.
             * @event ui/Input.ui/Input:change
             * @param {string} value - Input value.
             */
            var component = Element.new('input')
                .setAttr('type', 'text')
                .addClass('jb-input');
            this.super(component);

            this.addClass('jb-com-container jb-input-container');
            this.handle('change');

            component.getDom().addEventListener('change', change.bind(this));
        },

        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'setDisabled': function(value){
            var component = this.getComponent();

            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },
        //Inherited from iComponent interface
        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        },

        //Inherited from iInput interface
        'setValue': function(value){
            this.getComponent().getDom().value = value;
            return this.ref;
        },
        //Inherited from iInput interface
        'getValue': function(value){
            return this.getComponent().getDom().value;
        },
        'defaultValue': '',
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },

        /**
         * Puts placeholder.
         * @param {string} value - Placeholder text.
         * @return {Object} Instance reference.
         */
        'setPlaceholder': function(value){
            this.get('component').setAttr('placeholder', value);
            return this.ref;
        },

        /**
         * Sets required state.
         * @param {boolean} value - Required state.
         * @return {Object} Instance reference.
         */
        'setRequired': function(value){
            if(value)
                this.setAttr('required', 'required');
            else
                this.removeAttr('required');

            return this.ref;
        }
    }).implement(iComponent, iInput)
})
;
/*
 * src/ui/Spinner.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define('burner/ui/Spinner',[
    '../core/Utils',
    './Button', './ComponentContainer', './Element', './Group', './Input',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    Button, ComponentContainer, Element, Group, Input,
    iComponent, iInput
){
    function countFaster(direction){
        direction *= 10;
        increase.call(this, direction);
        clearTimeout(this.get('clock'));
        this.set('clock', setInterval(increase.bind(this, direction), 40));
    }
    function countFast(direction){
        increase.call(this, direction);
        clearTimeout(this.get('clock'));
        this.set('clock', setInterval(increase.bind(this, direction), 40));
        this.set('delay', setTimeout(countFaster.bind(this, direction), 2000));
    }
    function countSlow(direction){
        increase.call(this, direction);
        this.set('clock', setInterval(increase.bind(this, direction), 160));
        this.set('delay', setTimeout(countFast.bind(this, direction), 1000));
    }
    function abortCount(){
        clearTimeout(this.get('delay'));
        clearTimeout(this.get('clock'));
    }
    function waitToCount(direction){
        increase.call(this, direction);
        this.set('delay', setTimeout(countSlow.bind(this, direction), 500));
    }

    function increase(direction){
        var value = this.get('value') + direction;
        if(this.get('loop')){
            var max = this.get('max');
            var min = this.get('min');
            if(value > max) value = min;
            else if(value < min) value = max;
            this.set('value', value);
            repaint.call(this);
            return this.ref;
        }

        var input = this.get('input');
        input.setValue(value);
        validate.call(this);
        emitChange.call(this);
        return this.ref;
    }
    function validate(){
        var value = Utils.toFloat(this.get('input').getValue());
        var max = this.get('max');
        var min = this.get('min');

        if(Utils.isSet(max) && value > max){
            value = max;
            abortCount.call(this);
        }else if(Utils.isSet(min) && value < min){
            value = min;
            abortCount.call(this);
        }

        this.set('value', value);
        repaint.call(this);
        return this.ref;
    }
    function emitChange(){
        this.emit('change', {
            'value': this.getValue()
        });
    }
    function repaint(){
        //this.get('input').getDom().value = this.get('value'); //To avoid onchange loop
        var value = this.get('value');
        var pad = this.get('pad');
        if(Utils.isSet(pad))
            value = Utils.pad(value, pad);
        this.get('input').setValue(value);
        return this.ref;
    }

    return ComponentContainer.extend(/** @lends ui/Spinner# */{
        /**
         * Spinner component class.
         * @constructs
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(){
            /**
             * Change event.
             * @event ui/Spinner.ui/Spinner:change
             * @param {number} value - New value of spinner.
             */
            var group = Group.new();
            this.super(group);
            this.handle('change');

            var input = Input.new()
                .on('change', validate.bind(this))
                .on('change', emitChange.bind(this));
            var buttonDown = Button.new()
                .setIcon('angle-down');
            buttonDown.getDom().addEventListener('mousedown', waitToCount.bind(this, -1));
            buttonDown.getDom().addEventListener('mouseup', abortCount.bind(this));
            buttonDown.getDom().addEventListener('mouseout', abortCount.bind(this));
            var buttonUp = Button.new()
                .setIcon('angle-up');
            buttonUp.getDom().addEventListener('mousedown', waitToCount.bind(this, 1));
            buttonUp.getDom().addEventListener('mouseup', abortCount.bind(this));
            buttonUp.getDom().addEventListener('mouseout', abortCount.bind(this));

            this.set('value', 0);
            this.set('input', input);
            this.set('buttonUp', buttonUp);
            this.set('buttonDown', buttonDown);
            group.addClass('jb-spinner');
            group.add(
                buttonDown,
                input,
                buttonUp
            );
            repaint.call(this);


            //TODO have to check
            //this.setDefaultValue(0);
        },

        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },
        //Inherited from iInput interface
        'setValue': function(value){
            this.get('input').setValue(value);
            validate.call(this);
            return this.ref;
        },
        //TODO have to check
        'defaultValue': 0,
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.setValue(value);
            this.set('defaultValue', this.getValue());
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },
        //Inherited from iComponent interface
        'focus': function(){
            return this.get('input').focus();
        },
        //Inherited from iComponent interface
        'setTheme': function(theme){
            this.getComponent().setTheme(theme);
        },
        //Inherited from iComponent interface
        'setDisabled': function(value){
            this.getComponent().setDisabled(value);
        },

        'buttonsAreShown': true,
        /**
         * Sets visibility state of increase / decrease buttons.
         * @param {boolean} value - Visibility state.
         * @return {Object} Instance reference.
         */
        'showButtons': function(value){
            if(this.get('buttonsAreShown') == value) return this.ref;

            if(value){
                this.getComponent()
                    .prepend(this.get('buttonDown'))
                    .add(this.get('buttonUp'));
            }else{
                this.get('buttonDown').remove();
                this.get('buttonUp').remove();
            }

            this.set('buttonsAreShown', value);
            return this.ref;
        },

        /**
         * Sets maximum value of spinner.
         * @param {number} value - Maximum value.
         * @return {Object} Instance reference.
         */
        'setMax': function(value){
            if(value === null) this.set('loop', false);
            this.set('max', value);
            validate.call(this);
            return this.ref;
        },
        'min': 0,
        /**
         * Sets minimum value of spinner.
         * @param {number} value - Minimum value.
         * @return {Object} Instance reference.
         */
        'setMin': function(value){
            if(value === null) this.set('loop', false);
            this.set('min', value);
            validate.call(this);
            return this.ref;
        },
        'loop': false,
        /**
         * Sets loop state of spinner. If true, when it reach minimum or maximum limit, it returns other limit.
         * @param {bootlean} value - Loop state.
         * @return {Object} Instance reference.
         */
        'setLoop': function(value){
            return this.set('loop', Utils.isSet(this.get('max'), this.get('min')) ? value : false);
        },
        /**
         * Sets pad length to put zero.
         * @param {number} value - Pad length.
         * @return {Object} Instance reference.
         */
        'setPad': function(value){
            if(value === false)
                this.unset('pad');
            else
                this.set('pad', value);
            repaint.call(this);
            return this.ref;
        }
    }).implement(iComponent, iInput)
})
;
/*
 * src/ui/Label.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Label',[
    '../core/Utils',
    './ComponentContainer', './Element', './Icon', './Spinner',
    './utils/setTheme',
    './interfaces/iComponent'
], function(
    Utils,
    ComponentContainer, Element, Icon, Spinner,
    setTheme,
    iComponent
){
    var uid=0;
    function genUid(){
        return 'label_' + (uid++);
    }

    return ComponentContainer.extend(/** @lends ui/Label# */{
        /**
         * Label component class.
         * @constructs
         * @param {string} caption - Caption text of label.
         * @augments ui/ComponentContainer
         * @implements iComponent
         */
        'init': function(caption){
            var component = Element.new('label')
                .addClass('jb-label');
            this.super(component);


            var captionElement = Element.new()
                .addClass('jb-label-caption');
            component.add(captionElement);
            this.set('captionElement', captionElement);

            if(!Utils.isSet(caption)) caption = '';
            this.setCaption(caption);
        },

        //Inherited from iComponent interface
        'setDisabled': function(value){
            var component = this.get('component');

            if(value){
                component.addClass('jb-label-disabled');
                return this.ref;
            }

            component.removeClass('jb-label-disabled');
            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'focus': function(){
            if(this.isBound())
                this.getBoundComponent().focus();
            return this.ref;
        },

        /**
         * Sets bold text state.
         * @param {boolean} value - Bold state.
         * @return {Object} Instance reference.
         */
        'setBold': function(value){
            this.get('component').setClass('jb-label-bold', value);
            return this.ref
        },
        /**
         * Sets boxed state. If true, puts label in a box.
         * @param {boolean} value - Boxed state.
         * @return {Object} Instance reference.
         */
        'setBoxed': function(value){
            this.get('component').setClass('jb-label-boxed', value);
            return this.ref
        },

        /**
         * Sets caption of label.
         * @param {string} caption - Caption text of label.
         * @return {Object} Instance reference.
         */
        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption === '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        /**
         * Puts icon at the beginning of label.
         * @param {string} name - Icon name.
         * @return {Object} Instance reference.
         */
        'setIcon': function(name){
            var iconElement = this.get('iconElement');

            if(iconElement) iconElement.remove();

            iconElement = Icon.new(name).addClass('jb-label-icon');
            this.get('component').prepend(iconElement);
            this.set('iconElement', iconElement);

            return this.ref;
        },

        'boundComponent': false,
        /**
         * Binds label to a focusable component. It corresponds defining "for" attribute in html.
         * @param {iComponent} component - Component to bind.
         * @return {Object} Instance reference.
         */
        'bind': function(component){
            if(component.isInstanceOf(Spinner)){
                component = component.get('input');
            }else if(!component.isImplementedBy(iComponent))
                //TODO Error
                throw 'Label cannot bind a non-component element.';
                //return this.ref;

            component = component.getComponent();

            var componentId = component.getAttr('id');
            if(Utils.isUnset(componentId)){
                componentId = genUid();
                component.setAttr('id', componentId);
            }
            this.getComponent().setAttr('for', componentId);
            this.set('boundComponent', component);
            return this.ref;
        },
        /**
         * Returns bound component which bound with ".bind()" method.
         * @return {iComponent} Bound component.
         * @see #bind
         */
        'getBoundComponent': function(){
            return this.get('boundComponent');
        },
        /**
         * Returns label is bound or not to a component.
         * @return {boolean} If it is bound or not.
         * @see #bind
         */
        'isBound': function(){
            return this.get('boundComponent') !== false;
        }
    }).implement(iComponent)
})
;
/*
 * src/ui/Message.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Message',[
    './Element', './Icon',
    './utils/setTheme'
], function(
    Element, Icon,
    setTheme
){
    return Element.extend(/** @lends ui/Message# */{
        /**
         * Message component class.
         * @constructs
         * @param {string} message - Content message text.
         * @param {string} theme - Color theme name.
         * @augments ui/Element
         */
        'init': function(message, theme){
            this.super();

            var className, iconName;
            switch(theme){
                case 'WARNING':
                    className = 'jb-warning';
                    iconName = 'warning';
                    break;
                case 'DANGER':
                    className = 'jb-danger';
                    iconName = 'minus-circle';
                    break;
                case 'SUCCESS':
                    className = 'jb-success';
                    iconName = 'check-circle';
                    break;
                case 'INFO':
                    className = 'jb-info';
                    iconName = 'info-circle';
                    break;
                default:
                case 'PRIMARY':
                    className = 'jb-primary';
                    iconName = 'info-circle';
                    break;
            }

            this.addClass('jb-message ' + className)
            this.add(
                Icon.new(iconName + ' jb-message-icon'),
                message
            );
        }
    })
})
;
/*
 * src/ui/Notifier.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Notifier',['../core/createClass', './Document', './Element', './Icon'], function(createClass, Document, Element, Icon){
    var notificationKon;

    function hideNotification(){
        this.addClass('jb-notification-slideup');
    }
    function removeNotification(){
        this.remove();
    }
    function showNotification(){
        this.addClass('jb-notification-fadein');
    }

    return createClass(/** @lends ui/Notifier# */{
        /**
         * Notifier component class.
         * @constructs
         * @augments core/createClass
         * @param {string} message - Content message text.
         * @param {string} theme - Color theme name.
         */
        'init': function(message, theme){
            if(!notificationKon){
                Document.new().add(
                    notificationKon = Element.new()
                    .addClass('jb-notifier')
                );
            }

            var className, iconName;
            switch(theme){
                case 'PRIMARY':
                    className = 'jb-primary';
                    iconName = 'info-circle';
                    break;
                case 'WARNING':
                    className = 'jb-warning';
                    iconName = 'warning';
                    break;
                case 'DANGER':
                    className = 'jb-danger';
                    iconName = 'minus-circle';
                    break;
                case 'SUCCESS':
                    className = 'jb-success';
                    iconName = 'check-circle';
                    break;
                case 'INFO':
                default:
                    className = 'jb-info';
                    iconName = 'info-circle';
                    break;
            }

            var notification = Element.new()
            .addClass('jb-notification ' + className)
            .add(
                Element.new()
                .addClass('jb-notification-content')
                .add(Icon.new(iconName), message)
            );
            notificationKon.prepend(notification);
            setTimeout(showNotification.bind(notification), 50);
            setTimeout(hideNotification.bind(notification), 5000);
            setTimeout(removeNotification.bind(notification), 5400);
        }
    })
})
;
/*
 * src/ui/RadioGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define('burner/ui/RadioGroup',[
    '../core/Utils', '../core/EventHandler',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils, EventHandler,
    iComponent, iInput
){
    return EventHandler.extend(/** @lends ui/RadioGroup# */{
        'type': 'RADIO',

        /**
         * RadioGroup component class.
         * @constructs
         * @augments ui/EventHandler
         * @implements iComponent
         * @implements iInput
         */
        'init': function(){
            /**
             * Change event.
             * @event ui/RadioGroup.ui/RadioGroup:change
             * @param {string|number} value - New value of component.
             */
            this.set('options', []);
            this.handle('change');
        },

        //Inherited from iInput interface
        'setValue': function(value){
            this.set('value', value);
            Utils.each(this.get('options'), function(option){
                option.setValue(option.get('groupValue') == value, true);
            });
            return this.ref;
        },
        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            var defaultValue = this.get('defaultValue');
            if(!Utils.isSet(defaultValue))
                defaultValue = this.get('options')[0].get('groupValue');
            this.setValue(defaultValue);
            return this.ref;
        },

        //Inherited from iComponent interface
        'setDisabled': function(value){
            Utils.each(this.get('options'), function(option){
                option.setDisabled(value);
            });
            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': function(theme){
            Utils.each(this.get('options'), function(option){
                option.setTheme(theme);
            });
            return this.ref;
        },
        //Inherited from iComponent interface
        'focus': function(){
            this.get('options')[0].focus();
        }
    }).implement(iComponent, iInput);
})
;
/*
 * src/ui/Switch.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define('burner/ui/Switch',[
    '../core/Utils',
    './ComponentContainer', './Element', './Icon',
    './utils/setTheme',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element, Icon,
    setTheme,
    iComponent, iInput
){
    function repaint(){
        if(this.getValue())
            this.addClass('jb-switch-checked');
        else
            this.removeClass('jb-switch-checked');
    }
    function toggle(){
        var oldValue = this.get('value');
        var group = this.get('group');
        var isRadioGroup = group && group.get('type') == 'RADIO';
        if(isRadioGroup)
            var oldGroupValue = group.getValue();

        this.toggle();

        var newValue = this.get('value');

        if(oldValue != newValue){
            this.emit('change',{
                'value': newValue
            });

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.emit('change', {'value': false});
                        return false;
                    }
                });
                group.emit('change', {
                    'value': group.getValue()
                });
            }
        }
    }

    return ComponentContainer.extend(/** @lends ui/Switch# */{
        'value': false,

        /**
         * Switch component class.
         * @constructs
         * @param {string|number} groupValue - Group value to use for CheckGroup or RadioGroup
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(groupValue){
            /**
             * Click event.
             * @event ui/Switch.ui/Switch:change
             */
            /**
             * Change event.
             * @event ui/Switch.ui/Switch:click
             * @param {boolean} value - Check state.
             */
            var component = Element.new('button');
            component.addClass('jb-check');
            this.super(component);

            this.handle('change');
            this.handle('click');
            this.on('click', toggle.bind(this));
            this.set('groupValue', groupValue);
            component.addClass('jb-switch');
            component.getDom().addEventListener('click', this.emit.bind(this, 'click'));

            var left = Element.new()
            .addClass('jb-switch-left')
            .add(Icon.new('circle-o'));
            var right = Element.new()
            .addClass('jb-switch-right')
            .add(Icon.new('check'));
            var container = Element.new()
            .addClass('jb-switch-container')
            //.setStyle('margin-left', 0) //For animation
            .add(
                left,
                Element.new().addClass('jb-switch-middle-container').add(
                    Element.new().addClass('jb-switch-middle').add(Element.new('b').add('lll'))//Icon.new('bars fa-rotate-90'))
                ),
                right
            );

            component.add(
                Element.new().addClass('jb-switch-cover').add(
                    container
                )
            );
            this.set('container', container);
        },

        //Inherited from iInput interface
        'setValue': function(value, force){
            if(!force){
                var group = this.get('group');
                if(group){
                    //Radio Group
                    if(group.get('type') == 'RADIO'){
                        if(value) group.setValue(this.get('groupValue'));
                        return this.ref;
                    }

                    //Check Group
                    var groupValues = group.getValue();
                    var groupValue = this.get('groupValue');
                    if(value) groupValues.push(this.get('groupValue'));
                    else groupValues.splice(groupValues.indexOf(groupValue), 1);
                }
            }

            this.set('value', value);
            repaint.call(this);
            return this.ref;
        },
        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },

        'defaultValue': false,
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },

        //Inherited from iComponent interface
        'setDisabled': function(value){
            var component = this.getComponent();
            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        },

        /**
         * Toggles value.
         * @return {Object} Instance reference.
         */
        'toggle': function(){
            return this.setValue(!this.get('value'));
        },
        /**
         * Sets value to true.
         * @return {Object} Instance reference.
         */
        'check': function(){
            return this.setValue(true);
        },
        /**
         * Sets value to false.
         * @return {Object} Instance reference.
         */
        'uncheck': function(){
            return this.setValue(false);
        },

        /**
         * Binds a CheckGroup or RadioGroup to work with other Checks and Switches.
         * @param {CheckGroup|RadioGroup} gruop - Group instance to bind.
         * @return {Object} Instance reference.
         */
        'bind': function(group){
            this.set('group', group);
            var options = group.get('options');
            options.push(this);
            if(group.get('type') == 'RADIO'){
                //this.addClass('jb-radio');
                //this.setIcon('circle');
                if(options.length == 1) this.check();
            }
            return this.ref;
        },

        /**
         * Sets value to represent in a group.
         * @param {string|number} value - Value to represent in a group.
         * @return {Object} Instance reference.
         */
        'setGroupValue': function(value){
            return this.set('groupValue', value);
        }
    }).implement(iComponent, iInput)
})
;
/*
 * src/ui/Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */



define('burner/ui/Tip',['../core/Utils', './Popup', './Element'], function(Utils, Popup, Element){
    return Popup.extend(/** @lends ui/Tip# */{
        /**
         * Tip component class.
         * @constructs
         * @param {string} message - Content message text.
         * @augments ui/Element
         */
        'init': function(text){
            this.super();
            var content = Element.new()
            .addClass('jb-tip-content')
            .add(text);

            this.addClass('jb-tip');
            this.add(content);

            //this.add(Element.new().addClass('jb-tip-pointer'));
        }
    });
});

