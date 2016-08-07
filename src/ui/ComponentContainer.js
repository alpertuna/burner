/*
 * src/ui/ComponentContainer.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 02.08.2016
 */

'use strict';

define([
    './Element'
], function(
    Element
){
    return Element.extend({
        'init': function(component){
            this.super();
            this.addClass('jb-com-container');
            this.add(component);
            this.set('component', component);

            var message = Element.new().addClass('jb-com-message').hide();
            this.add(message);
            this.set('message', message);
        },

        'getComponent': function(){
            return this.get('component');
        },

        'setBlock': function(value){
            this.setClass('jb-com-container-block', value);
            return this.ref;
        },

        'setMessage': function(text, theme){
            var message = this.get('message')
                .clear()
                .add(text)
                .removeClass('jb-text-primary jb-text-success jb-text-danger jb-text-warning jb-text-info')
                .show();

            switch(theme){
                case 'PRIMARY':
                    message.addClass('jb-text-primary');
                    break;
                case 'SUCCESS':
                    message.addClass('jb-text-success');
                    break;
                case 'DANGER':
                    message.addClass('jb-text-danger');
                    break;
                case 'WARNING':
                    message.addClass('jb-text-warning');
                    break;
                case 'INFO':
                    message.addClass('jb-text-info');
                    break;
            }

            return this.ref;
        },
        'clearMessage': function(){
            this.get('message').hide();
        }
    })
})
