/**
 * src/ui/Tree.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 12.07.2016
 */

'use strict';

define([
    '../core/Utils',
    './Element',
    './Label',
    './Button',
    './Check',
    './Group'
], function(Utils, Element, Label, Button, Check, Group){
    function setSubItemsFromCallBack(item, items){
        item.refreshButton.setDisabled(false).setIcon('refresh');
        if(items.length){
            item.toggleCheck.setDisabled(false).show();
            item.li.removeClass('jb-tree-nochild');
            setSubItems.call(this, item.subItemContainer, items);
            toggle(item);
        }else{
            item.toggleCheck.hide();
            item.li.addClass('jb-tree-nochild');
        }
    }
    function callSubItems(item){
        item.subItemContainer.clear().hide();
        item.toggleCheck.setDisabled(true);
        item.refreshButton.setDisabled(true).setIcon('circle-o-notch fa-spin');
        item.subItemCallBack(setSubItemsFromCallBack.bind(this, item));
    }
    function toggle(item){
        if(item.callBackIsWaiting){
            item.callBackIsWaiting = false;
            item.group.add(item.refreshButton);
            item.refresh();
            return;
        }

        if(item.toggleCheck.getValue())
            item.subItemContainer.show();
        else
            item.subItemContainer.hide();
    }
    function setSubItems(container, items){
        var itemList = this.get('itemList');

        Utils.each(items, function(item){
            var group = Group.new().setSpace(true);
            item.group = group;
            var li = Element.new('li').add(
                group
            );
            item.li = li;

            if(item.subItems && item.subItems.length == 0) delete item.subItems;

            //If there are sub items
            if(item.subItems || item.subItemCallBack){
                //Sub Item Container
                var subItemContainer = Element.new('ul').hide();
                li.add(subItemContainer);
                item.subItemContainer = subItemContainer;

                //Toggle Button
                var toggleCheck = Check.new()
                .setIcon('minus')
                .on('change', toggle.bind(this, item));
                item.toggleCheck = toggleCheck;
                group.add(toggleCheck);
            }else li.addClass('jb-tree-nochild');

            //If sub items from callback
            if(item.subItemCallBack){
                item.callBackIsWaiting = true;

                //Refresh Button
                var refreshButton = Button.new()
                .setIcon('refresh')
                .on('click', callSubItems.bind(this, item));
                item.refreshButton = refreshButton;
                item.refresh = callSubItems.bind(this, item); //To refresh from outside
            }

            //If sub items from parameter
            if(item.subItems){
                item.callBackIsWaiting = false;

                setSubItems.call(this, subItemContainer, item.subItems);
            }

            //If item has id, add it to list
            if(Utils.isSet(item.id))
                itemList[item.id] = item;

            //Item
            group.add(item.element);

            container.add(li);
        }, this);
    }

    return Element.extend({
        'init': function(items){
            this.super();
            this.addClass('jb-tree');

            var content = Element.new('ul');
            this.add(content);
            this.set('content', content);

            if(items)
                this.setItems(items);
        },
        'setItems': function(items){
            this.set('itemList', {});

            var content = this.get('content').clear();
            if(items.length == 0)
                content.hide();
            else
                setSubItems.call(this, content.show(), items);

            return this.ref;
        },
        'showRootLine': function(value){
            if(value)
                this.removeClass('jb-tree-noroot');
            else
                this.addClass('jb-tree-noroot');

            return this.ref;
        },
        'refresh': function(itemId){
            this.get('itemList')[itemId].refresh();
            return this.ref;
        }
    })
})
