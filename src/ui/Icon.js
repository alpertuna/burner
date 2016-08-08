/*
 * src/ui/Icon.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict';

define(['../core/Utils', './Element'], function(Utils, Element){
    return Element.extend(/** @lends ui/Icon# */{
        /**
         * Icon component class.
         * @constructs
         * @param {string} name - Icon name
         * @augments ui/Element
         */
        'init': function(name){
            this.super('i');

            this.addClass('fa fa-' + name);
        }
    });
});

