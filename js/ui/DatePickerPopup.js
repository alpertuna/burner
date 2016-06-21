/**
 * js/./DatePickerPopup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 30.04.2016
 */

'use strict';

define(['../core/Utils', './Popup', './Element', './Button', './Group', './Label'], function(Utils, Popup, Element, Button, Group, Label){
    //TODO Locale
    var DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var DAYS_2_LETTER = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var DAYS_3_LETTER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MONTHS_2_LETTER = ['Jn', 'Fb', 'Mr', 'Ap', 'My', 'Jn', 'Jl', 'Ag', 'Sp', 'Oc', 'Nv', 'Dc'];
    var MONTHS_3_LETTER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    function selectWithDay(day){
        var oldDate = this.get('selectedDate');
        var date = new Date(this.get('displayedDate'));
        date.setDate(day);

        if(oldDate.getTime() == date.getTime()){
            this.hide();
            return;
        }

        this.select(date);
        this.get('target').trigger('change');
    }

    return Popup.extend({
        'init': function(){
            this.super();

            var content = Element.new().addClass('jb-datepicker-popup-content');
            var labelYear = Label.new().addClass('jb-datepicker-popup-label-year');
            var labelMonth = Label.new().addClass('jb-datepicker-popup-label-month');
            var title = Element.new().addClass('jb-datepicker-popup-title');
            var body = Element.new();
            var buttonGoSelectedDate = Button.new('Go Selected Day')
            .setIcon('angle-left')
            .addClass('jb-pull-left')
            .on('click', this.goSelectedDay);

            this.setDirection('BOTTOM', 'LEFT');
            this.addClass('jb-datepicker-popup');
            this.add(content);
            this.set('labelYear', labelYear);
            this.set('labelMonth', labelMonth);
            this.set('body', body);
            this.set('buttonGoSelectedDate', buttonGoSelectedDate);

            this.on('show', this.goSelectedDay);

            for(var i = 0; i < 7; i++){
                title.add(
                    Element.new()
                    .addClass('jb-datepicker-popup-cell')
                    .add(
                        Element.new()
                        .addClass('jb-datepicker-popup-cell-content')
                        .add(DAYS_2_LETTER[i])
                    )
                );
            }

            content.add(
                Element.new()
                .addClass('jb-datepicker-popup-header')
                .add(
                    Group.new().addClass('jb-pull-right').add(
                        Button.new()
                        .setIcon('angle-left')
                        .on('click', this.changeMonth.bind(this, -1)),
                        labelMonth,
                        Button.new()
                        .setIcon('angle-right')
                        .on('click', this.changeMonth.bind(this, 1))
                    ),
                    Group.new().add(
                        Button.new()
                        .setIcon('angle-left')
                        .on('click', this.changeYear.bind(this, -1)),
                        labelYear,
                        Button.new()
                        .setIcon('angle-right')
                        .on('click', this.changeYear.bind(this, 1))
                    )
                ),
                title,
                body,
                Element.new()
                .addClass('jb-datepicker-popup-footer')
                .add(
                    buttonGoSelectedDate,
                    '&nbsp;',
                    Button.new('Today')
                    .setTheme('PRIMARY')
                    .on('click', this.selectToday)
                )
            );
        },

        'select': function(date){
            this.set('selectedDate', date);
            this.hide();

            //TODO Third
            this.get('target').setCaption(date.format('dd.mm.yyyy'));

            return this.ref;
        },
        'selectToday': function(){
            return this.select(new Date());
        },
        'goSelectedDay': function(){
            var displayedDate = new Date(this.get('selectedDate'));
            displayedDate.setDate(1);
            this.set('displayedDate', displayedDate);
            this.updateContent();

            return this.ref;
        },
        'changeYear': function(direction){
            var displayedDate = this.get('displayedDate');
            displayedDate.setYear(displayedDate.getFullYear() + direction);
            this.updateContent();

            return this.ref;
        },
        'changeMonth': function(direction){
            var displayedDate = this.get('displayedDate');
            displayedDate.setMonth(displayedDate.getMonth() + direction);
            this.updateContent();

            return this.ref;
        },

        'updateContent': function(){
            var displayedDate = this.get('displayedDate');
            var selectedDate = this.get('selectedDate');
            var isSelectedMonth = selectedDate.getYear() == displayedDate.getYear() && selectedDate.getMonth() == displayedDate.getMonth();
            var toDate = new Date();
            var isToMonth = toDate.getYear() == displayedDate.getYear() && toDate.getMonth() == displayedDate.getMonth();
            var body = this.get('body').clear();
            var daysNumber = new Date(displayedDate.getYear(), displayedDate.getMonth() + 1, 0).getDate();
            var firstEmptyCells = displayedDate.getDay();
            var lastEmptyCells = (7 - ((firstEmptyCells + daysNumber) % 7)) % 7;
            var hasToday = false;
            var buttonGoSelectedDate = this.get('buttonGoSelectedDate');

            this.get('labelYear').setCaption(displayedDate.getFullYear());
            this.get('labelMonth').setCaption(MONTHS_LONG[displayedDate.getMonth()]);

            for(var i = 0; i < firstEmptyCells; i++)
                body.add(
                    Element.new()
                    .addClass('jb-datepicker-popup-cell')
                    .addClass('jb-datepicker-popup-cell-empty')
                    .add('&nbsp;')
                );
            for(var i = 1; i <= daysNumber; i++){
                var button = Element.new('a')
                .setAttr('href', 'javascript:;')
                .addClass('jb-datepicker-popup-cell')
                .addClass('jb-datepicker-popup-cell-button')
                .add(i)
                .on('click', selectWithDay.bind(this, i));

                if(isToMonth && toDate.getDate() == i){
                    button.addClass('jb-datepicker-popup-cell-today');
                    hasToday = true;
                }
                if(isSelectedMonth && selectedDate.getDate() == i)
                    button.addClass('jb-selected');

                body.add(button);
            }
            for(var i = 0; i < lastEmptyCells; i++)
                body.add(
                    Element.new()
                    .addClass('jb-datepicker-popup-cell')
                    .addClass('jb-datepicker-popup-cell-empty')
                    .add('&nbsp;')
                );

            if(hasToday)
                buttonGoSelectedDate.addClass('jb-unvisible');
            else
                buttonGoSelectedDate.removeClass('jb-unvisible');

            return this.ref;
        }
    })
})
