/*
 * src/ui/Breadcrumb.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict';

define(['./Group'], function(Group){
    return Group.extend(/** @lends ui/Breadcrumb# */{
        /**
         * Breadcrumb component class.
         * @constructs
         * @augments ui/Group
         * @param {string} mod - Mod name to present children.
         */
        'init': function(mod){
            this.super(mod);

            this.addClass('jb-breadcrumb')
        }
    })
})
