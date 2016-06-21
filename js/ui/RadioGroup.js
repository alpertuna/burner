/**
 * js/./RadioGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define(['../core/Utils', '../core/EventHandler', './iInput'], function(Utils, EventHandler, iInput){
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
