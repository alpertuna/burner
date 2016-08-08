/*
 * src/ui/Spinner.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define([
    '../core/Utils',
    './Button', './ComponentContainer', './Element', './Group', './Input',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    Button, ComponentContainer, Element, Group, Input,
    iComponent, iInput
){
    function countFaster(direction){
        direction *= 10;
        increase.call(this, direction);
        clearTimeout(this.get('clock'));
        this.set('clock', setInterval(increase.bind(this, direction), 40));
    }
    function countFast(direction){
        increase.call(this, direction);
        clearTimeout(this.get('clock'));
        this.set('clock', setInterval(increase.bind(this, direction), 40));
        this.set('delay', setTimeout(countFaster.bind(this, direction), 2000));
    }
    function countSlow(direction){
        increase.call(this, direction);
        this.set('clock', setInterval(increase.bind(this, direction), 160));
        this.set('delay', setTimeout(countFast.bind(this, direction), 1000));
    }
    function abortCount(){
        clearTimeout(this.get('delay'));
        clearTimeout(this.get('clock'));
    }
    function waitToCount(direction){
        increase.call(this, direction);
        this.set('delay', setTimeout(countSlow.bind(this, direction), 500));
    }

    function increase(direction){
        var value = this.get('value') + direction;
        if(this.get('loop')){
            var max = this.get('max');
            var min = this.get('min');
            if(value > max) value = min;
            else if(value < min) value = max;
            this.set('value', value);
            repaint.call(this);
            return this.ref;
        }

        var input = this.get('input');
        input.setValue(value);
        validate.call(this);
        emitChange.call(this);
        return this.ref;
    }
    function validate(){
        var value = Utils.toFloat(this.get('input').getValue());
        var max = this.get('max');
        var min = this.get('min');

        if(Utils.isSet(max) && value > max){
            value = max;
            abortCount.call(this);
        }else if(Utils.isSet(min) && value < min){
            value = min;
            abortCount.call(this);
        }

        this.set('value', value);
        repaint.call(this);
        return this.ref;
    }
    function emitChange(){
        this.emit('change', {
            'value': this.getValue()
        });
    }
    function repaint(){
        //this.get('input').getDom().value = this.get('value'); //To avoid onchange loop
        var value = this.get('value');
        var pad = this.get('pad');
        if(Utils.isSet(pad))
            value = Utils.pad(value, pad);
        this.get('input').setValue(value);
        return this.ref;
    }

    return ComponentContainer.extend(/** @lends ui/Spinner# */{
        /**
         * Spinner component class.
         * @constructs
         * @augments ui/ComponentContainer
         * @implements iInput
         * @implements iComponent
         */
        'init': function(){
            /**
             * Change event.
             * @event ui/Spinner.ui/Spinner:change
             * @param {number} value - New value of spinner.
             */
            var group = Group.new();
            this.super(group);
            this.handle('change');

            var input = Input.new()
                .on('change', validate.bind(this))
                .on('change', emitChange.bind(this));
            var buttonDown = Button.new()
                .setIcon('angle-down');
            buttonDown.getDom().addEventListener('mousedown', waitToCount.bind(this, -1));
            buttonDown.getDom().addEventListener('mouseup', abortCount.bind(this));
            buttonDown.getDom().addEventListener('mouseout', abortCount.bind(this));
            var buttonUp = Button.new()
                .setIcon('angle-up');
            buttonUp.getDom().addEventListener('mousedown', waitToCount.bind(this, 1));
            buttonUp.getDom().addEventListener('mouseup', abortCount.bind(this));
            buttonUp.getDom().addEventListener('mouseout', abortCount.bind(this));

            this.set('value', 0);
            this.set('input', input);
            this.set('buttonUp', buttonUp);
            this.set('buttonDown', buttonDown);
            group.addClass('jb-spinner');
            group.add(
                buttonDown,
                input,
                buttonUp
            );
            repaint.call(this);


            //TODO have to check
            //this.setDefaultValue(0);
        },

        //Inherited from iInput interface
        'getValue': function(){
            return this.get('value');
        },
        //Inherited from iInput interface
        'setValue': function(value){
            this.get('input').setValue(value);
            validate.call(this);
            return this.ref;
        },
        //TODO have to check
        'defaultValue': 0,
        //Inherited from iInput interface
        'setDefaultValue': function(value){
            this.setValue(value);
            this.set('defaultValue', this.getValue());
            return this.ref;
        },
        //Inherited from iInput interface
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },
        //Inherited from iComponent interface
        'focus': function(){
            return this.get('input').focus();
        },
        //Inherited from iComponent interface
        'setTheme': function(theme){
            this.getComponent().setTheme(theme);
        },
        //Inherited from iComponent interface
        'setDisabled': function(value){
            this.getComponent().setDisabled(value);
        },

        'buttonsAreShown': true,
        /**
         * Sets visibility state of increase / decrease buttons.
         * @param {boolean} value - Visibility state.
         * @return {Object} Instance reference.
         */
        'showButtons': function(value){
            if(this.get('buttonsAreShown') == value) return this.ref;

            if(value){
                this.getComponent()
                    .prepend(this.get('buttonDown'))
                    .add(this.get('buttonUp'));
            }else{
                this.get('buttonDown').remove();
                this.get('buttonUp').remove();
            }

            this.set('buttonsAreShown', value);
            return this.ref;
        },

        /**
         * Sets maximum value of spinner.
         * @param {number} value - Maximum value.
         * @return {Object} Instance reference.
         */
        'setMax': function(value){
            if(value === null) this.set('loop', false);
            this.set('max', value);
            validate.call(this);
            return this.ref;
        },
        'min': 0,
        /**
         * Sets minimum value of spinner.
         * @param {number} value - Minimum value.
         * @return {Object} Instance reference.
         */
        'setMin': function(value){
            if(value === null) this.set('loop', false);
            this.set('min', value);
            validate.call(this);
            return this.ref;
        },
        'loop': false,
        /**
         * Sets loop state of spinner. If true, when it reach minimum or maximum limit, it returns other limit.
         * @param {bootlean} value - Loop state.
         * @return {Object} Instance reference.
         */
        'setLoop': function(value){
            return this.set('loop', Utils.isSet(this.get('max'), this.get('min')) ? value : false);
        },
        /**
         * Sets pad length to put zero.
         * @param {number} value - Pad length.
         * @return {Object} Instance reference.
         */
        'setPad': function(value){
            if(value === false)
                this.unset('pad');
            else
                this.set('pad', value);
            repaint.call(this);
            return this.ref;
        }
    }).implement(iComponent, iInput)
})
