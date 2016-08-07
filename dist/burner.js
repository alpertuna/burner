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

/**
 * js/core/Utils.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */



define('burner/core/Utils',[],function(){
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
        'cloneArray': function(arr){
            return arr.slice();
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

/**
 * js/core/Class.js
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
            {
                '_classId': Class._id,
                '_implements': Class._implements,
                'isInstanceOf': isInstanceOf,
                'isImplementedBy': isImplementedBy,
                'get': get.bind(base),
                'set': set.bind(base),
                'unset': unset.bind(base),
                'inc': inc.bind(base),
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
    return function(proto){
        if(!proto.init) proto._init = function(){}
        return Utils.extend(
            createCore(),
            splitProto(proto)
        )
    }
});

/**
 * js/core/EventHandler.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 12.05.2016
 */

define('burner/core/EventHandler',['./createClass'], function(createClass){
    return createClass({
        /*
         * Event Handling
         *===========================================================*/
        'handle': function(action){
            var events = this.get('events');
            if(!events){
                events = {};
                this.set('events', events);
            }
            events[action] = [];
            return this.ref;
        },
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
        'trigger': function(action, event){
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
/**
 * js/core/Ajax.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.06.2016
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
            this.trigger('always', xhttp.responseText);

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
                        this.trigger('success', json);
                }
            }else fail = true;

            if(fail)
                this.trigger('fail', xhttp.responseText);
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

    return EventHandler.extend({
        'connectionIsOpen': false,
        'init': function(url){
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
        'setMethod': function(method){
            this.set('method', method);
            return this.ref;
        },
        'setUrl': function(url){
            this.set('url', url);
            return this.ref;
        },
        'send': function(object){
            if(this.get('connectionIsOpen')){
                console.warn('Last connection hasn\'t closed yet.');

                return this.ref;
            }

            var ajaxGroup = this.get('ajaxGroup');
            if(ajaxGroup){
                if(!ajaxGroup.hasRoom()){
                    this.trigger('maxConnection');
                    ajaxGroup.trigger('maxConnection');
                    return this.ref;
                }
                ajaxGroup.trigger('openedConnection');
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

            this.trigger('send');

            return this.ref;
        },

        'bound': false,
        'bind': function(ajaxGroup){
            if(this.get('bound')){
                //TODO error
                throw 'This ajax instance is already bound a group.';
                return this.ref;
            }

            this.set('bound', true);
            this.set('ajaxGroup', ajaxGroup);
            this.on('always', ajaxGroup.trigger.bind(ajaxGroup, 'closedConnection'));
            return this.ref;
        }
    })
})
;
/**
 * js/core/AjaxGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 15.06.2016
 */



define('burner/core/AjaxGroup',['./EventHandler'], function(EventHandler){
    function onOpenedConnection(){
        if(this.get('connections') == 0)
            this.trigger('openedFirstConnection');
        this.inc('connections');
        this.trigger('change');
    }
    function onClosedConnection(){
        this.inc('connections', -1);
        if(this.get('connections') == 0)
            this.trigger('closedLastConnection');
        this.trigger('change');
    }

    return EventHandler.extend({
        'connections': 0,
        'maxConnection': 0,

        'init': function(){
            this.handle('change');
            this.handle('openedConnection');
            this.handle('closedConnection');
            this.handle('openedFirstConnection');
            this.handle('closedLastConnection');
            this.handle('maxConnection');
            this.on('openedConnection', onOpenedConnection.bind(this));
            this.on('closedConnection', onClosedConnection.bind(this));
        },

        'setMaxConnection': function(value){
            this.set('maxConnection', value);
            return this.ref;
        },

        'hasRoom': function(){
            var maxConnection = this.get('maxConnection');
            if(maxConnection == 0) return true;
            return this.countConnections() < maxConnection;
        },
        'countConnections': function(){
            return this.get('connections');
        }
    })
})
;
/**
 * js/com/ui/TextElement.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */



//To avoid loop and unnecessary ElementCore class, this is Element likely class
define('burner/ui/TextElement',['../core/createClass'], function(createClass){
    return createClass({
        'init': function(text){
            /*this.set('dom', document.createElement('span'));
            this.get('dom').innerHTML = text;*/
           if(text == '&nbsp;') text = '\u00A0';
            this.set('dom', document.createTextNode(text));
        },
        'getDom': function(){
            return this.get('dom');
        }
    })
})
;
/**
 * js/com/Element.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 12.04.2016
 */



define('burner/ui/Element',['../core/EventHandler', '../core/Utils', './TextElement'], function(EventHandler, Utils, TextElement){
    return EventHandler.extend({
        'init': function(tag){
            if(!tag) tag = 'div';

            this.set('dom', Utils.isString(tag) ? document.createElement(tag) : tag);
            this.set('children', []);
            this.handle('show');
            this.handle('hide');
            this.on('show', function(){this.removeClass('jb-hidden')});
            this.on('hide', function(){this.addClass('jb-hidden')});
        },


        /*
         * Attribute Managing
         *===========================================================*/
        'getAttr': function(attr){
            return this.getDom().getAttribute(attr);
        },
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
        'removeAttr': function(attr){
            this.getDom().removeAttribute(attr);
            return this.ref;
        },
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

        'addClass': function(newClasses){
            var classList = this.getDom().classList;
            newClasses = newClasses.split(' ');
            for(var i in newClasses)
                classList.add(newClasses[i]);

            return this.ref;
        },
        'removeClass': function(oldClasses){
            var classList = this.getDom().classList;
            if(classList.length == 0)
                return this.ref;

            oldClasses = oldClasses.split(' ');
            for(var i in oldClasses)
                classList.remove(oldClasses[i]);

            return this.ref;
        },
        'hasClass': function(className){
            return this.getDom().classList.contains(className);
        },
        'toggleClass': function(className){
            return this.setClass(className, !this.hasClass(className));
        },
        'setClass': function(className, value){
            if(value)
                return this.addClass(className);
            return this.removeClass(className);
        },

        /*
         * Content Managing
         *===========================================================*/
        'clear': function(){
            this.getDom().innerHTML = '';
            return this.ref;
        },
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
        'add': function(){
            Utils.each(arguments, function(element){
                this.addAt(element);
            }, this);
            return this.ref;
        },
        'prepend': function(){
            Utils.each(arguments, function(element, i){
                this.addAt(element, i);
            }, this);
            return this.ref;
        },
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
        'addAfter': function(element, targetElement){
            return this.addNear(element, targetElement, true);
        },
        'addBefore': function(element, targetElement){
            return this.addNear(element, targetElement);
        },
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

        'getParent': function(){
            return this.get('parent');
        },
        'getChildren': function(){
            return this.get('children');
        },
        'getChildAt': function(index){
            return this.getChildren()[index];
        },

        /*
         * Event Handling
         *===========================================================*/
        'onDom': function(action, func){
            this.getDom().addEventListener(action, func);
            return this.ref;
        },
        'offDom': function(action, func){
            this.getDom().removeEventListener(action, func);
            return this.ref;
        },
        'triggerDom': function(action){
            this.getDom().dispatchEvent(new Event(action));
            return this.ref;
        },
        /*'on': function(action, func){
            try{
                this.super.on(action, func);
            }catch(e){
                if(e[0] == 'NO_ACTION')
                    this.getDom().addEventListener(action, func);
                else
                    throw e;
            }

            return this.ref;
        },
        'off': function(action, func){
            try{
                this.super.off(action, func);
            }catch(e){
                if(e[0] == 'NO_ACTION')
                    this.getDom().removeEventListener(action, func);
                else
                    throw e;
            }
            return this.ref;
        },
        'trigger': function(action, event){
            try{
                this.super.trigger(action, event);
            }catch(e){
                if(e[0] == 'NO_ACTION')
                    this.getDom().dispatchEvent(new Event(action));
                else
                    throw e;
            }
            return this.ref;
        },*/

        /*
         * Ready-to-use handled events
         *===========================================================*/
        'hide': function(){
            if(this.hasClass('jb-hidden'))
                return this.ref;

            return this.trigger('hide');
        },
        'show': function(){
            if(!this.hasClass('jb-hidden'))
                return this.ref;

            return this.trigger('show');
        },
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
        'getDom': function(){
            return this.get('dom');
        }
    });
});

/*
 * src/ui/interfaces/iComponent.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 02.08.2016
 */



define('burner/ui/interfaces/iComponent',[],function(){
    return [
        'focus',
        'setDisabled',
        'setTheme'
    ]
})
;
/**
 * js/./Group.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */



define('burner/ui/Group',[
    '../core/Utils',
    './Element',
    './interfaces/iComponent'
], function(Utils, Element, iComponent){
    return Element.extend({
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

        'setDisabled': function(value){
            Utils.each(this.get('children'), function(child){
                child.setDisabled(value);
            });

            return this.ref;
        },
        'setTheme': function(value){
            Utils.each(this.get('children'), function(child){
                child.setTheme(value);
            });

            return this.ref;
        },
        'focus': function(){
            this.getChildAt(0).focus();
            return this.ref;
        }
    }).implement(iComponent)
});

/**
 * src/ui/Breadcrumb.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.06.2016
 */



define('burner/ui/Breadcrumb',['./Group'], function(Group){
    return Group.extend({
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
 * Date: 02.08.2016
 */



define('burner/ui/ComponentContainer',[
    './Element'
], function(
    Element
){
    return Element.extend({
        'init': function(component){
            this.super();
            this.addClass('jb-com-container');
            this.add(component);
            this.set('component', component);

            var message = Element.new().addClass('jb-com-message').hide();
            this.add(message);
            this.set('message', message);
        },

        'getComponent': function(){
            return this.get('component');
        },

        'setBlock': function(value){
            this.setClass('jb-com-container-block', value);
            return this.ref;
        },

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
        'clearMessage': function(){
            this.get('message').hide();
        }
    })
})
;
/**
 * js/com/./Icon.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */



define('burner/ui/Icon',['../core/Utils', './Element'], function(Utils, Element){
    return Element.extend({
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
/**
 * js/com/./Button.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
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
    return ComponentContainer.extend({
        'init': function(caption){
            var component = Element.new('button')
                .setAttr('type', 'button')
                .addClass('jb-button');
            this.super(component);

            this.handle('click');
            component.getDom().addEventListener('click', this.trigger.bind(this, 'click'));

            var captionElement = Element.new()
                .addClass('jb-button-caption');
            component.add(captionElement);
            this.set('captionElement', captionElement);

            if(!Utils.isSet(caption)) caption = '';
            this.setCaption(caption);
        },

        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption == '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

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

        'setTheme': setTheme,

        'setDisabled': function(value){
            if(value)
                this.getComponent().setAttr('disabled', 'disabled');
            else
                this.getComponent().removeAttr('disabled');

            return this.ref;
        },

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
    return [
        'setDisabled',
        'setValue',
        'setDefaultValue',
        'resetValue',
        'getValue'
    ]
});

/**
 * js/./Check.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
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
            this.trigger('change',{
                'value': newValue
            });

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.trigger('change', {'value': false});
                        return false;
                    }
                });
                group.trigger('change', {
                    'value': group.getValue()
                });
            }
        }
    }

    return ComponentContainer.extend({
        'value': false,
        'init': function(groupValue){
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
        'setDisabled': function(value){
            var component = this.getComponent();

            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },

        'setGroupValue': function(value){
            return this.set('groupValue', value);
        },
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
        'getValue': function(){
            return this.get('value');
        },
        'toggle': function(){
            return this.setValue(!this.get('value'));
        },
        'check': function(){
            return this.setValue(true);
        },
        'uncheck': function(){
            return this.setValue(false);
        },

        'defaultValue': false,
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },

        'setTheme': setTheme,
        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
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
    return EventHandler.extend({
        'type': 'CHECK',

        'init': function(){
            this.set('options', []);
            this.set('value', []);
            this.set('defaultValue', []);
            this.handle('change');
        },
        'setValue': function(values){
            this.set('value', values);
            Utils.each(this.get('options'), function(option){
                option.setValue(Utils.inArray(values, option.get('groupValue')), true);
            });
            return this.ref;
        },
        'getValue': function(){
            return this.get('value');
        },
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(Utils.cloneArray(value));
            return this.ref;
        },
        'resetValue': function(){
            this.setValue(Utils.cloneArray(this.get('defaultValue')));
            return this.ref;
        },

        'setDisabled': function(value){
            Utils.each(this.get('options'), function(option){
                option.setDisabled(value);
            });
            return this.ref;
        },
        'setTheme': function(theme){
            Utils.each(this.get('options'), function(option){
                option.setTheme(theme);
            });
            return this.ref;
        },

        'focus': function(){
            this.get('options')[0].focus();
        }
    }).implement(iComponent, iInput);
})
;
/**
 * com/ui/Document.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 18.04.2016
 */



define('burner/ui/Document',['../core/Utils', './Element'], function(Utils, Element){
    var children = [];

    return Element.extend({
        'init': function(){
            this.set('dom', document.body);
            this.set('children', children)
        }
    });
});


/**
 * src/ui/List.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 06.08.2016
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
            this.trigger('change', {
                'value': item.value,
                'title': item.title
            });

        this.trigger('selectedInternally');
    }
    return ComponentContainer.extend({
        'init': function(items){
            var component = Element.new('ul')
                .addClass('jb-list');
            this.super(component);

            this.handle('change');
            this.handle('selectedInternally');

            this.addClass('jb-list-container');
            this.setItems(items);
        },
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
        },
        'setHeight': function(height){
            this.getComponent().setStyle('height', height);
            return this.ref;
        },

        'setDisabled': function(value){
            this.getComponent().setClass('jb-disabled', value);
            Utils.each(this.get('options'), function(item){
                item.button.setAttr('disabled', value);
            });
            return this.ref;
        },
        'setTheme': setTheme,

        'getValue': function(){
            return this.get('selectedItem').value;
        },
        'getTitle': function(){
            return this.get('selectedItem').title;
        },
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
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },
        'focus': function(){
            this.get('firstItem').button.triggerDom('focus');
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
/**
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
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

    return Element.extend({
        'init': function(content){
            this.super();
            this.addClass('jb-popup');
            this.hide();
            this.on('show', adjustPosition.bind(this));

            if(content)
                this.add(content);
        },

        /**
         * Directions: TOP, BOTTOM, RIGHT, LEFT
         * Aligns: CENTER, MIDDLE, TOP, BOTTOM, RIGHT, LEFT
         */
        'direction': 'TOP',
        'align': 'CENTER',
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
        //FOCUS, HOVER, CLICK, NONE
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

/**
 * js/./Dropbox.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.04.2016
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
        this.trigger('change', e);
    }
    function listSelectedInternally(){
        this.setCaption(this.getTitle());
        this.get('popup').hide();
    }

    return Button.extend({
        'init': function(items){
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

        'getValue': function(){
            return this.get('list').getValue();
        },
        'getTitle': function(){
            return this.get('list').getTitle();
        },
        'setValue': function(value){
            this.get('list').setValue(value);
            return this.ref;
        },
        'setDefaultValue': function(value){
            this.get('list').setDefaultValue(value);
            return this.ref;
        },
        'resetValue': function(){
            this.get('list').resetValue();
            return this.ref;
        }
    }).implement(iInput);
})
;
/**
 * js/./Input.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
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
        this.trigger('change',{
            value: e.target.value
        });
    }

    return ComponentContainer.extend({
        'init': function(){
            var component = Element.new('input')
                .setAttr('type', 'text')
                .addClass('jb-input');
            this.super(component);

            this.addClass('jb-com-container jb-input-container');
            this.handle('change');

            component.getDom().addEventListener('change', change.bind(this));
        },

        'setPlaceholder': function(value){
            this.get('component').setAttr('placeholder', value);
            return this.ref;
        },

        'setTheme': setTheme,

        'setDisabled': function(value){
            var component = this.getComponent();

            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },

        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        },

        'setValue': function(value){
            this.getComponent().getDom().value = value;
            return this.ref;
        },
        'getValue': function(value){
            return this.getComponent().getDom().value;
        },

        'defaultValue': '',
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },
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
/**
 * js/./Spinner.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 03.05.2016
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
        triggerChange.call(this);
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
    function triggerChange(){
        this.trigger('change', {
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

    return ComponentContainer.extend({
        'init': function(){
            var group = Group.new();
            this.super(group);
            this.handle('change');

            var input = Input.new()
                .on('change', validate.bind(this))
                .on('change', triggerChange.bind(this));
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

        'buttonsAreShown': true,
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

        'setMax': function(value){
            if(value === null) this.set('loop', false);
            this.set('max', value);
            validate.call(this);
            return this.ref;
        },
        'min': 0,
        'setMin': function(value){
            if(value === null) this.set('loop', false);
            this.set('min', value);
            validate.call(this);
            return this.ref;
        },
        'loop': false,
        'setLoop': function(value){
            return this.set('loop', Utils.isSet(this.get('max'), this.get('min')) ? value : false);
        },
        'setPad': function(value){
            if(value === false)
                this.unset('pad');
            else
                this.set('pad', value);
            repaint.call(this);
            return this.ref;
        },

        'getValue': function(){
            return this.get('value');
        },
        'setValue': function(value){
            this.get('input').setValue(value);
            validate.call(this);
            return this.ref;
        },

        //TODO have to check
        'defaultValue': 0,
        'setDefaultValue': function(value){
            this.setValue(value);
            this.set('defaultValue', this.getValue());
            return this.ref;
        },
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },
        'focus': function(){
            return this.get('input').focus();
        },

        'setTheme': function(theme){
            this.getComponent().setTheme(theme);
        },
        'setDisabled': function(value){
            this.getComponent().setDisabled(value);
        }
    }).implement(iComponent, iInput)
})
;
/**
 * js/./Label.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
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

    return ComponentContainer.extend({
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

        'setBold': function(value){
            this.get('component').setClass('jb-label-bold', value);
            return this.ref
        },

        'setBoxed': function(value){
            this.get('component').setClass('jb-label-boxed', value);
            return this.ref
        },

        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption === '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        'setIcon': function(name){
            var iconElement = this.get('iconElement');

            if(iconElement) iconElement.remove();

            iconElement = Icon.new(name).addClass('jb-label-icon');
            this.get('component').prepend(iconElement);
            this.set('iconElement', iconElement);

            return this.ref;
        },

        'setDisabled': function(value){
            var component = this.get('component');

            if(value){
                component.addClass('jb-label-disabled');
                return this.ref;
            }

            component.removeClass('jb-label-disabled');
            return this.ref;
        },

        'setTheme': setTheme,

        'boundComponent': false,
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
        'getBoundComponent': function(){
            return this.get('boundComponent');
        },
        'isBound': function(){
            return this.get('boundComponent') !== false;
        },

        'focus': function(){
            if(this.isBound())
                this.getBoundComponent().focus();
            return this.ref;
        }
    }).implement(iComponent)
})
;
/**
 * src/ui/Message.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 30.06.2016
 */



define('burner/ui/Message',[
    './Element', './Icon',
    './utils/setTheme'
], function(
    Element, Icon,
    setTheme
){
    return Element.extend({
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
/**
 * js/ui/Notifier.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.06.2016
 */



define('burner/ui/Notifier',['./Document', './Element', './Icon'], function(Document, Element, Icon){
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

    return Element.extend({
        'init': function(message, theme){
            this.super();

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
/**
 * js/./RadioGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define('burner/ui/RadioGroup',[
    '../core/Utils', '../core/EventHandler',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils, EventHandler,
    iComponent, iInput
){
    return EventHandler.extend({
        'type': 'RADIO',

        'init': function(){
            this.set('options', []);
            this.handle('change');
        },
        'setValue': function(value){
            this.set('value', value);
            Utils.each(this.get('options'), function(option){
                option.setValue(option.get('groupValue') == value, true);
            });
            return this.ref;
        },
        'getValue': function(){
            return this.get('value');
        },
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            var defaultValue = this.get('defaultValue');
            if(!Utils.isSet(defaultValue))
                defaultValue = this.get('options')[0].get('groupValue');
            this.setValue(defaultValue);
            return this.ref;
        },
        'setDisabled': function(value){
            Utils.each(this.get('options'), function(option){
                option.setDisabled(value);
            });
            return this.ref;
        },
        'setTheme': function(theme){
            Utils.each(this.get('options'), function(option){
                option.setTheme(theme);
            });
            return this.ref;
        },

        'focus': function(){
            this.get('options')[0].focus();
        }
    }).implement(iComponent, iInput);
})
;
/**
 * js/./Switch.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 29.04.2016
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
            this.trigger('change',{
                'value': newValue
            });

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.trigger('change', {'value': false});
                        return false;
                    }
                });
                group.trigger('change', {
                    'value': group.getValue()
                });
            }
        }
    }

    return ComponentContainer.extend({
        'value': false,
        'init': function(groupValue){
            var component = Element.new('button');
            component.addClass('jb-check');
            this.super(component);

            this.handle('change');
            this.handle('click');
            this.on('click', toggle.bind(this));
            this.set('groupValue', groupValue);
            component.addClass('jb-switch');
            component.getDom().addEventListener('click', this.trigger.bind(this, 'click'));

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

        'setDisabled': function(value){
            var component = this.getComponent();
            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },

        'setGroupValue': function(value){
            return this.set('groupValue', value);
        },
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
        'getValue': function(){
            return this.get('value');
        },
        'toggle': function(){
            return this.setValue(!this.get('value'));
        },
        'check': function(){
            return this.setValue(true);
        },
        'uncheck': function(){
            return this.setValue(false);
        },

        'defaultValue': false,
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },


        'setTheme': setTheme,
        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        }
    }).implement(iComponent, iInput)
})
;
/**
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
 */



define('burner/ui/Tip',['../core/Utils', './Popup', './Element'], function(Utils, Popup, Element){
    return Popup.extend({
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

