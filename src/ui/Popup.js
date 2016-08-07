/**
 * js/./Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 23.04.2016
 */

'use strict';

define([
    '../core/Utils',
    './Element', './Group',
    './utils/SpaceFinder'
], function(
    Utils,
    Element, Group,
    SpaceFinder
){
    var shownPopup;

    function targetClickedInClickMode(e){
        if(this.hasClass('jb-hidden')){
            this.show();
        }else
            this.hide();
        e.stopPropagation();
    }
    function popupOnShowInClickMode(){
        //Close Other Popup
        if(shownPopup && shownPopup !== this) shownPopup.hide();
        shownPopup = this;

        //Put hide trigger
        window.addEventListener('click', this.hide);
    }
    function popupOnHideInClickMode(){
        shownPopup = null;

        //Remove hide trigger
        window.removeEventListener('click', this.hide);
    }
    function stopPropagation(e){
        e.stopPropagation();
    }
    function adjustPosition(){
        if(!this.getParent())
            this.get('target').add(this);

        //Remove prev styles affects position to avoid incorrect rect
        this.removeClass('jb-popup-align-top jb-popup-align-bottom jb-popup-align-left jb-popup-align-right');
        this.removeStyle('height'); //Full client height cases

        var targetRect = this.get('targetDom').getBoundingClientRect();
        targetRect.relativeTop = this.get('targetDom').offsetTop;
        targetRect.relativeLeft = this.get('targetDom').offsetLeft;
        var thisRect = this.getDom().getBoundingClientRect();

        var result = SpaceFinder.find(
            targetRect,
            thisRect,
            this.get('direction'),
            this.get('align')
        );

        if(result.popupClass)
            this.addClass(result.popupClass);

        //Result
        this.setStyle({
            'top': result.top,
            'left': result.left
        });

        //Calculate overflow for full client height
        //TODO This control is designed for Dropdown List, it has to be ready for other components
        if(result.height !== false){
            if(!this.getChildAt(0).getComponent) return;

            var computedStylesComponent = window.getComputedStyle(this.getChildAt(0).getComponent().getDom(), null);
            var computedStylesPopup = window.getComputedStyle(this.getDom(), null);
            result.height -= (
                parseInt(computedStylesComponent.getPropertyValue('padding-top')) +
                parseInt(computedStylesComponent.getPropertyValue('border-top-width'))
            ) * 2 +
            parseInt(computedStylesPopup.getPropertyValue('padding-top')) * 2;

            this.setStyle('height', result.height);
        }
    }

    return Element.extend({
        'init': function(content){
            this.super();
            this.addClass('jb-popup');
            this.hide();
            this.on('show', adjustPosition.bind(this));

            if(content)
                this.add(content);
        },

        /**
         * Directions: TOP, BOTTOM, RIGHT, LEFT
         * Aligns: CENTER, MIDDLE, TOP, BOTTOM, RIGHT, LEFT
         */
        'direction': 'TOP',
        'align': 'CENTER',
        'setDirection': function(direction, align){
            //TODO error (also include default align value)
            switch(direction){
                case 'TOP':
                case 'BOTTOM':
                    if(Utils.isUnset(align))
                        align = 'CENTER';
                    else if(align != 'LEFT' && align != 'RIGHT' &&  align != 'CENTER')
                        throw 'Align have to be LEFT, RIGHT or CENTER for direction ' + direction;
                    break;
                case 'LEFT':
                case 'RIGHT':
                    if(Utils.isUnset(align))
                        align = 'MIDDLE';
                    else if(align != 'TOP' && align != 'BOTTOM' &&  align != 'MIDDLE')
                        throw 'Align have to be TOP, BOTTOM or MIDDLE for direction ' + direction;
                    break;
                default:
                    throw 'Direction have to be one of TOP, BOTTOM, LEFT and RIGHT';
            }

            this.set('direction', direction);
            this.set('align', align);

            return this.ref;
        },

        'bound': false,
        //FOCUS, HOVER, CLICK, NONE
        'bind': function(target, trigger){
            //TODO Error
            if(this.get('bound')) throw 'Popup is already bound.';
            this.set('bound', true);
            //TODO error
            if(!target.hasClass('jb-com-container'))
                throw 'To bind popup, component has to have container.';

            var targetComponent = target.getComponent();
            var targetComponentDom = targetComponent.getDom();

            this.set('target', target);
            this.set('targetComponent', targetComponent);
            this.set('targetDom', targetComponent.getDom());

            if(trigger == 'NONE') return this;

            switch(trigger){
                case 'FOCUS':
                    targetComponentDom.addEventListener('focus', this.show);
                    targetComponentDom.addEventListener('blur', this.hide);
                    break;
                case 'CLICK':
                    target.on('click', targetClickedInClickMode.bind(this));
                    this.on('show', popupOnShowInClickMode.bind(this));
                    this.on('hide', popupOnHideInClickMode.bind(this));
                    this.getDom().addEventListener('click', stopPropagation.bind(this));
                    break;
                case 'HOVER':
                default:
                    targetComponentDom.addEventListener('mouseover', this.show);
                    targetComponentDom.addEventListener('mouseout', this.hide);
                    break;
            }

            return this.ref;
        }
    });
});
