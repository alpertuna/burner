/**
 * src/core/createClass.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 16.04.2016
 */

'use strict';

define(['./Utils'], function(Utils){
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
