/**
 * src/ui/List.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 06.08.2016
 */

'use strict';

define([
    '../core/Utils',
    './ComponentContainer', './Element',
    './interfaces/iComponent', './interfaces/iInput'
], function(
    Utils,
    ComponentContainer, Element,
    iComponent, iInput
){
    function focus(e){
        this.getComponent().addClass('jb-focus');
    }
    function blur(e){
        this.getComponent().removeClass('jb-focus');
    }
    function select(item){
        var selectedItem = this.get('selectedItem');
        if(selectedItem){
            if(selectedItem.value == item.value) return;
            selectedItem.a.removeClass('jb-selected');
        }

        item.a.addClass('jb-selected');
        this.set('selectedItem', item);
        this.set('value', item.value);
        this.trigger('change', {
            'value': item.value
        });
    }
    return ComponentContainer.extend({
        'init': function(items){
            var component = Element.new('ul')
                .addClass('jb-list');
            this.super(component);
            this.handle('change');
            this.addClass('jb-list-container');
            this.setItems(items);
        },
        'setItems': function(items){
            var options = {};
            this.set('options', options);

            var body = this.getComponent();
            Utils.each(items, function(item){
                body.add(
                    item.li = Element.new('li').add(
                        item.a = Element.new('a')
                            .setAttr('href', 'javascript:;')
                            .add(item.title)
                            .onDom('focus', focus.bind(this))
                            .onDom('blur', blur.bind(this))
                            .onDom('click', select.bind(this, item))
                    )
                );
                if(Utils.isSet(item.value))
                    if(Utils.isSet(options[item.value]))
                        //TODO error
                        throw 'Duplicate item value "' + item.value + '" with title "' + item.title + '" at List component.';
                    else
                        options[item.value] = item;
            }, this);
        }
    })
})
