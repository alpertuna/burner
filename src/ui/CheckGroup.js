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
