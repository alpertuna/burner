/**
 * js/com/ui/TextElement.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 17.04.2016
 */

'use strict';

//To avoid loop and unnecessary ElementCore class, this is Element likely class
define(['../core/createClass'], function(createClass){
    return createClass({
        'init': function(text){
            this.set('dom', document.createElement('span'));
            this.get('dom').innerHTML = text;
        },
        'getDom': function(){
            return this.get('dom');
        }
    })
})
