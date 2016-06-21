/**
 * js/ui/CheckGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.05.2016
 */

define(['../core/Utils', '../core/EventHandler', './iInput'], function(Utils, EventHandler, iInput){
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
