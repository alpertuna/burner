/*
 * src/ui/Label.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
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

    return ComponentContainer.extend(/** @lends ui/Label# */{
        /**
         * Label component class.
         * @constructs
         * @param {string} caption - Caption text of label.
         * @augments ui/ComponentContainer
         * @implements iComponent
         */
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

        //Inherited from iComponent interface
        'setDisabled': function(value){
            var component = this.get('component');

            if(value){
                component.addClass('jb-label-disabled');
                return this.ref;
            }

            component.removeClass('jb-label-disabled');
            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'focus': function(){
            if(this.isBound())
                this.getBoundComponent().focus();
            return this.ref;
        },

        /**
         * Sets bold text state.
         * @param {boolean} value - Bold state.
         * @return Instance reference.
         */
        'setBold': function(value){
            this.get('component').setClass('jb-label-bold', value);
            return this.ref
        },
        /**
         * Sets boxed state. If true, puts label in a box.
         * @param {boolean} value - Boxed state.
         * @return Instance reference.
         */
        'setBoxed': function(value){
            this.get('component').setClass('jb-label-boxed', value);
            return this.ref
        },

        /**
         * Sets caption of label.
         * @param {string} caption - Caption text of label.
         * @return Instance reference.
         */
        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption === '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        /**
         * Puts icon at the beginning of label.
         * @param {string} name - Icon name.
         * @return Instance reference.
         */
        'setIcon': function(name){
            var iconElement = this.get('iconElement');

            if(iconElement) iconElement.remove();

            iconElement = Icon.new(name).addClass('jb-label-icon');
            this.get('component').prepend(iconElement);
            this.set('iconElement', iconElement);

            return this.ref;
        },

        'boundComponent': false,
        /**
         * Binds label to a focusable component. It corresponds defining "for" attribute in html.
         * @param {iComponent} component - Component to bind.
         * @return Instance reference.
         */
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
        /**
         * Returns bound component which bound with ".bind()" method.
         * @return {iComponent} Bound component.
         * @see #bind
         */
        'getBoundComponent': function(){
            return this.get('boundComponent');
        },
        /**
         * Returns label is bound or not to a component.
         * @return {boolean} If it is bound or not.
         * @see #bind
         */
        'isBound': function(){
            return this.get('boundComponent') !== false;
        }
    }).implement(iComponent)
})
