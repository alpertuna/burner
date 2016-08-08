/*
 * src/core/EventHandler.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 07.08.2016
 */

define(['./createClass'], function(createClass){
    /**
     * EventHandler class.
     * @class core/EventHandler
     */
    return createClass(/** @lends core/EventHandler# */{
        /*
         * Event Handling
         *===========================================================*/
        /**
         * Make action ready to use with .on() method.
         * @param {string} action - Action name.
         * @return Instance reference.
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
         * @return Instance reference.
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
         * @return Instance reference.
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
         * @return Instance reference.
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
