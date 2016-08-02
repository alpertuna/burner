/**
 * js/./RadioGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define([
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
