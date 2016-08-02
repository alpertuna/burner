/**
 * js/./Label.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 22.04.2016
 */

'use strict';

define([
    '../core/Utils',
    './ComponentContainer', './Element', './Icon', './Spinner',
    './utils/setTheme',
    './interfaces/iComponent'
], function(
    Utils,
    ComponentContainer, Element, Icon, Spinner,
    setTheme,
    iComponent
){
    var uid=0;
    function genUid(){
        return 'label_' + (uid++);
    }

    return ComponentContainer.extend({
        'init': function(caption){
            var component = Element.new('label')
                .addClass('jb-label');
            this.super(component);


            var captionElement = Element.new()
                .addClass('jb-label-caption');
            component.add(captionElement);
            this.set('captionElement', captionElement);

            if(!Utils.isSet(caption)) caption = '';
            this.setCaption(caption);
        },

        'setBold': function(value){
            this.get('component').setClass('jb-label-bold', value);
            return this.ref
        },

        'setBoxed': function(value){
            this.get('component').setClass('jb-label-boxed', value);
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

            if(iconElement) iconElement.remove();

            iconElement = Icon.new(name).addClass('jb-label-icon');
            this.get('component').prepend(iconElement);
            this.set('iconElement', iconElement);

            return this.ref;
        },

        'setDisabled': function(value){
            var component = this.get('component');

            if(value){
                component.addClass('jb-label-disabled');
                return this.ref;
            }

            component.removeClass('jb-label-disabled');
            return this.ref;
        },

        'setTheme': setTheme,

        'boundComponent': false,
        'bind': function(component){
            if(component.isInstanceOf(Spinner)){
                component = component.get('input');
            }else if(!component.isImplementedBy(iComponent))
                //TODO Error
                throw 'Label cannot bind a non-component element.';
                //return this.ref;

            component = component.getComponent();

            var componentId = component.getAttr('id');
            if(Utils.isUnset(componentId)){
                componentId = genUid();
                component.setAttr('id', componentId);
            }
            this.getComponent().setAttr('for', componentId);
            this.set('boundComponent', component);
            return this.ref;
        },
        'getBoundComponent': function(){
            return this.get('boundComponent');
        },
        'isBound': function(){
            return this.get('boundComponent') !== false;
        },

        'focus': function(){
            if(this.isBound())
                this.getBoundComponent().focus();
            return this.ref;
        }
    }).implement(iComponent)
})
