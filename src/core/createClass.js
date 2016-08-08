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
