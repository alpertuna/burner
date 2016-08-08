/*
 * src/ui/Element.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 07.08.2016
 */

'use strict';

define(['../core/EventHandler', '../core/Utils', './TextElement'], function(EventHandler, Utils, TextElement){

    return EventHandler.extend(/** @lends ui/Element# */{
        /**
         * Element component class.
         * @constructs
         * @augments core/EventHandler
         * @param {string} [tag=div] - Html dom tag name.
         */
        'init': function(tag){
            /**
             * Show event.
             * @event ui/Element.ui/Element:show
             */
            /**
             * Hide event.
             * @event ui/Element.ui/Element:hide
             */
            if(!tag) tag = 'div';

            this.set('dom', Utils.isString(tag) ? document.createElement(tag) : tag);
            this.set('children', []);
            this.handle('show');
            this.handle('hide');
            this.on('show', this.removeClass.bind(this, 'jb-hidden'));
            this.on('hide', this.addClass.bind(this, 'jb-hidden'));
        },


        /*
         * Attribute Managing
         *===========================================================*/
        /**
         * Returns attribute value.
         * @param {string} attr - Attribute name.
         * @return {string} Attribute value.
         */
        'getAttr': function(attr){
            return this.getDom().getAttribute(attr);
        },
        /**
         * Sets attribute.
         * @param {string} attr - Attribute name.
         * @param {string} value - Attribute value.
         * @return Instance reference.
         */
        'setAttr':  function(attr, value){
            if(Utils.isBoolean(value)){
                if(!value){
                    this.removeAttr(attr);
                    return this.ref;
                }
                value = attr;
            }

            this.getDom().setAttribute(attr, value);
            return this.ref;
        },
        /**
         * Removes attribute.
         * @param {string} attr - Attribute name.
         * @return Instance reference.
         */
        'removeAttr': function(attr){
            this.getDom().removeAttribute(attr);
            return this.ref;
        },
        /**
         * Returns style value.
         * @param {string} key - Style name.
         * @return {string} Style value.
         */
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
        /**
         * Sets styles.
         * @param {string|Array} key - Style key or key-value array.
         * @param {string} [value] - Style value. If first parameter is array, no need to pass arguments to value.
         * @return Instance reference.
         */
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
        /**
         * Removes style.
         * @param {string} key - Style name.
         * @return Instance reference.
         */
        'removeStyle': function(key){
            var oldStyles = this.getAttr('style');
            var styles = {}
            if(oldStyles != null){
                oldStyles = oldStyles.split(';');
                for(var i in oldStyles){
                    if(oldStyles[i] == '') continue;
                    var style = oldStyles[i].split(':');
                    if(style[0] == key) continue;
                    styles[style[0]] = style[1];
                }
            }

            var stylesAttr = '';
            for(var i in styles){
                if(Utils.isNumber(styles[i])) styles[i] += 'px';
                stylesAttr += i + ':' + styles[i] + ';';
            }

            this.setAttr('style', stylesAttr);

            return this.ref;
        },

        /**
         * Adds css classes.
         * @param {string} newClasses - Css class name or list separated with space.
         * @return Instance reference.
         */
        'addClass': function(newClasses){
            var classList = this.getDom().classList;
            newClasses = newClasses.split(' ');
            for(var i in newClasses)
                classList.add(newClasses[i]);

            return this.ref;
        },
        /**
         * Removes css classes.
         * @param {string} oldClasses - Css class name or list separated with space.
         * @return Instance reference.
         */
        'removeClass': function(oldClasses){
            var classList = this.getDom().classList;
            if(classList.length == 0)
                return this.ref;

            oldClasses = oldClasses.split(' ');
            for(var i in oldClasses)
                classList.remove(oldClasses[i]);

            return this.ref;
        },
        /**
         * Returns if element has given css class.
         * @param {string} className - Single css class name.
         * @return {boolean} If element has given class.
         */
        'hasClass': function(className){
            return this.getDom().classList.contains(className);
        },
        /**
         * Toggles css class.
         * @param {string} className - Single css class name.
         * @return Instance reference.
         */
        'toggleClass': function(className){
            return this.setClass(className, !this.hasClass(className));
        },
        /**
         * Adds or removes classname according to second parameter.
         * @param {string} className - Css class name.
         * @param {boolean} value - If true, css class will be added, otherwise removed.
         * @return Instance reference.
         */
        'setClass': function(className, value){
            if(value)
                return this.addClass(className);
            return this.removeClass(className);
        },

        /*
         * Content Managing
         *===========================================================*/
        /**
         * Clears content of element.
         * @return Instance reference.
         */
        'clear': function(){
            this.getDom().innerHTML = '';
            return this.ref;
        },
        /**
         * Adds given element as a child to a specified position.
         * @param {ui/Element} element - Child element.
         * @param {number} index - Position index.
         * @return Instance reference.
         */
        'addAt': function(element, index){
            var children = this.get('children');

            if(Utils.isUnset(element)) return;
            if(Utils.isNumber(element)) element = Utils.toString(element);
            if(!Utils.isString(element) && !element.getDom)
                //TODO Error
                throw 'Child has to be an Element, string or number. (' + element + ')';

            if(Utils.isString(element))
                element = TextElement.new(element);

            var thisDom = this.getDom();
            var elementDom = element.getDom();
            if(Utils.isUnset(index) || index == children.length){
                thisDom.appendChild(elementDom);
                children.push(element);
            }else{
                thisDom.insertBefore(elementDom, children[index].getDom());
                children.splice(index, 0, element);
            }

            element.set('parent', this.ref);

            return this.ref;
        },
        /**
         * Adds given element as a child.
         * @param {...ui/Element} element - Child element.
         * @return Instance reference.
         */
        'add': function(){
            Utils.each(arguments, function(element){
                this.addAt(element);
            }, this);
            return this.ref;
        },

        /**
         * Adds given element as a child to the begginin of content.
         * @param {...ui/Element} element - Child element.
         * @return Instance reference.
         */
        'prepend': function(){
            Utils.each(arguments, function(element, i){
                this.addAt(element, i);
            }, this);
            return this.ref;
        },
        /**
         * Adds given element as a child to near target element. This is core method of addAfter and addBefore.
         * @param {ui/Element} element - Child element.
         * @param {ui/Element} targetElement - Target element to put child near it.
         * @param {boolean} nextToIt - Direction of child to put it to after or before target element.
         * @return Instance reference.
         *
         * @see #addAfter
         * @see #addBefore
         */
        'addNear': function(element, targetElement, nextToIt){
            if(targetElement.getParent() != this){
                //TODO error
                throw 'Target element\'s parent and parent which will be added into must be the same element';
                return;
            }

            var index = this.getChildren().indexOf(targetElement);
            if(nextToIt) index++;

            return this.addAt(element, index);
        },
        /**
         * Adds given element as a child after target element.
         * @param {ui/Element} element - Child element.
         * @param {ui/Element} targetElement - Target element to put child near it.
         * @return Instance reference.
         */
        'addAfter': function(element, targetElement){
            return this.addNear(element, targetElement, true);
        },
        /**
         * Adds given element as a child before target element.
         * @param {ui/Element} element - Child element.
         * @param {ui/Element} targetElement - Target element to put child near it.
         * @return Instance reference.
         */
        'addBefore': function(element, targetElement){
            return this.addNear(element, targetElement);
        },
        /**
         * Remove child. If parameter is given, given child removes from itself, otherwise instance is removed from parent.
         * @param {string} [element] - Child element.
         * @return Instance reference.
         */
        'remove': function(element){
            //Remove element
            if(element){
                this.getDom().removeChild(element.getDom());

                element.unset('parent');
                var children = this.get('children');
                children.splice(children.indexOf(element) - 1, 1);
                return this.ref;
            }

            //Remove this from parent
            var parent = this.get('parent');
            if(parent) parent.remove(this);

            return this.ref;
        },

        /**
         * Returns parent.
         * @return {ui/Element} Parent element.
         */
        'getParent': function(){
            return this.get('parent');
        },
        /**
         * Returns children.
         * @return {ui/Element[]} Child elements.
         */
        'getChildren': function(){
            return this.get('children');
        },
        /**
         * Returns child at specified position.
         * @param {number} index - Position of child.
         * @return {ui/Element} Child element.
         */
        'getChildAt': function(index){
            return this.getChildren()[index];
        },

        /*
         * Event Handling
         *===========================================================*/
        /**
         * Adds event listener to native dom element.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return Instance reference.
         */
        'onDom': function(action, func){
            this.getDom().addEventListener(action, func);
            return this.ref;
        },
        /**
         * Removes event listener from native dom element.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return Instance reference.
         */
        'offDom': function(action, func){
            this.getDom().removeEventListener(action, func);
            return this.ref;
        },
        /**
         * Triggers event listener of native dom element.
         * @param {string} action - Action name.
         * @param {function} func - Listener function.
         * @return Instance reference.
         */
        'emitDom': function(action){
            this.getDom().dispatchEvent(new Event(action));
            return this.ref;
        },

        /*
         * Ready-to-use handled events
         *===========================================================*/
        /**
         * Hides element.
         * @return Instance reference.
         * @fires ui/Element.ui/Element.hide
         */
        'hide': function(){
            if(this.hasClass('jb-hidden'))
                return this.ref;

            return this.emit('hide');
        },
        /**
         * Shows element.
         * @return Instance reference.
         * @fires ui/Element.ui/Element.show
         */
        'show': function(){
            if(!this.hasClass('jb-hidden'))
                return this.ref;

            return this.emit('show');
        },
        /**
         * Returns element visibility status.
         * @return {boolean} Visibility status.
         */
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
        /**
         * Returns dom object.
         * @return {dom} Element dom object.
         */
        'getDom': function(){
            return this.get('dom');
        }
    });
});
