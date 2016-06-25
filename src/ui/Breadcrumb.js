/**
 * src/ui/Breadcrumb.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 25.06.2016
 */

'use strict';

define(['./Group'], function(Group){
    return Group.extend({
        'init': function(){
            this.super();
            this.addClass('jb-breadcrumb')
        },

        'setSpace': function(value){
            if(value)
                this.removeClass('jb-group');
            else
                this.addClass('jb-group');

            return this.ref;
        }
    })
})
