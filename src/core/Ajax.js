/**
 * js/core/Ajax.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.06.2016
 */

'use strict';

define(['./EventHandler'], function(EventHandler){
    function readyStateChange(){
        var xhttp = this.get('xhttp');
        if(xhttp.readyState == 4){
            //TODO here, if there is ajax group, there can be trigger instead of using onalways bellow
            this.trigger('always', xhttp.responseText);

            var fail = false;
            if(xhttp.status == 200){
                if(this.get('events').success.length){
                    var json;
                    try{
                        json = JSON.parse(xhttp.responseText);
                    }catch(e){
                        fail = true;
                    }
                    if(!fail)
                        this.trigger('success', json);
                }
            }else fail = true;

            if(fail)
                this.trigger('fail', xhttp.responseText);
        }
    }

    return EventHandler.extend({
        'method': 'POST',
        'init': function(url){
            this.handle('success');
            this.handle('fail');
            this.handle('always');
            this.handle('maxconnection');
            //TODO debug tool
            this.on('fail', function(c){
                console.warn('Response for ajax has fail: "' + c + '"');
            });
            //TODO debug tool
            /*this.on('maxconnection', function(c){
                console.warn('Reached max connection.');
            });*/

            var xhttp;
            if(window.XMLHttpRequest)
                xhttp = new XMLHttpRequest();
            else
                //For IE6, IE5
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            this.set('xhttp', xhttp);
            if(url)
                this.setUrl(url);
        },
        'setUrl': function(url){
            this.set('url', url);
            return this.ref;
        },
        /*'setMethod': function(method){
            this.set('method', method);
            return this.ref;
        },*/
        'send': function(object){
            var ajaxGroup = this.get('ajaxGroup');
            if(ajaxGroup){
                if(!ajaxGroup.hasRoom()){
                    this.trigger('maxconnection');
                    ajaxGroup.trigger('maxconnection');
                    //this.trigger('always'); //Always closedconnectiona bağlı olduğundan çalışmamalı
                    return this.ref;
                }
                ajaxGroup.trigger('openedconnection');
            }

            var xhttp = this.get('xhttp');
            xhttp.open(this.get('method'), this.get('url'), true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.onreadystatechange = readyStateChange.bind(this);
            if(!object) xhttp.send();
            else xhttp.send('data=' + JSON.stringify(object));
            return this.ref;
        },

        'bind': function(ajaxGroup){
            this.set('ajaxGroup', ajaxGroup);
            this.on('always', ajaxGroup.trigger.bind(ajaxGroup, 'closedconnection'));
            return this.ref;
        }
    })
})
