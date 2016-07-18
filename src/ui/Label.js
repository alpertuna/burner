/**
 * js/./Label.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */

'use strict';

define([
    '../core/Utils', './Element', './Icon',
    './Spinner', './Input', './Button', './Check', './Switch'
], function(
    Utils, Element, Icon,
    Spinner, Input, Button, Check, Switch
){
    var uid=0;
    function genUid(){
        return 'label_' + (uid++);
    }

    return Element.extend({
        'init': function(caption){
            this.super('label');

            if(!Utils.isSet(caption))
                caption = '';

            var captionElement = Element.new()
            .addClass('jb-label-caption');

            this.set('captionElement', captionElement);
            this.addClass('jb-label');
            this.add(captionElement);
            this.setCaption(caption);
        },

        'setBold': function(value){
            if(value)
                this.addClass('jb-label-bold');
            else
                this.removeClass('jb-label-bold');

            return this.ref
        },

        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption === '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        'setIcon': function(name){
            var iconElement = this.get('iconElement');

            if(iconElement)
                this.remove(iconElement);

            iconElement = Icon.new(name).addClass('jb-label-icon');
            this.prepend(iconElement);
            this.set('iconElement', iconElement);

            return this.ref;
        },

        'setDisabled': function(value){
            if(value){
                this.addClass('jb-label-disabled');
                return this.ref;
            }

            this.removeClass('jb-label-disabled');
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

        'bound': false,
        'bind': function(input){
            if(input.isInstanceOf(Spinner)){
                input = input.get('input');
            }else if(
                !input.isInstanceOf(Button) &&
                !input.isInstanceOf(Switch) &&
                !input.isInstanceOf(Check) &&
                !input.isInstanceOf(Input)
            )
                return this.ref;

            var inputId = input.getAttr('id');
            if(Utils.isUnset(inputId)){
                inputId = genUid();
                input.setAttr('id', inputId);
            }
            this.setAttr('for', inputId);
            this.set('bound', true);
            return this.ref;
        },
        'isBound': function(){
            return this.get('bound');
        }
    });
});
