/**
 * js/./Check.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define(['../core/Utils', './iInput', './Element', './Icon'], function(Utils, iInput, Element, Icon){
    function repaint(){
        var icon = this.get('icon');
        if(this.getValue())
            icon.removeClass('jb-unvisible');
        else
            icon.addClass('jb-unvisible');
    }
    function toggle(){
        var oldValue = this.get('value');
        var group = this.get('group');
        var isRadioGroup = group && group.get('type') == 'RADIO';
        if(isRadioGroup)
            var oldGroupValue = group.getValue();

        this.toggle();

        if(oldValue != this.get('value')){
            this.trigger('change');

            if(group){
                if(isRadioGroup) Utils.each(group.get('options'), function(option){
                    if(option.get('groupValue') == oldGroupValue){
                        option.trigger('change');
                        return false;
                    }
                });
                group.trigger('change');
            }
        }
    }

    return Element.extend({
        'value': false,
        'init': function(groupValue){
            this.super('button');
            this.addClass('jb-check');
            this.setIcon('check');
            this.handle('change');
            this.set('groupValue', groupValue);
            this.on('click', toggle.bind(this));
        },

        'bind': function(group){
            this.set('group', group);
            var options = group.get('options');
            options.push(this);
            if(group.get('type') == 'RADIO'){
                this.addClass('jb-radio');
                this.setIcon('circle');
                if(options.length == 1) this.check();
            }
            return this.ref;
        },

        'setIcon': function(name){
            var icon = this.get('icon');
            if(icon)
                this.remove(icon);

            icon = Icon.new(name+ ' jb-check-icon');
            this.add(icon);
            this.set('icon', icon);
            repaint.call(this);

            return this.ref;
        },
        'setDisabled': function(value){
            if(value)
                this.setAttr('disabled', 'disabled');
            else
                this.removeAttr('disabled');

            return this.ref;
        },

        'setGroupValue': function(value){
            return this.set('groupValue', value);
        },
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
        'getValue': function(){
            return this.get('value');
        },
        'toggle': function(){
            return this.setValue(!this.get('value'));
        },
        'check': function(){
            return this.setValue(true);
        },
        'uncheck': function(){
            return this.setValue(false);
        }
    }).implement(iInput)
})
