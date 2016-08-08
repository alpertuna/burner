/*
 * src/ui/Button.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict';

define([
    '../core/Utils',
    './ComponentContainer', './Element', './Icon',
    './utils/setTheme',
    './interfaces/iComponent'
], function(
    Utils,
    ComponentContainer, Element, Icon,
    setTheme,
    iComponent
){
    return ComponentContainer.extend(/** @lends ui/Button# */{
        /**
         * Button component class.
         * @constructs
         * @augments ui/ComponentContainer
         * @implements iComponent
         * @param {string} caption - Caption of button.
         */
        'init': function(caption){
            /**
             * Click event.
             * @event ui/Button.ui/Button:click
             */
            var component = Element.new('button')
                .setAttr('type', 'button')
                .addClass('jb-button');
            this.super(component);

            this.handle('click');
            component.getDom().addEventListener('click', this.emit.bind(this, 'click'));

            var captionElement = Element.new()
                .addClass('jb-button-caption');
            component.add(captionElement);
            this.set('captionElement', captionElement);

            if(!Utils.isSet(caption)) caption = '';
            this.setCaption(caption);
        },

        /**
         * Sets caption.
         * @param {string} caption - Caption of button.
         * @return Instance reference.
         */
        'setCaption': function(caption){
            var captionElement = this.get('captionElement').clear();
            if(caption == '') captionElement.hide();
            else captionElement.add(caption).show();

            return this.ref;
        },

        /**
         * Sets icon.
         * @param {string} name - Icon name.
         * @return Instance reference.
         */
        'setIcon': function(name){
            var component = this.getComponent();

            var iconElement = this.get('iconElement');
            if(iconElement){
                if(name == this.get('iconName')) return this.ref;
                iconElement.remove();
            }

            iconElement = Icon.new(name).addClass('jb-button-icon');
            component.prepend(iconElement);

            this.set('iconElement', iconElement);
            this.set('iconName', name);

            return this.ref;
        },

        //Inherited from iComponent interface
        'setTheme': setTheme,

        //Inherited from iComponent interface
        'setDisabled': function(value){
            if(value)
                this.getComponent().setAttr('disabled', 'disabled');
            else
                this.getComponent().removeAttr('disabled');

            return this.ref;
        },
        //Inherited from iComponent interface
        'focus': function(){
            this.getComponent().getDom().focus();

            return this.ref;
        }
    }).implement(iComponent)
})
