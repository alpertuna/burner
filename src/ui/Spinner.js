/**
 * js/./Spinner.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 03.05.2016
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
        triggerChange.call(this);
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
    function triggerChange(){
        this.trigger('change', {
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

    return ComponentContainer.extend({
        'init': function(){
            var group = Group.new();
            this.super(group);
            this.handle('change');

            var input = Input.new()
                .on('change', validate.bind(this))
                .on('change', triggerChange.bind(this));
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

        'buttonsAreShown': true,
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

        'setMax': function(value){
            if(value === null) this.set('loop', false);
            this.set('max', value);
            validate.call(this);
            return this.ref;
        },
        'min': 0,
        'setMin': function(value){
            if(value === null) this.set('loop', false);
            this.set('min', value);
            validate.call(this);
            return this.ref;
        },
        'loop': false,
        'setLoop': function(value){
            return this.set('loop', Utils.isSet(this.get('max'), this.get('min')) ? value : false);
        },
        'setPad': function(value){
            if(value === false)
                this.unset('pad');
            else
                this.set('pad', value);
            repaint.call(this);
            return this.ref;
        },

        'getValue': function(){
            return this.get('value');
        },
        'setValue': function(value){
            this.get('input').setValue(value);
            validate.call(this);
            return this.ref;
        },

        //TODO have to check
        'defaultValue': 0,
        'setDefaultValue': function(value){
            this.setValue(value);
            this.set('defaultValue', this.getValue());
            return this.ref;
        },
        'resetValue': function(){
            return this.setValue(this.get('defaultValue'));
        },
        'focus': function(){
            return this.get('input').focus();
        },

        'setTheme': function(theme){
            this.getComponent().setTheme(theme);
        },
        'setDisabled': function(value){
            this.getComponent().setDisabled(value);
        }
    }).implement(iComponent, iInput)
})
