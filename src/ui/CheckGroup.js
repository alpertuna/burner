/**
 * js/ui/CheckGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.05.2016
 */

define([
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
