/**
 * js/com/./Button.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */

'use strict';

define(['../core/Utils', './Element', './Icon'], function(Utils, Element, Icon){
    return Element.extend({
        'init': function(caption){
            this.super('button');
            this.setAttr('type', 'button');

            if(!Utils.isSet(caption)) caption = '';

            var captionElement = Element.new()
            .addClass('jb-button-caption');

            this.set('captionElement', captionElement);
            this.add(captionElement);
            this.addClass('jb-button');
            this.setCaption(caption);
        },

        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption == '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        //NORMAL, PRIMARY, DANGER, WARNING, INFO, DARK
        'setTheme': function(theme){
            this.removeClass('jb-primary jb-danger jb-warning jb-info jb-dark');

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
                case 'DARK':
                    this.addClass('jb-dark');
                    break;
            }

            return this.ref;
        },

        'setIcon': function(name){
            var iconElement = this.get('iconElement');
            if(iconElement){
                if(name == this.get('iconName')) return this.ref;
                this.remove(iconElement);
            }

            iconElement = Icon.new(name).addClass('jb-button-icon');
            this.prepend(iconElement);

            this.set('iconElement', iconElement);
            this.set('iconName', name);

            return this.ref;
        },
        'setDisabled': function(value){
            if(value)
                this.setAttr('disabled', 'disabled');
            else
                this.removeAttr('disabled');

            return this.ref;
        }
    });
});
