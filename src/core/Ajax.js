/**
 * js/core/Ajax.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.06.2016
 */

'use strict';

define([
    './Utils', './EventHandler'
], function(
    Utils, EventHandler
){
    function readyStateChange(){
        var xhttp = this.get('xhttp');
        if(xhttp.readyState == 4){
            //"always" closes connection and "success" may open new connection, so to prevent excessing maxConnection, always is at top of other triggers
            this.emit('always', xhttp.responseText);

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
                        this.emit('success', json);
                }
            }else fail = true;

            if(fail)
                this.emit('fail', xhttp.responseText);
        }
    }

    function parse(key, value, result){
        if(Utils.isArray(value)){
            key += '[]';
            for(var i in value)
                parse(key, value[i], result);
        }else if(Utils.isObject(value)){
            for(var i in value)
                parse(key + '[' + i + ']', value[i], result);
        }else
            result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }

    function toParam(object){
        var result = [];

        for(var key in object){
            var value = object[key];
            parse(key, value, result)
        }

        return result.join('&');
    }

    return EventHandler.extend({
        'connectionIsOpen': false,
        'init': function(url){
            this.handle('send');
            this.handle('success');
            this.handle('fail');
            this.handle('always');
            this.handle('maxConnection');

            this.on('send', this.set.bind(this, 'connectionIsOpen', true));
            this.on('always', this.set.bind(this, 'connectionIsOpen', false));

            //TODO debug tool
            this.on('fail', function(c){
                console.warn('Response for ajax has fail: "' + c + '"');
            });
            //TODO debug tool
            this.on('maxConnection', function(c){
                console.warn('Reached max connection.');
            });

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
        'method': 'POST',
        'setMethod': function(method){
            this.set('method', method);
            return this.ref;
        },
        'setUrl': function(url){
            this.set('url', url);
            return this.ref;
        },
        'send': function(object){
            if(this.get('connectionIsOpen')){
                console.warn('Last connection hasn\'t closed yet.');

                return this.ref;
            }

            var ajaxGroup = this.get('ajaxGroup');
            if(ajaxGroup){
                if(!ajaxGroup.hasRoom()){
                    this.emit('maxConnection');
                    ajaxGroup.emit('maxConnection');
                    return this.ref;
                }
                ajaxGroup.emit('openedConnection');
            }

            var xhttp = this.get('xhttp');
            var params = toParam(object);
            var method = this.get('method');
            var url = this.get('url');
            if(method == 'GET') url += '?' + params;
            xhttp.open(method, url, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.onreadystatechange = readyStateChange.bind(this);
            if(!object || method == 'GET') xhttp.send();
            else xhttp.send(params);

            this.emit('send');

            return this.ref;
        },

        'bound': false,
        'bind': function(ajaxGroup){
            if(this.get('bound')){
                //TODO error
                throw 'This ajax instance is already bound a group.';
                return this.ref;
            }

            this.set('bound', true);
            this.set('ajaxGroup', ajaxGroup);
            this.on('always', ajaxGroup.emit.bind(ajaxGroup, 'closedConnection'));
            return this.ref;
        }
    })
})
