/**
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
 */

'use strict';

define(['../core/Utils', './Popup', './Element'], function(Utils, Popup, Element){
    return Popup.extend({
        'init': function(items){
            this.super();
            var content = Element.new('ul').addClass('jb-dropdown-popup-content');

            this.setDirection('BOTTOM', 'RIGHT');
            this.addClass('jb-dropdown-popup');
            this.add(content);

            var firstValue; // To use in resetValue method of Dropdown
            var options = {} // To use in setValue method of Dropdown
            this.set('options', options);

            Utils.each(items, function(item){
                var itemElement;
                if(item.type && item.type == 'SEPARATOR'){
                    itemElement =  Element.new()
                    .addClass('jb-dropdown-popup-separator');

                    if(Utils.isSet(item.title))
                        itemElement.add(
                            Element.new()
                            .addClass('jb-dropdown-popup-separator-title')
                            .add(item.title)
                        );
                }else{
                    if(!this.get('defaultItem') || item.default)
                        this.set('defaultItem', item);

                    itemElement =  Element.new('a')
                        .setAttr('href', 'javascript:;')
                        .add(item.title);
                    itemElement.getDom().addEventListener('click', this.select.bind(this, item, true));


                    item.element = itemElement;

                    if(Utils.isSet(item.value)){
                        options[item.value] = item;
                        if(Utils.isUnset(firstValue)) firstValue = item.value;
                    }
                }

                content.add(
                    Element.new('li').add(
                        itemElement
                    )
                );
            }, this);

            this.set('firstValue', firstValue);
        },

        'selectDefault': function(){
            var defaultItem = this.get('defaultItem');
            if(defaultItem)
                this.select(defaultItem);
            return this.ref;
        },
        'select': function(item, triggerChange){
            this.hide();

            var selectedItem = this.get('selectedItem');
            if(selectedItem == item) return this.ref;
            if(selectedItem) selectedItem.element.removeClass('jb-selected');

            item.element.addClass('jb-selected');
            this.get('target').setCaption(item.title);
            this.set('selectedItem', item);

            if(triggerChange && selectedItem != item)
                this.get('target').trigger('change', {
                    'value': item.value,
                    'title': item.title
                });
            return this.ref;
        }
    });
});
