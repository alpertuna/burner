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

(function(root) {
define("burner/third/date.format", [], function() {
  return (function() {
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};



  }).apply(root, arguments);
});
}(this));

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
                result.push(callback(item));
            }, reference);
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
                'isInstanceOf': isInstanceOf,
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
                '_super': this
            }
        )
    }
    function implement(methods){
        for(var i in methods){
            var method = methods[i];
            if(!findMethod(method, this))
                //TODO Error
                console.error('"' + method + '" method is not defined according to implemented interface.');
                //throw '"' + method + '" method is not defined according to implemented interface.';
        }

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
 * js/core/AjaxGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 15.06.2016
 */



define('burner/core/AjaxGroup',['./EventHandler'], function(EventHandler){
    function onOpenedConnection(){
        if(this.get('connections') == 0)
            this.trigger('openedfirstconnection');
        this.inc('connections');
    }
    function onClosedConnection(){
        this.inc('connections', -1);
        if(this.get('connections') == 0)
            this.trigger('closedlastconnection');
    }

    return EventHandler.extend({
        'connections': 0,
        'maxConnection': 0,

        'init': function(){
            this.handle('openedconnection');
            this.handle('closedconnection');
            this.handle('openedfirstconnection');
            this.handle('closedlastconnection');
            this.handle('maxconnection');
            this.on('openedconnection', onOpenedConnection.bind(this));
            this.on('closedconnection', onClosedConnection.bind(this));
        },

        'setMaxConnection': function(value){
            this.set('maxConnection', value);
            return this.ref;
        },

        'hasRoom': function(){
            var maxConnection = this.get('maxConnection');
            if(maxConnection == 0) return true;
            return this.get('connections') < maxConnection;
        }
    })
})
;
/**
 * js/core/Ajax.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.06.2016
 */



define('burner/core/Ajax',['./EventHandler'], function(EventHandler){
    function readyStateChange(){
        var xhttp = this.get('xhttp');
        if(xhttp.readyState == 4){
            //TODO here, if there is ajax group, there can be trigger instead of using onalways bellow
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

    return EventHandler.extend({
        'method': 'POST',
        'init': function(url){
            this.handle('success');
            this.handle('fail');
            this.handle('always');
            this.handle('maxconnection');
            //TODO debug tool
            this.on('fail', function(c){
                console.warn('Response for ajax has fail: "' + c + '"');
            });
            //TODO debug tool
            /*this.on('maxconnection', function(c){
                console.warn('Reached max connection.');
            });*/

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
        'setUrl': function(url){
            this.set('url', url);
            return this.ref;
        },
        /*'setMethod': function(method){
            this.set('method', method);
            return this.ref;
        },*/
        'send': function(object){
            var ajaxGroup = this.get('ajaxGroup');
            if(ajaxGroup){
                if(!ajaxGroup.hasRoom()){
                    this.trigger('maxconnection');
                    ajaxGroup.trigger('maxconnection');
                    //this.trigger('always'); //Always closedconnectiona bağlı olduğundan çalışmamalı
                    return this.ref;
                }
                ajaxGroup.trigger('openedconnection');
            }

            var xhttp = this.get('xhttp');
            xhttp.open(this.get('method'), this.get('url'), true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.onreadystatechange = readyStateChange.bind(this);
            if(!object) xhttp.send();
            else xhttp.send('data=' + JSON.stringify(object));
            return this.ref;
        },

        'bind': function(ajaxGroup){
            this.set('ajaxGroup', ajaxGroup);
            this.on('always', ajaxGroup.trigger.bind(ajaxGroup, 'closedconnection'));
            return this.ref;
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
            this.set('dom', document.createElement('span'));
            this.get('dom').innerHTML = text;
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
            if(this.hasClass(className))
                return this.removeClass(className);
            return this.addClass(className);
        },

        /*
         * Content Managing
         *===========================================================*/
        'clear': function(){
            this.getDom().innerHTML = '';
            return this.ref;
        },
        'add': function(){
            Utils.each(arguments, function(element){
                if(Utils.isNumber(element)) element = Utils.toString(element);
                if(!Utils.isString(element) && (!element || !element.getDom))
                    //TODO Error
                    throw 'Child has to be an Element, string or number.';

                if(Utils.isString(element))
                    element = TextElement.new(element);

                var dom = this.get('dom');
                dom.appendChild(element.getDom());

                element.set('parent', this.ref);
                this.get('children').push(element);
            }, this);

            return this.ref;
        },
        'prepend': function(){
            Utils.each(arguments, function(element){
                if(Utils.isNumber(element)) element = Utils.toString(element);
                if(!Utils.isString(element) && (!element || !element.getDom))
                    //TODO Error
                    throw 'Child has to be an Element, string or number.';

                if(Utils.isString(element))
                    element = TextElement.new(element);

                var dom = this.getDom();
                dom.insertBefore(element.getDom(), dom.firstChild);

                element.set('parent', this.ref);
                this.get('children').unshift(element);
            }, this);

            return this.ref;
        },
        'addAt': function(element, index){
            var children = this.get('children');
            if(index == children.length) return this.add(element);

            if(Utils.isNumber(element)) element = Utils.toString(element);
            if(!Utils.isString(element) && (!element || !element.getDom))
                //TODO Error
                throw 'Child has to be an Element, string or number.';

            if(Utils.isString(element))
                element = TextElement.new(element);

            var dom = this.getDom();
            dom.insertBefore(element.getDom(), children[index]);

            element.set('parent', this.ref);
            children.splice(index, 0, element);

            return this.ref;
        },
        'addAfter': function(element, targetElement){
            if(Utils.isNumber(element)) element = Utils.toString(element);
            if(!Utils.isString(element) && (!element || !element.getDom))
                //TODO Error
                throw 'Child has to be an Element, string or number.';

            if(Utils.isString(element))
                element = TextElement.new(element);

            var dom = this.getDom();
            dom.insertBefore(element.getDom(), targetElement.getDom().nextSibling);

            element.set('parent', this.ref);
            this.get('children').unshift(element);

            return this.ref;
        },
        'remove': function(element){
            //Remove element
            if(element){
                this.getDom().removeChild(element.getDom());

                element.unset('parent');
                var children = this.get('children');
                children.splice(children.indexOf(element), -1);
                return this.ref;
            }

            //Remove this from parent
            this.get('parent').remove(this);

            return this.ref;
        },

        'getParent': function(){
            return this.get('parent');
        },

        /*
         * Event Handling
         *===========================================================*/
        'on': function(action, func){
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
        },

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

/**
 * js/ui/iInput.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define('burner/ui/iInput',[],function(){
    return [
        'setDisabled',
        'setValue',
        'getValue'
    ]
});

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
 * js/./Switch.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 29.04.2016
 */

define('burner/ui/Switch',['../core/Utils', './iInput', './Element', './Icon'], function(Utils, iInput, Element, Icon){
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

        if(oldValue != this.get('value')){
            this.trigger('change');

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.trigger('change');
                        return false;
                    }
                });
                group.trigger('change');
            }
        }
    }

    return Element.extend({
        'value': false,
        'init': function(groupValue){
            this.super('button');
            this.addClass('jb-switch');
            this.handle('change');
            this.set('groupValue', groupValue);
            this.on('click', toggle.bind(this));

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
                    Element.new().addClass('jb-switch-middle').add('<b>lll</b>')//Icon.new('bars fa-rotate-90'))
                ),
                right
            );

            this.add(
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

        'setIcon': function(name){
            var icon = this.get('icon');
            if(icon)
                this.remove(icon);

            icon = Icon.new(name+ ' jb-check-icon');
            this.add(icon);
            this.set('icon', icon);
            repaint.call(this);

            return this.ref;
        },
        'setDisabled': function(value){
            if(value)
                this.setAttr('disabled', 'disabled');
            else
                this.removeAttr('disabled');

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
        }
    }).implement(iInput)
})
;
/**
 * js/./Group.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */



define('burner/ui/Group',['../core/Utils', './Element'], function(Utils, Element){
    return Element.extend({
        'init': function(vertical){
            this.super();
            this.addClass(vertical ? 'jb-v-group' : 'jb-group');
        },

        'setDisabled': function(value){
            Utils.each(this.get('children'), function(child){
                child.setDisabled(value);
            });

            return this.ref
        },
        'setTheme': function(value){
            Utils.each(this.get('children'), function(child){
                child.setTheme(value);
            });

            return this.ref
        }
    });
});

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
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
 */



define('burner/ui/Popup',['../core/Utils', './Document', './Element', './Group'], function(Utils, Document, Element, Group){
    var shownPopup;

    function targetClickedInClickMode(e){
        if(this.hasClass('jb-hidden')){
            this.show();
            this.putHideHandler(e);
        }else
            this.hide();
    }

    return Element.extend({
        'init': function(){
            this.super();
            this.addClass('jb-popup');
            this.hide();
            this.set('window', Element.new(window));
            this.on('show', this.adjustPosition);

            //Document.new().add(this);
        },

        'placed': false,
        'adjustPosition': function(){
            if(!this.get('placed')){
                var parent = this.get('target').getParent();
                if(parent.isInstanceOf(Group)) parent = parent.getParent();
                parent.add(this);
                this.set('placed', true);
            }

            /*switch(this.get('direction')){
                case 'TOP':this.addClass('jb-popup-top');break;
                case 'BOTTOM':this.addClass('jb-popup-bottom');break;
                case 'LEFT':this.addClass('jb-popup-left');break;
                case 'RIGHT':this.addClass('jb-popup-right');break;
            }*/

            var targetRect = this.get('targetDom').getBoundingClientRect();
            var targetRectTop = this.get('targetDom').offsetTop;
            var targetRectLeft = this.get('targetDom').offsetLeft;
            var thisRect = this.getDom().getBoundingClientRect();
            var top, left;

            var direction = this.get('direction');
            var align = this.get('align');

            if(direction == 'BOTTOM'){
                if(targetRect.top + targetRect.height + thisRect.height > window.innerHeight){
                    if(targetRect.top - thisRect.height >= 0){
                        direction = 'TOP';
                    }else if(targetRect.left + targetRect.width + thisRect.width <= window.innerWidth){
                        direction = 'RIGHT';

                        if(window.innerHeight - targetRect.top > thisRect.height){
                            align = 'TOP';
                        }else if(window.innerHeight - thisRect.height < 0)
                            align = 'PAGE_TOP';
                        else
                            align = 'PAGE_BOTTOM';
                    }
                }
            }

            switch(direction){
                case 'TOP':
                    top = targetRectTop - thisRect.height;
                    break;
                case 'BOTTOM':
                    top = targetRectTop + targetRect.height;
                    break;
                case 'LEFT':
                    left = targetRectLeft - thisRect.width;
                    break;
                case 'RIGHT':
                    left = targetRectLeft + targetRect.width;
                    break;
            }
            this.removeClass('jb-popup-align-top jb-popup-align-bottom jb-popup-align-left jb-popup-align-right');
            switch(align){
                case 'CENTER':
                    if(Utils.isSet(left))
                        top = targetRectTop + (targetRect.height - thisRect.height)/2;
                    else
                        left = targetRectLeft + (targetRect.width - thisRect.width)/2;
                break;
                case 'LEFT':
                    left = targetRectLeft;
                    this.addClass('jb-popup-align-left');
                    break;
                case 'RIGHT':
                    left = targetRectLeft + targetRect.width - thisRect.width;
                    this.addClass('jb-popup-align-right');
                    break;
                case 'TOP':
                    top = targetRectTop;
                    this.addClass('jb-popup-align-top');
                    break;
                case 'BOTTOM':
                    top = targetRectTop + targetRect.height - thisRect.height;
                    this.addClass('jb-popup-align-bottom');
                    break;
                case 'PAGE_TOP':
                    toap = targetRectTop - targetRect.top;
                    break;
                case 'PAGE_BOTTOM':
                    top = targetRectTop - targetRect.top + window.innerHeight - thisRect.height;
                    break;
            }

            this.setStyle({
                'top': top,
                'left': left
            });
        },
        'putHideHandler': function(e){
            this.get('window').on('click', this.hide);
            e.stopPropagation();
        },
        'removeHideHandler': function(e){
            this.get('window').off('click', this.hide);
        },

        'closeOtherPopup': function(){
            if(shownPopup && shownPopup !== this) shownPopup.hide();
            shownPopup = this;
        },

        /**
         * Directions: TOP, BOTTOM, RIGHT, LEFT
         * Aligns: CENTER, TOP, BOTTOM, RIGHT, LEFT
         */
        'direction': 'TOP',
        'align': 'CENTER',
        'setDirection': function(direction, align){
            if(Utils.isUnset(align)) align = 'CENTER';

            this.set('direction', direction);
            this.set('align', align);

            return this.ref;
        },

        'bound': false,
        //FOCUS, HOVER, CLICK, NONE
        'bind': function(element, trigger){
            //TODO Error
            if(this.get('bound')) throw 'Popup is already bound.';
            this.set('bound', true);

            if(Utils.isUnset(trigger)) trigger = 'FOCUS';

            this.set('target', element);
            this.set('targetDom', element.getDom());
            this.set('trigger', trigger);

            if(trigger == 'NONE') return this;

            switch(trigger){
                case 'FOCUS':
                    element.on('focus', this.show);
                    element.on('blur', this.hide);
                    break;
                case 'HOVER':
                    element.on('mouseover', this.show);
                    element.on('mouseout', this.hide);
                    break;
                case 'CLICK':
                    this.on('show', this.closeOtherPopup);
                    this.on('hide', function(){shownPopup = null});

                    element.on('click', targetClickedInClickMode.bind(this));

                    this.on('hide', this.removeHideHandler);
                    this.on('click', function(e){e.stopPropagation()});
                    break;
            }

            return this.ref;
        }
    });
});

/**
 * js/ui/CheckGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.05.2016
 */

define('burner/ui/CheckGroup',['../core/Utils', '../core/EventHandler', './iInput'], function(Utils, EventHandler, iInput){
    return EventHandler.extend({
        'type': 'CHECK',

        'init': function(){
            this.set('options', []);
            this.set('value', []);
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
        'setDisabled': function(value){
            Utils.each(this.get('options'), function(option){
                option.setDisabled(value);
            });
            return this.ref;
        }
    })
})
;
/**
 * js/./Input.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */



define('burner/ui/Input',['../core/Utils', './iInput', './Element'], function(Utils, iInput, Element){
    return Element.extend({
        'init': function(value){
            this.super('input');
            this.setAttr('type', 'text');
            this.addClass('jb-input');
            this.handle('change');
            this.getDom().addEventListener('change', this.trigger.bind(this, 'change'));

            if(Utils.isSet(value)) this.val(value);
        },

        'setPlaceholder': function(value){
            this.get('content')
            this.setAttr('placeholder', value);

            return this.ref;
        },

        //NORMAL, PRIMARY, DANGER, WARNING, INFO
        'setTheme': function(theme){
            this.removeClass('jb-primary jb-danger jb-warning jb-info');

            switch(theme){
                case 'PRIMARY':
                    this.addClass('jb-primary');
                    break;
                case 'SUCCESS':
                    this.addClass('jb-success');
                    break;
                case 'DANGER':
                    this.addClass('jb-danger');
                    break;
                case 'WARNING':
                    this.addClass('jb-warning');
                    break;
                case 'INFO':
                    this.addClass('jb-info');
                    break;
            }

            return this.ref;
        },

        'setValue': function(value, isDefault){
            if(isDefault)
                console.warn('Method of Input.setValue, property isDefault is deprecated');
            if(isDefault) this.setAttr('value', value);
            this.getDom().value = value;

            return this.ref;
        },
        'getValue': function(value){
            return this.getDom().value;
        },

        'defaultValue': '',
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setAttr('value', value)
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },

        'setDisabled': function(value){
            if(value)
                this.setAttr('disabled', 'disabled');
            else
                this.removeAttr('disabled');

            return this.ref;
        },
        'setRequired': function(value){
            if(value)
                this.setAttr('required', 'required');
            else
                this.removeAttr('required');

            return this.ref;
        },

        'focus': function(){
            this.getDom().focus();
            return this.ref;
        }
    }).implement(iInput);
});

/**
 * js/com/./Button.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */



define('burner/ui/Button',['../core/Utils', './Element', './Icon'], function(Utils, Element, Icon){
    return Element.extend({
        'init': function(caption){
            this.super('button');
            this.setAttr('type', 'button');

            if(!Utils.isSet(caption)) caption = '';

            var captionElement = Element.new()
            .addClass('jb-button-caption');

            this.set('captionElement', captionElement);
            this.add(captionElement);
            this.addClass('jb-button');
            this.setCaption(caption);
        },

        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption == '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        //NORMAL, PRIMARY, DANGER, WARNING, INFO, DARK
        'setTheme': function(theme){
            this.removeClass('jb-primary jb-danger jb-warning jb-info jb-dark');

            switch(theme){
                case 'PRIMARY':
                    this.addClass('jb-primary');
                    break;
                case 'SUCCESS':
                    this.addClass('jb-success');
                    break;
                case 'DANGER':
                    this.addClass('jb-danger');
                    break;
                case 'WARNING':
                    this.addClass('jb-warning');
                    break;
                case 'INFO':
                    this.addClass('jb-info');
                    break;
                case 'DARK':
                    this.addClass('jb-dark');
                    break;
            }

            return this.ref;
        },

        'setIcon': function(name){
            var iconElement = this.get('iconElement');
            if(iconElement){
                if(name == this.get('iconName')) return this.ref;
                this.remove(iconElement);
            }

            iconElement = Icon.new(name).addClass('jb-button-icon');
            this.prepend(iconElement);

            this.set('iconElement', iconElement);
            this.set('iconName', name);

            return this.ref;
        },
        'setDisabled': function(value){
            if(value)
                this.setAttr('disabled', 'disabled');
            else
                this.removeAttr('disabled');

            return this.ref;
        },

        'focus': function(){
            this.getDom().focus();

            return this.ref;
        }
    });
});

/**
 * js/./Label.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */



define('burner/ui/Label',['../core/Utils', './Element', './Icon'], function(Utils, Element, Icon){
    var uid=0;
    function genUid(){
        return 'label_' + (uid++);
    }

    return Element.extend({
        'init': function(caption){
            this.super('label');

            if(!Utils.isSet(caption))
                caption = '';

            var captionElement = Element.new()
            .addClass('jb-label-caption');

            this.set('captionElement', captionElement);
            this.addClass('jb-label');
            this.add(captionElement);
            this.setCaption(caption);
        },

        'setBold': function(value){
            if(value)
                this.addClass('jb-label-bold');
            else
                this.removeClass('jb-label-bold');

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

            if(iconElement)
                this.remove(iconElement);

            iconElement = Icon.new(name).addClass('jb-label-icon');
            this.prepend(iconElement);
            this.set('iconElement', iconElement);

            return this.ref;
        },

        'setDisabled': function(value){
            if(value){
                this.addClass('jb-label-disabled');
                return this.ref;
            }

            this.removeClass('jb-label-disabled');
            return this.ref;
        },

        //NORMAL, PRIMARY, DANGER, WARNING, INFO
        'setTheme': function(theme){
            this.removeClass('jb-primary jb-danger jb-warning jb-info');

            switch(theme){
                case 'PRIMARY':
                    this.addClass('jb-primary');
                    break;
                case 'SUCCESS':
                    this.addClass('jb-success');
                    break;
                case 'DANGER':
                    this.addClass('jb-danger');
                    break;
                case 'WARNING':
                    this.addClass('jb-warning');
                    break;
                case 'INFO':
                    this.addClass('jb-info');
                    break;
            }

            return this.ref;
        },

        'bound': false,
        'bind': function(input){
            var inputId = input.getAttr('id');
            if(Utils.isUnset(inputId)){
                inputId = genUid();
                input.setAttr('id', inputId);
            }
            this.setAttr('for', inputId);
            this.set('bound', true);
            return this.ref;
        },
        'isBound': function(){
            return this.get('bound');
        }
    });
});

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
 * js/./Spinner.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 03.05.2016
 */

define('burner/ui/Spinner',['../core/Utils', './iInput', './Input', './Button', './Group', './Element'], function(Utils, iInput, Input, Button, Group, Element){
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
    function repaint(){
        //this.get('input').getDom().value = this.get('value'); //To avoid onchange loop
        var value = this.get('value');
        var pad = this.get('pad');
        if(Utils.isSet(pad))
            value = Utils.pad(value, pad);
        this.get('input').setValue(value);
        return this.ref;
    }

    return Group.extend({
        'init': function(){
            this.super();

            var input = Input.new()
            .on('change', validate.bind(this));
            var buttonDown = Button.new()
            .setIcon('angle-down')
            .on('mousedown', waitToCount.bind(this, -1))
            .on('mouseup', abortCount.bind(this))
            .on('mouseout', abortCount.bind(this));
            var buttonUp = Button.new()
            .setIcon('angle-up')
            .on('mousedown', waitToCount.bind(this, 1))
            .on('mouseup', abortCount.bind(this))
            .on('mouseout', abortCount.bind(this));

            this.set('value', 0);
            this.set('input', input);
            this.set('buttonUp', buttonUp);
            this.set('buttonDown', buttonDown);
            this.addClass('jb-spinner');
            this.add(
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
                this.prepend(this.get('buttonDown'));
                this.add(this.get('buttonUp'));
            }else{
                this.remove(this.get('buttonDown'));
                this.remove(this.get('buttonUp'));
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
        }
    }).implement(iInput)
})
;
/**
 * js/./DatePickerPopup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 30.04.2016
 */



define('burner/ui/DatePickerPopup',['../core/Utils', './Popup', './Element', './Button', './Group', './Label'], function(Utils, Popup, Element, Button, Group, Label){
    //TODO Locale
    var DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var DAYS_2_LETTER = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var DAYS_3_LETTER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MONTHS_2_LETTER = ['Jn', 'Fb', 'Mr', 'Ap', 'My', 'Jn', 'Jl', 'Ag', 'Sp', 'Oc', 'Nv', 'Dc'];
    var MONTHS_3_LETTER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    function selectWithDay(day){
        var oldDate = this.get('selectedDate');
        var date = new Date(this.get('displayedDate'));
        date.setDate(day);

        if(oldDate.getTime() == date.getTime()){
            this.hide();
            return;
        }

        this.select(date);
        this.get('target').trigger('change');
    }

    return Popup.extend({
        'init': function(){
            this.super();

            var content = Element.new().addClass('jb-datepicker-popup-content');
            var labelYear = Label.new().addClass('jb-datepicker-popup-label-year');
            var labelMonth = Label.new().addClass('jb-datepicker-popup-label-month');
            var title = Element.new().addClass('jb-datepicker-popup-title');
            var body = Element.new();
            var buttonGoSelectedDate = Button.new('Go Selected Day')
            .setIcon('angle-left')
            .addClass('jb-pull-left')
            .on('click', this.goSelectedDay);

            this.setDirection('BOTTOM', 'LEFT');
            this.addClass('jb-datepicker-popup');
            this.add(content);
            this.set('labelYear', labelYear);
            this.set('labelMonth', labelMonth);
            this.set('body', body);
            this.set('buttonGoSelectedDate', buttonGoSelectedDate);

            this.on('show', this.goSelectedDay);

            for(var i = 0; i < 7; i++){
                title.add(
                    Element.new()
                    .addClass('jb-datepicker-popup-cell')
                    .add(
                        Element.new()
                        .addClass('jb-datepicker-popup-cell-content')
                        .add(DAYS_2_LETTER[i])
                    )
                );
            }

            content.add(
                Element.new()
                .addClass('jb-datepicker-popup-header')
                .add(
                    Group.new().addClass('jb-pull-right').add(
                        Button.new()
                        .setIcon('angle-left')
                        .on('click', this.changeMonth.bind(this, -1)),
                        labelMonth,
                        Button.new()
                        .setIcon('angle-right')
                        .on('click', this.changeMonth.bind(this, 1))
                    ),
                    Group.new().add(
                        Button.new()
                        .setIcon('angle-left')
                        .on('click', this.changeYear.bind(this, -1)),
                        labelYear,
                        Button.new()
                        .setIcon('angle-right')
                        .on('click', this.changeYear.bind(this, 1))
                    )
                ),
                title,
                body,
                Element.new()
                .addClass('jb-datepicker-popup-footer')
                .add(
                    buttonGoSelectedDate,
                    '&nbsp;',
                    Button.new('Today')
                    .setTheme('PRIMARY')
                    .on('click', this.selectToday)
                )
            );
        },

        'select': function(date){
            this.set('selectedDate', date);
            this.hide();

            //TODO Third
            this.get('target').setCaption(date.format('dd.mm.yyyy'));

            return this.ref;
        },
        'selectToday': function(){
            return this.select(new Date());
        },
        'goSelectedDay': function(){
            var displayedDate = new Date(this.get('selectedDate'));
            displayedDate.setDate(1);
            this.set('displayedDate', displayedDate);
            this.updateContent();

            return this.ref;
        },
        'changeYear': function(direction){
            var displayedDate = this.get('displayedDate');
            displayedDate.setYear(displayedDate.getFullYear() + direction);
            this.updateContent();

            return this.ref;
        },
        'changeMonth': function(direction){
            var displayedDate = this.get('displayedDate');
            displayedDate.setMonth(displayedDate.getMonth() + direction);
            this.updateContent();

            return this.ref;
        },

        'updateContent': function(){
            var displayedDate = this.get('displayedDate');
            var selectedDate = this.get('selectedDate');
            var isSelectedMonth = selectedDate.getYear() == displayedDate.getYear() && selectedDate.getMonth() == displayedDate.getMonth();
            var toDate = new Date();
            var isToMonth = toDate.getYear() == displayedDate.getYear() && toDate.getMonth() == displayedDate.getMonth();
            var body = this.get('body').clear();
            var daysNumber = new Date(displayedDate.getYear(), displayedDate.getMonth() + 1, 0).getDate();
            var firstEmptyCells = displayedDate.getDay();
            var lastEmptyCells = (7 - ((firstEmptyCells + daysNumber) % 7)) % 7;
            var hasToday = false;
            var buttonGoSelectedDate = this.get('buttonGoSelectedDate');

            this.get('labelYear').setCaption(displayedDate.getFullYear());
            this.get('labelMonth').setCaption(MONTHS_LONG[displayedDate.getMonth()]);

            for(var i = 0; i < firstEmptyCells; i++)
                body.add(
                    Element.new()
                    .addClass('jb-datepicker-popup-cell')
                    .addClass('jb-datepicker-popup-cell-empty')
                    .add('&nbsp;')
                );
            for(var i = 1; i <= daysNumber; i++){
                var button = Element.new('a')
                .setAttr('href', 'javascript:;')
                .addClass('jb-datepicker-popup-cell')
                .addClass('jb-datepicker-popup-cell-button')
                .add(i)
                .on('click', selectWithDay.bind(this, i));

                if(isToMonth && toDate.getDate() == i){
                    button.addClass('jb-datepicker-popup-cell-today');
                    hasToday = true;
                }
                if(isSelectedMonth && selectedDate.getDate() == i)
                    button.addClass('jb-selected');

                body.add(button);
            }
            for(var i = 0; i < lastEmptyCells; i++)
                body.add(
                    Element.new()
                    .addClass('jb-datepicker-popup-cell')
                    .addClass('jb-datepicker-popup-cell-empty')
                    .add('&nbsp;')
                );

            if(hasToday)
                buttonGoSelectedDate.addClass('jb-unvisible');
            else
                buttonGoSelectedDate.removeClass('jb-unvisible');

            return this.ref;
        }
    })
})
;
/**
 * js/./DatePicker.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 30.04.2016
 */

define('burner/ui/DatePicker',['../core/Utils', './Button', './DatePickerPopup', './Icon', './iInput'], function(Utils, Button, DatePickerPopup, Icon, iInput){
    return Button.extend({
        'init': function(value){
            this.super();

            var popup = DatePickerPopup.new()
            .bind(this, 'CLICK');

            if(value) popup.select(value);
            else popup.selectToday();

            this.handle('change');
            this.set('popup', popup);
            this.setIcon('calendar');
            this.add(Icon.new('caret-down jb-button-icon'));
        },

        'setValue': function(value){
            this.get('popup').select(new Date(value));
            return this.ref;
        },
        'getValue': function(value){
            return this.get('popup').get('selectedDate');
        }
    })
})
;
/**
 * js/./Check.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define('burner/ui/Check',['../core/Utils', './iInput', './Element', './Icon'], function(Utils, iInput, Element, Icon){
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

        if(oldValue != this.get('value')){
            this.trigger('change');

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.trigger('change');
                        return false;
                    }
                });
                group.trigger('change');
            }
        }
    }

    return Element.extend({
        'value': false,
        'init': function(groupValue){
            this.super('button');
            this.addClass('jb-check');
            this.setIcon('check');
            this.handle('change');
            this.set('groupValue', groupValue);
            this.on('click', toggle.bind(this));
        },

        'bind': function(group){
            this.set('group', group);
            var options = group.get('options');
            options.push(this);
            if(group.get('type') == 'RADIO'){
                this.addClass('jb-radio');
                this.setIcon('circle');
                if(options.length == 1) this.check();
            }
            return this.ref;
        },

        'setIcon': function(name){
            var icon = this.get('icon');
            if(icon)
                this.remove(icon);

            icon = Icon.new(name+ ' jb-check-icon');
            this.add(icon);
            this.set('icon', icon);
            repaint.call(this);

            return this.ref;
        },
        'setDisabled': function(value){
            if(value)
                this.setAttr('disabled', 'disabled');
            else
                this.removeAttr('disabled');

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
        }
    }).implement(iInput)
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

/**
 * js/./TimePicker.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 04.05.2016
 */

define('burner/ui/TimePicker',['../core/Utils', './Group', './Spinner', './Label'], function(Utils, Group, Spinner, Label){
    return Group.extend({
        'init': function(){
            this.super();

            this.addClass('jb-timepicker');
            this.add(
                Label.new().setIcon('clock-o'),
                Spinner.new().setMin(0).setMax(23).setPad(2).showButtons(false),
                Label.new(':').addClass('jb-narrow'),
                Spinner.new().setMin(0).setMax(59).setPad(2).showButtons(false)
            );
        }
    })
})
;
/**
 * js/./RadioGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define('burner/ui/RadioGroup',['../core/Utils', '../core/EventHandler', './iInput'], function(Utils, EventHandler, iInput){
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
        'setDisabled': function(value){
            Utils.each(this.get('options'), function(option){
                option.setDisabled(value);
            });
            return this.ref;
        }
    }).implement(iInput);
})
;
/**
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
 */



define('burner/ui/DropdownPopup',['../core/Utils', './Popup', './Element'], function(Utils, Popup, Element){
    return Popup.extend({
        'init': function(items){
            this.super();
            var content = Element.new('ul').addClass('jb-dropdown-popup-content');

            this.setDirection('BOTTOM', 'LEFT');
            this.addClass('jb-dropdown-popup');
            this.add(content);

            var options = {}
            this.set('options', options);

            Utils.each(items, function(item){
                var itemElement;
                if(item.type && item.type == 'SEPARATOR'){
                    itemElement =  Element.new()
                    .addClass('jb-dropdown-popup-separator');

                    if(Utils.isSet(item.title))
                        itemElement.add(
                            Element.new()
                            .addClass('jb-dropdown-popup-separator-title')
                            .add(item.title)
                        );
                }else{
                    if(!this.get('defaultItem') || item.default)
                        this.set('defaultItem', item);

                    itemElement =  Element.new('a')
                    .setAttr('href', 'javascript:;')
                    .add(item.title)
                    .on('click', this.select.bind(this, item, true));


                    item.element = itemElement;

                    if(Utils.isSet(item.value))
                        options[item.value] = item;
                }

                content.add(
                    Element.new('li').add(
                        itemElement
                    )
                );
            }, this);
        },

        'selectDefault': function(){
            var defaultItem = this.get('defaultItem');
            if(defaultItem)
                this.select(defaultItem);
            return this.ref;
        },
        'select': function(item, triggerChange){
            this.hide();

            var selectedItem = this.get('selectedItem');
            if(selectedItem == item) return this.ref;
            if(selectedItem) selectedItem.element.removeClass('jb-selected');

            item.element.addClass('jb-selected');
            this.get('target').setCaption(item.title);
            this.set('selectedItem', item);

            if(triggerChange && selectedItem != item)
                this.get('target').trigger('change');
            return this.ref;
        }
    });
});

/**
 * js/./Dropbox.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.04.2016
 */

define('burner/ui/Dropdown',['../core/Utils', './iInput', './Button', './Element', './DropdownPopup', './Icon'], function(Utils, iInput, Button, Element, DropdownPopup, Icon){
    return Button.extend({
        'init': function(items){
            this.super();

            this.addClass('jb-dropdown');
            this.add(Icon.new('caret-down jb-button-icon'));

            var popup = DropdownPopup.new(items);
            popup.bind(this, 'CLICK');
            popup.selectDefault();
            this.set('popup', popup);

            this.handle('change');
        },

        'getValue': function(){
            return this.get('popup').get('selectedItem').value;
        },
        'setValue': function(value){
            var popup = this.get('popup');
            var item = popup.get('options')[value];
            if(item)
                popup.select(item);

            return this.ref;
        },
        'getTitle': function(){
            return this.get('popup').get('selectedItem').title;
        },
    }).implement(iInput);
});

