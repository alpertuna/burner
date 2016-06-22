/**
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
 */

'use strict';

define(['../core/Utils', './Document', './Element'], function(Utils, Document, Element){
    var shownPopup;

    return Element.extend({
        'init': function(){
            this.super();
            this.addClass('jb-popup');
            this.hide();
            this.set('window', Element.new(window));
            this.on('show', this.adjustPosition);

            //Document.new().add(this);
        },

        'adjustPosition': function(){
            this.get('target').get('parent').add(this);

            switch(this.get('direction')){
                case 'TOP':this.addClass('jb-popup-top');break;
                case 'BOTTOM':this.addClass('jb-popup-bottom');break;
                case 'LEFT':this.addClass('jb-popup-left');break;
                case 'RIGHT':this.addClass('jb-popup-right');break;
            }

            var targetRect = this.get('targetDom').getBoundingClientRect();
            var targetRectTop = this.get('targetDom').offsetTop;
            var targetRectLeft = this.get('targetDom').offsetLeft;
            var thisRect = this.getDom().getBoundingClientRect();
            var top, left;

            var direction = this.get('direction');

            if(direction == 'BOTTOM'){
                if(
                    targetRect.top + targetRect.height + thisRect.height > window.innerHeight &&
                    targetRect.top - thisRect.height >= 0
                ){
                    direction = 'TOP';
                }
            }

            switch(direction){
                case 'TOP':top = targetRectTop - thisRect.height;break;
                case 'BOTTOM':top = targetRectTop + targetRect.height;break;
                case 'LEFT':left = targetRectLeft - thisRect.width;break;
                case 'RIGHT':left = targetRectLeft + targetRect.width;break;
            }
            switch(this.get('align')){
                case 'CENTER':
                    if(Utils.isSet(left))
                        top = targetRectTop + (targetRect.height - thisRect.height)/2;
                    else
                        left = targetRectLeft + (targetRect.width - thisRect.width)/2;
                break;
                case 'LEFT':left = targetRectLeft;break;
                case 'RIGHT':left = targetRectLeft + targetRect.width - thisRect.width;break;
                case 'TOP':top = targetRectTop;break;
                case 'BOTTOM':top = targetRectTop + targetRect.height - thisRect.height;break;
            }

            this.setStyle({
                'top': top,
                'left': left
            });
        },
        'putHideHandler': function(e){
            this.get('window').on('click', this.hide);
            e.stopPropagation();
        },
        'removeHideHandler': function(e){
            this.get('window').off('click', this.hide);
        },

        'closeOtherPopup': function(){
            if(shownPopup && shownPopup !== this) shownPopup.hide();
            shownPopup = this;
        },

        /**
         * Directions: TOP, BOTTOM, RIGHT, LEFT
         * Aligns: CENTER, TOP, BOTTOM, RIGHT, LEFT
         */
        'direction': 'TOP',
        'align': 'CENTER',
        'setDirection': function(direction, align){
            if(Utils.isUnset(align)) align = 'CENTER';

            this.set('direction', direction);
            this.set('align', align);

            return this.ref;
        },

        'bound': false,
        //FOCUS, HOVER, CLICK, NONE
        'bind': function(element, trigger){
            //TODO Error
            if(this.get('bound')) throw 'Popup is already bound.';
            this.set('bound', true);

            if(Utils.isUnset(trigger)) trigger = 'FOCUS';

            this.set('target', element);
            this.set('targetDom', element.getDom());
            this.set('trigger', trigger);

            if(trigger == 'NONE') return this;

            switch(trigger){
                case 'FOCUS':
                    element.on('focus', this.show);
                    element.on('blur', this.hide);
                    break;
                case 'HOVER':
                    element.on('mouseover', this.show);
                    element.on('mouseout', this.hide);
                    break;
                case 'CLICK':
                    this.on('show', this.closeOtherPopup);
                    this.on('hide', function(){shownPopup = null});

                    element.on('click', this.show);
                    element.on('click', this.putHideHandler);
                    this.on('hide', this.removeHideHandler);
                    this.on('click', function(e){e.stopPropagation()});
                    break;
            }

            return this.ref;
        }
    });
});
