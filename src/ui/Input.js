/**
 * js/./Input.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */

'use strict';

define([
    '../core/Utils',
    './ComponentContainer', './Element',
    './utils/setTheme',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element,
    setTheme,
    iComponent, iInput
){
    function change(e){
        this.trigger('change',{
            value: e.target.value
        });
    }

    return ComponentContainer.extend({
        'init': function(){
            var component = Element.new('input')
                .setAttr('type', 'text')
                .addClass('jb-input');
            this.super(component);

            this.addClass('jb-com-container jb-input-container');
            this.handle('change');

            component.getDom().addEventListener('change', change.bind(this));
        },

        'setPlaceholder': function(value){
            this.get('component').setAttr('placeholder', value);
            return this.ref;
        },

        'setTheme': setTheme,

        'setDisabled': function(value){
            var component = this.getComponent();

            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },

        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        },

        'setValue': function(value){
            this.getComponent().getDom().value = value;
            return this.ref;
        },
        'getValue': function(value){
            return this.getComponent().getDom().value;
        },

        'defaultValue': '',
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },
        'setRequired': function(value){
            if(value)
                this.setAttr('required', 'required');
            else
                this.removeAttr('required');

            return this.ref;
        }
    }).implement(iComponent, iInput)
})
