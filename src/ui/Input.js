/**
 * js/./Input.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */

'use strict';

define(['../core/Utils', './iInput', './Element'], function(Utils, iInput, Element){
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
