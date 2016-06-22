/**
 * com/ui/Document.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 18.04.2016
 */

'use strict';

define(['../core/Utils', './Element'], function(Utils, Element){
    var children = [];

    return Element.extend({
        'init': function(){
            this.set('dom', document.body);
            this.set('children', children)
        }
    });
});

