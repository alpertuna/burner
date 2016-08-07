/**
 * js/core/AjaxGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 15.06.2016
 */

'use strict';

define(['./EventHandler'], function(EventHandler){
    function onOpenedConnection(){
        if(this.get('connections') == 0)
            this.emit('openedFirstConnection');
        this.inc('connections');
        this.emit('change');
    }
    function onClosedConnection(){
        this.inc('connections', -1);
        if(this.get('connections') == 0)
            this.emit('closedLastConnection');
        this.emit('change');
    }

    return EventHandler.extend({
        'connections': 0,
        'maxConnection': 0,

        'init': function(){
            this.handle('change');
            this.handle('openedConnection');
            this.handle('closedConnection');
            this.handle('openedFirstConnection');
            this.handle('closedLastConnection');
            this.handle('maxConnection');
            this.on('openedConnection', onOpenedConnection.bind(this));
            this.on('closedConnection', onClosedConnection.bind(this));
        },

        'setMaxConnection': function(value){
            this.set('maxConnection', value);
            return this.ref;
        },

        'hasRoom': function(){
            var maxConnection = this.get('maxConnection');
            if(maxConnection == 0) return true;
            return this.countConnections() < maxConnection;
        },
        'countConnections': function(){
            return this.get('connections');
        }
    })
})
