/**
 * js/com/Element.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 12.04.2016
 */

'use strict';

define(['../core/EventHandler', '../core/Utils', './TextElement'], function(EventHandler, Utils, TextElement){
    return EventHandler.extend({
        'init': function(tag){
            if(!tag) tag = 'div';

            this.set('dom', Utils.isString(tag) ? document.createElement(tag) : tag);
            this.set('children', []);
            this.handle('show');
            this.handle('hide');
            this.on('show', function(){this.removeClass('jb-hidden')});
            this.on('hide', function(){this.addClass('jb-hidden')});
        },


        /*
         * Attribute Managing
         *===========================================================*/
        'getAttr': function(attr){
            return this.getDom().getAttribute(attr);
        },
        'setAttr':  function(attr, value){
            this.getDom().setAttribute(attr, value);
            return this.ref;
        },
        'removeAttr': function(attr){
            this.getDom().removeAttribute(attr);
            return this.ref;
        },
        'getStyle': function(key){
            var styles = this.getAttr('style');
            if(styles == null) return;

            styles = styles.split(';');
            for(var i in styles){
                if(styles[i] == '') continue;
                var style = styles[i].split(':');
                if(style[0] == key) return style[1];
            }
        },
        'setStyle': function(key, value){
            var newStyles;
            if(Utils.isSet(value)){
                newStyles = {}
                newStyles[key] = value;
            }else if(Utils.isObject(key))
                newStyles = key;

            var oldStyles = this.getAttr('style');
            var styles = {}
            if(oldStyles != null){
                oldStyles = oldStyles.split(';');
                for(var i in oldStyles){
                    if(oldStyles[i] == '') continue;
                    var style = oldStyles[i].split(':');
                    styles[style[0]] = style[1];
                }
            }

            Utils.extend(styles, newStyles);

            var stylesAttr = '';
            for(var i in styles){
                if(Utils.isNumber(styles[i])) styles[i] += 'px';
                stylesAttr += i + ':' + styles[i] + ';';
            }

            this.setAttr('style', stylesAttr);

            return this.ref;
        },
        'addClass': function(newClasses){
            var classList = this.getDom().classList;
            newClasses = newClasses.split(' ');
            for(var i in newClasses)
                classList.add(newClasses[i]);

            return this.ref;
        },
        'removeClass': function(oldClasses){
            var classList = this.getDom().classList;
            if(classList.length == 0)
                return this.ref;

            oldClasses = oldClasses.split(' ');
            for(var i in oldClasses)
                classList.remove(oldClasses[i]);

            return this.ref;
        },
        'hasClass': function(className){
            return this.getDom().classList.contains(className);
        },
        'toggleClass': function(className){
            return this.setClass(className, !this.hasClass(className));
        },
        'setClass': function(className, value){
            if(value)
                return this.addClass(className);
            return this.removeClass(className);
        },

        /*
         * Content Managing
         *===========================================================*/
        'clear': function(){
            this.getDom().innerHTML = '';
            return this.ref;
        },
        'add': function(){
            Utils.each(arguments, function(element){
                if(Utils.isUnset(element)) return;
                if(Utils.isNumber(element)) element = Utils.toString(element);
                if(!Utils.isString(element) && (!element || !element.getDom))
                    //TODO Error
                    throw 'Child has to be an Element, string or number. (' + element + ')';

                if(Utils.isString(element))
                    element = TextElement.new(element);

                var dom = this.get('dom');
                dom.appendChild(element.getDom());

                element.set('parent', this.ref);
                this.get('children').push(element);
            }, this);

            return this.ref;
        },
        'prepend': function(){
            Utils.each(arguments, function(element){
                if(Utils.isUnset(element)) return;
                if(Utils.isNumber(element)) element = Utils.toString(element);
                if(!Utils.isString(element) && (!element || !element.getDom))
                    //TODO Error
                    throw 'Child has to be an Element, string or number. (' + element + ')';

                if(Utils.isString(element))
                    element = TextElement.new(element);

                var dom = this.getDom();
                dom.insertBefore(element.getDom(), dom.firstChild);

                element.set('parent', this.ref);
                this.get('children').unshift(element);
            }, this);

            return this.ref;
        },
        'addAt': function(element, index){
            var children = this.get('children');
            if(index == children.length) return this.add(element);

            if(Utils.isUnset(element)) return;
            if(Utils.isNumber(element)) element = Utils.toString(element);
            if(!Utils.isString(element) && (!element || !element.getDom))
                //TODO Error
                throw 'Child has to be an Element, string or number. (' + element + ')';

            if(Utils.isString(element))
                element = TextElement.new(element);

            var dom = this.getDom();
            dom.insertBefore(element.getDom(), children[index]);

            element.set('parent', this.ref);
            children.splice(index, 0, element);

            return this.ref;
        },
        'addAfter': function(element, targetElement){
            if(Utils.isUnset(element)) return;
            if(Utils.isNumber(element)) element = Utils.toString(element);
            if(!Utils.isString(element) && (!element || !element.getDom))
                //TODO Error
                throw 'Child has to be an Element, string or number. (' + element + ')';

            if(Utils.isString(element))
                element = TextElement.new(element);

            var dom = this.getDom();
            dom.insertBefore(element.getDom(), targetElement.getDom().nextSibling);

            element.set('parent', this.ref);
            this.get('children').unshift(element);

            return this.ref;
        },
        'remove': function(element){
            //Remove element
            if(element){
                this.getDom().removeChild(element.getDom());

                element.unset('parent');
                var children = this.get('children');
                children.splice(children.indexOf(element), -1);
                return this.ref;
            }

            //Remove this from parent
            var parent = this.get('parent');
            if(parent) parent.remove(this);

            return this.ref;
        },

        'getParent': function(){
            return this.get('parent');
        },
        'getChildren': function(){
            return this.get('children');
        },
        'getChildAt': function(index){
            return this.getChildren()[index];
        },

        /*
         * Event Handling
         *===========================================================*/
        /*'on': function(action, func){
            try{
                this.super.on(action, func);
            }catch(e){
                if(e[0] == 'NO_ACTION')
                    this.getDom().addEventListener(action, func);
                else
                    throw e;
            }

            return this.ref;
        },
        'off': function(action, func){
            try{
                this.super.off(action, func);
            }catch(e){
                if(e[0] == 'NO_ACTION')
                    this.getDom().removeEventListener(action, func);
                else
                    throw e;
            }
            return this.ref;
        },
        'trigger': function(action, event){
            try{
                this.super.trigger(action, event);
            }catch(e){
                if(e[0] == 'NO_ACTION')
                    this.getDom().dispatchEvent(new Event(action));
                else
                    throw e;
            }
            return this.ref;
        },*/

        /*
         * Ready-to-use handled events
         *===========================================================*/
        'hide': function(){
            if(this.hasClass('jb-hidden'))
                return this.ref;

            return this.trigger('hide');
        },
        'show': function(){
            if(!this.hasClass('jb-hidden'))
                return this.ref;

            return this.trigger('show');
        },
        'isShown': function(){
            return !this.hasClass('jb-hidden');
        },

        /*'animate': function(property, value, unit, duration){
            var clock = this.get('animationClock');
            if(Utils.isSet(clock)) clearInterval(clock);

            if(!unit) unit = 'px';
            if(!duration) duration = 200;
            var FRAME_RATE = 50;
            var frameNumber = Math.round(FRAME_RATE/1000*duration);
            var frameDuration = Math.round(1000/FRAME_RATE);
            var currentFrame = 0;

            [>var rect = this.getDom().getBoundingClientRect();
              var diff = value - rect[property];<]
            var from = Utils.toFloat(this.style(property));
            var diff = value - from;
            var clock = setInterval((function(){
                currentFrame++;
                var rate = currentFrame / frameNumber;
                this.style(property, (from - diff * rate * (rate - 2)) + unit);
                if(currentFrame == frameNumber){
                    clearInterval(clock);
                    this.set('animationClock', null);
                }
            }).bind(this), frameDuration);
            this.set('animationClock', clock);

            return this.ref;
        },*/

        /*
         * Dom returner
         *===========================================================*/
        'getDom': function(){
            return this.get('dom');
        }
    });
});
