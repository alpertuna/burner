/**
 * js/./Dropbox.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.04.2016
 */

define([
    '../core/Utils',
    './Button', './DropdownPopup', './Element', './Icon',
    './interfaces/iInput'
], function(
    Utils,
    Button, DropdownPopup, Element, Icon,
    iInput
){
    return Button.extend({
        'init': function(items){
            this.super();
            this.addClass('jb-dropdown');
            this.handle('change');

            this.getComponent().add(Icon.new('caret-down jb-button-icon'));

            var popup = DropdownPopup.new(items);
            popup.bind(this, 'CLICK');
            popup.selectDefault();
            this.set('popup', popup);
        },

        'getValue': function(){
            return this.get('popup').get('selectedItem').value;
        },
        'setValue': function(value){
            var popup = this.get('popup');
            var item = popup.get('options')[value];
            if(item)
                popup.select(item);

            return this.ref;
        },
        'getTitle': function(){
            return this.get('popup').get('selectedItem').title;
        }
    })//.implement(iInput);
});
