/*
 * src/ui/List.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
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
    function focus(e){
        this.getComponent().addClass('jb-focus');
    }
    function blur(e){
        this.getComponent().removeClass('jb-focus');
    }
    function select(item, callTrigger){
        var selectedItem = this.get('selectedItem');
        if(selectedItem){
            if(selectedItem.value == item.value) return;
            selectedItem.button.removeClass('jb-selected');
        }

        item.button.addClass('jb-selected');
        this.set('selectedItem', item);

        if(callTrigger)
            this.emit('change', {
                'value': item.value,
                'title': item.title
            });

        this.emit('selectedInternally');
    }
    return ComponentContainer.extend(/** @lends ui/List# */{
        /**
         * List component class.
         * @constructs
         * @param {Object[]} items - Item list
         * @param {string} items[].title - Title of an item
         * @param {string|number} items[].value - Value of an item
         * @param {string} items[].type - Type of an item
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(items){
            /**
             * Change event.
             * @event ui/List.ui/List:change
             * @param {string|number} value - Selected items value.
             */
            /**
             * Event of internally selection. It fired not only when user select an item, but also when set a value.
             * @event ui/List.ui/List:selectedInternally
             */
            var component = Element.new('ul')
                .addClass('jb-list');
            this.super(component);

            this.handle('change');
            this.handle('selectedInternally');

            this.addClass('jb-list-container');
            this.setItems(items);
        },

        //Inherited from iComponent interface
        'setDisabled': function(value){
            this.getComponent().setClass('jb-disabled', value);
            Utils.each(this.get('options'), function(item){
                item.button.setAttr('disabled', value);
            });
            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'focus': function(){
            this.get('firstItem').button.emitDom('focus');
            return this.ref;
        },

        //Inherited from iInput interface
        'getValue': function(){
            return this.get('selectedItem').value;
        },
        /**
         * Returns title of selected item.
         * @return {string} Title of selected item.
         */
        'getTitle': function(){
            return this.get('selectedItem').title;
        },
        //Inherited from iInput interface
        'setValue': function(value){
            var options = this.get('options');
            if(Utils.isUnset(options[value])){
                //TODO error
                throw 'There is no option has "' + value + '" value';
                return this.ref;
            }
            select.call(this, options[value]);
            return this.ref;
        },
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.set('defaultValue', value);
            this.setValue(value);
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            this.setValue(this.get('defaultValue'));
            return this.ref;
        },

        /**
         * Sets items of list.
         * @param {Object[]} items - Item list
         * @param {string} items[].title - Title of an item
         * @param {string|number} items[].value - Value of an item
         * @param {string} items[].type - Type of an item
         * @return Instance reference.
         */
        'setItems': function(items){
            var options = {};
            this.set('options', options);

            var body = this.getComponent();
            var firstItem;
            Utils.each(items, function(item){
                if(item.type == 'SEPARATOR'){
                    var separator = Element.new('li')
                        .addClass('jb-list-separator');
                    if(Utils.isSet(item.title))
                        separator.add(
                            Element.new()
                                .addClass('jb-list-separator-title')
                                .add(item.title)
                        );
                    body.add(separator);
                    return;
                }

                body.add(
                    item.li = Element.new('li').add(
                        item.button = Element.new('button')
                            .addClass('jb-list-button')
                            .add(item.title)
                            .onDom('focus', focus.bind(this))
                            .onDom('blur', blur.bind(this))
                            .onDom('click', select.bind(this, item, true))
                    )
                );
                if(Utils.isSet(item.value))
                    if(Utils.isSet(options[item.value]))
                        //TODO error
                        throw 'Duplicate item value "' + item.value + '" with title "' + item.title + '" at List component.';
                    else
                        options[item.value] = item;
                    if(Utils.isUnset(firstItem)) firstItem = item;
            }, this);

            this.set('firstItem', firstItem);
            this.setDefaultValue(firstItem.value);

            return this.ref;
        },

        /**
         * Sets height to fix.
         * @param {string|number} Css value for height.
         * @return Instance reference.
         */
        'setHeight': function(height){
            this.getComponent().setStyle('height', height);
            return this.ref;
        }
    }).implement(iComponent, iInput)
})
