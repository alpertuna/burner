/**
 * js/./Switch.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 29.04.2016
 */

define(['../core/Utils', './iInput', './Element', './Icon'], function(Utils, iInput, Element, Icon){
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
            this.addClass('jb-switch');
            this.handle('change');
            this.set('groupValue', groupValue);
            this.on('click', toggle.bind(this));

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
                    Element.new().addClass('jb-switch-middle').add('<b>lll</b>')//Icon.new('bars fa-rotate-90'))
                ),
                right
            );

            this.add(
                Element.new().addClass('jb-switch-cover').add(
                    container
                )
            );
            this.set('container', container);
        },

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
