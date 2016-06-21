/**
 * js/./DatePicker.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 30.04.2016
 */

define(['../core/Utils', './Button', './DatePickerPopup', './Icon', './iInput'], function(Utils, Button, DatePickerPopup, Icon, iInput){
    return Button.extend({
        'init': function(value){
            this.super();

            var popup = DatePickerPopup.new()
            .bind(this, 'CLICK');

            if(value) popup.select(value);
            else popup.selectToday();

            this.handle('change');
            this.set('popup', popup);
            this.setIcon('calendar');
            this.add(Icon.new('caret-down jb-button-icon'));
        },

        'setValue': function(value){
            this.get('popup').select(new Date(value));
            return this.ref;
        },
        'getValue': function(value){
            return this.get('popup').get('selectedDate');
        }
    })
})
