/**
 * js/com/./Icon.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */

'use strict';

define(['../core/Utils', './Element'], function(Utils, Element){
    return Element.extend({
        'init': function(name){
            this.super('i');

            this.addClass('fa fa-' + name);
        }
    });
});

