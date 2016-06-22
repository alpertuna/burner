/**
 * js/core/AjaxGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 15.06.2016
 */

'use strict';

define(['./EventHandler'], function(EventHandler){
    function onOpenedConnection(){
        if(this.get('connections') == 0)
            this.trigger('openedfirstconnection');
        this.inc('connections');
    }
    function onClosedConnection(){
        this.inc('connections', -1);
        if(this.get('connections') == 0)
            this.trigger('closedlastconnection');
    }

    return EventHandler.extend({
        'connections': 0,
        'maxConnection': 0,

        'init': function(){
            this.handle('openedconnection');
            this.handle('closedconnection');
            this.handle('openedfirstconnection');
            this.handle('closedlastconnection');
            this.handle('maxconnection');
            this.on('openedconnection', onOpenedConnection.bind(this));
            this.on('closedconnection', onClosedConnection.bind(this));
        },

        'setMaxConnection': function(value){
            this.set('maxConnection', value);
            return this.ref;
        },

        'hasRoom': function(){
            var maxConnection = this.get('maxConnection');
            if(maxConnection == 0) return true;
            return this.get('connections') < maxConnection;
        }
    })
})
