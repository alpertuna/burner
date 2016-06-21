/**
 * js/./TimePicker.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 04.05.2016
 */

define(['../core/Utils', './Group', './Spinner', './Label'], function(Utils, Group, Spinner, Label){
    return Group.extend({
        'init': function(){
            this.super();

            this.addClass('jb-timepicker');
            this.add(
                Label.new().setIcon('clock-o'),
                Spinner.new().setMin(0).setMax(23).setPad(2).showButtons(false),
                Label.new(':').addClass('jb-narrow'),
                Spinner.new().setMin(0).setMax(59).setPad(2).showButtons(false)
            );
        }
    })
})
