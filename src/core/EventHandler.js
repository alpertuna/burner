/**
 * js/core/EventHandler.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 12.05.2016
 */

define(['./createClass'], function(createClass){
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
