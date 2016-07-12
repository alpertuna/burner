/**
 * src/ui/Tree.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 12.07.2016
 */

'use strict';

define(['../core/Utils', './Element', './Label', './Button', './Icon', './Group'], function(Utils, Element, Label, Button, Icon, Group){
    function toggle(item){
        if(item.subItemContainerIsShown){
            item.toggleButton.setIcon('plus');
            item.subItemContainer.hide();
        }else{
            item.toggleButton.setIcon('minus');
            item.subItemContainer.show();
        }
        item.subItemContainerIsShown = !item.subItemContainerIsShown;
    }
    function setSubItems(items, container){
        Utils.each(items, function(item){
            var group = Group.new();
            var element = Element.new('li').add(
                group
            );

            if(item.subItems){
                var subItemContainer = Element.new('ul').hide();
                element.add(subItemContainer);
                item.subItemContainer = subItemContainer;
                item.subItemContainerIsShown = false;

                setSubItems(item.subItems, subItemContainer);
            }
            if(item.subItems || item.subItemCallBack){
                var toggleButton = Button.new().setIcon('plus');
                toggleButton.on('click', toggle.bind(this, item));
                item.toggleButton = toggleButton;
                group.add(toggleButton);
            }

            var itemButton = Button.new(item.title);
            if(item.onClick) itemButton.on('click', onClick);
            group.add(itemButton);

            container.add(element);
        });
    }

    return Element.extend({
        'init': function(items){
            this.super();
            this.addClass('jb-tree');

            var content = Element.new('ul');
            this.add(content);
            this.set('content', content);

            this.setItems(items);
        },
        'setItems': function(items){
            setSubItems.call(this, items, this.get('content').clear());

            return this.ref;
        }
    })
})
