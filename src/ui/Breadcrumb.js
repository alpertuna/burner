/**
 * src/ui/Breadcrumb.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.06.2016
 */

'use strict';

define(['./Group'], function(Group){
    return Group.extend({
        'init': function(mod){
            this.super(mod);

            this.addClass('jb-breadcrumb')
        }
    })
})
