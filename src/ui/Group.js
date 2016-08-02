/**
 * js/./Group.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */

'use strict';

define([
    '../core/Utils',
    './Element',
    './interfaces/iComponent'
], function(Utils, Element, iComponent){
    return Element.extend({
        'init': function(mod){
            this.super();

            var className;
            switch(mod){
                /*case 'VERTICAL':
                    className = 'jb-vertical-group';
                    break;*/
                case 'SPACED':
                    className = 'jb-spaced-group';
                    break;
                case 'BLOCK':
                    className = 'jb-group jb-group-block';
                    break;
                default:
                    className = 'jb-group';
                    break;
            }
            this.addClass(className);
        },

        'setDisabled': function(value){
            Utils.each(this.get('children'), function(child){
                child.setDisabled(value);
            });

            return this.ref;
        },
        'setTheme': function(value){
            Utils.each(this.get('children'), function(child){
                child.setTheme(value);
            });

            return this.ref;
        },
        'focus': function(){
            this.getChildAt(0).focus();
            return this.ref;
        }
    }).implement(iComponent)
});
