/*
 * src/ui/Switch.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define([
    '../core/Utils',
    './ComponentContainer', './Element', './Icon',
    './utils/setTheme',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element, Icon,
    setTheme,
    iComponent, iInput
){
    function repaint(){
        if(this.getValue())
            this.addClass('jb-switch-checked');
        else
            this.removeClass('jb-switch-checked');
    }
    function toggle(){
        var oldValue = this.get('value');
        var group = this.get('group');
        var isRadioGroup = group && group.get('type') == 'RADIO';
        if(isRadioGroup)
            var oldGroupValue = group.getValue();

        this.toggle();

        var newValue = this.get('value');

        if(oldValue != newValue){
            this.emit('change',{
                'value': newValue
            });

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.emit('change', {'value': false});
                        return false;
                    }
                });
                group.emit('change', {
                    'value': group.getValue()
                });
            }
        }
    }

    return ComponentContainer.extend(/** @lends ui/Switch# */{
        'value': false,

        /**
         * Switch component class.
         * @constructs
         * @param {string|number} groupValue - Group value to use for CheckGroup or RadioGroup
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(groupValue){
            /**
             * Click event.
             * @event ui/Switch.ui/Switch:change
             */
            /**
             * Change event.
             * @event ui/Switch.ui/Switch:click
             * @param {boolean} value - Check state.
             */
            var component = Element.new('button');
            component.addClass('jb-check');
            this.super(component);

            this.handle('change');
            this.handle('click');
            this.on('click', toggle.bind(this));
            this.set('groupValue', groupValue);
            component.addClass('jb-switch');
            component.getDom().addEventListener('click', this.emit.bind(this, 'click'));

            var left = Element.new()
            .addClass('jb-switch-left')
            .add(Icon.new('circle-o'));
            var right = Element.new()
            .addClass('jb-switch-right')
            .add(Icon.new('check'));
            var container = Element.new()
            .addClass('jb-switch-container')
            //.setStyle('margin-left', 0) //For animation
            .add(
                left,
                Element.new().addClass('jb-switch-middle-container').add(
                    Element.new().addClass('jb-switch-middle').add(Element.new('b').add('lll'))//Icon.new('bars fa-rotate-90'))
                ),
                right
            );

            component.add(
                Element.new().addClass('jb-switch-cover').add(
                    container
                )
            );
            this.set('container', container);
        },

        //Inherited from iInput interface
        'setValue': function(value, force){
            if(!force){
                var group = this.get('group');
                if(group){
                    //Radio Group
                    if(group.get('type') == 'RADIO'){
                        if(value) group.setValue(this.get('groupValue'));
                        return this.ref;
                    }

                    //Check Group
                    var groupValues = group.getValue();
                    var groupValue = this.get('groupValue');
                    if(value) groupValues.push(this.get('groupValue'));
                    else groupValues.splice(groupValues.indexOf(groupValue), 1);
                }
            }

            this.set('value', value);
            repaint.call(this);
            return this.ref;
        },
        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },

        'defaultValue': false,
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

        //Inherited from iComponent interface
        'setDisabled': function(value){
            var component = this.getComponent();
            if(value)
                component.setAttr('disabled', 'disabled');
            else
                component.removeAttr('disabled');

            return this.ref;
        },
        //Inherited from iComponent interface
        'setTheme': setTheme,
        //Inherited from iComponent interface
        'focus': function(){
            this.getComponent().getDom().focus();
            return this.ref;
        },

        /**
         * Toggles value.
         * @return {Object} Instance reference.
         */
        'toggle': function(){
            return this.setValue(!this.get('value'));
        },
        /**
         * Sets value to true.
         * @return {Object} Instance reference.
         */
        'check': function(){
            return this.setValue(true);
        },
        /**
         * Sets value to false.
         * @return {Object} Instance reference.
         */
        'uncheck': function(){
            return this.setValue(false);
        },

        /**
         * Binds a CheckGroup or RadioGroup to work with other Checks and Switches.
         * @param {CheckGroup|RadioGroup} gruop - Group instance to bind.
         * @return {Object} Instance reference.
         */
        'bind': function(group){
            this.set('group', group);
            var options = group.get('options');
            options.push(this);
            if(group.get('type') == 'RADIO'){
                //this.addClass('jb-radio');
                //this.setIcon('circle');
                if(options.length == 1) this.check();
            }
            return this.ref;
        },

        /**
         * Sets value to represent in a group.
         * @param {string|number} value - Value to represent in a group.
         * @return {Object} Instance reference.
         */
        'setGroupValue': function(value){
            return this.set('groupValue', value);
        }
    }).implement(iComponent, iInput)
})
