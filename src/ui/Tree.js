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
        setSubItems(item.subItemContainer, items);
        item.refreshButton.setDisabled(false).setIcon('refresh');
        item.toggleCheck.setDisabled(false);

        /*if(!item.toggleCheck.getParent())
            item.group.prepend(item.toggleCheck);*/

        toggle(item);
    }
    function callSubItems(item){
        /*if(item.subItemContainer)*/
            item.subItemContainer.clear().hide();
        item.toggleCheck.setDisabled(true);//.setIcon('circle-o-notch fa-spin');
        item.refreshButton.setDisabled(true).setIcon('circle-o-notch fa-spin');
        item.subItemCallBack(setSubItemsFromCallBack.bind(this, item));
    }
    function toggle(item){
        if(item.callBackIsWaiting){
            item.callBackIsWaiting = false;
            item.toggleGroup.add(item.refreshButton);
            item.refresh();
            return;
        }

        if(item.toggleCheck.getValue()){
            item.subItemContainer.show();
        }else{
            item.subItemContainer.hide();
        }
    }
    function setSubItems(container, items){
        Utils.each(items, function(item){
            var group = Group.new().setSpace(true);
            item.group = group;
            var element = Element.new('li').add(
                group
            );

            if(item.subItems && item.subItems.length == 0) delete item.subItems;

            //If there are sub items
            if(item.subItems || item.subItemCallBack){
                //Sub Item Container
                var subItemContainer = Element.new('ul').hide();
                element.add(subItemContainer);
                item.subItemContainer = subItemContainer;

                //Toggle Button
                var toggleCheck = Check.new()
                .setIcon('minus')
                .on('change', toggle.bind(this, item));
                item.toggleCheck = toggleCheck;
            }else element.addClass('jb-tree-nochild');

            //If sub items from callback
            if(item.subItemCallBack){
                item.callBackIsWaiting = true;

                //Refresh Button
                var refreshButton = Button.new()
                .setIcon('refresh')
                .on('click', callSubItems.bind(this, item));
                item.refreshButton = refreshButton;
                item.refresh = callSubItems.bind(this, item); //To refresh from outside
                group.add(
                    item.toggleGroup = Group.new().add(
                        toggleCheck
                    )
                )
            }

            //If sub items from parameter
            if(item.subItems){
                item.callBackIsWaiting = false;

                setSubItems(subItemContainer, item.subItems);
                group.add(toggleCheck);
            }

            //Item
            group.add(item.element);

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
        }
    })
})
