/**
 * js/./Dropbox.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.04.2016
 */

define([
    '../core/Utils',
    './Button', './Element', './Icon', './List', './Popup',
    './interfaces/iInput'
], function(
    Utils,
    Button, Element, Icon, List, Popup,
    iInput
){
    function change(e){
        this.trigger('change', e);
    }
    function listSelectedInternally(){
        this.setCaption(this.getTitle());
        this.get('popup').hide();
    }

    return Button.extend({
        'init': function(items){
            this.super();
            this.addClass('jb-dropdown');
            this.handle('change');

            this.getComponent().add(Icon.new('caret-down jb-button-icon'));

            var list = List.new(items)
                .addClass('jb-dropdown-list')
                .on('selectedInternally', listSelectedInternally.bind(this))
                .on('change', change.bind(this))
            this.set('list', list);

            var popup = Popup.new(list)
                .bind(this, 'CLICK')
                .setDirection('BOTTOM', 'RIGHT');
            this.set('popup', popup);

            this.setCaption(list.getTitle());
        },

        'getValue': function(){
            return this.get('list').getValue();
        },
        'getTitle': function(){
            return this.get('list').getTitle();
        },
        'setValue': function(value){
            this.get('list').setValue(value);
            return this.ref;
        },
        'setDefaultValue': function(value){
            this.get('list').setDefaultValue(value);
            return this.ref;
        },
        'resetValue': function(){
            this.get('list').resetValue();
            return this.ref;
        }
    }).implement(iInput);
})
