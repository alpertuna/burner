/*
 * src/ui/utils/SpaceFinder.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 04.08.2016
 */

define([
    '../../core/Utils'
], function(
    Utils
){
    return {
        'targetRect': null,
        'thisRect': null,
        'checkDirection': function(direction){
            switch(direction){
                case 'TOP':
                    return this.targetRect.top >= this.thisRect.height;
                    break;
                case 'BOTTOM':
                    return document.documentElement.clientHeight - this.targetRect.top - this.targetRect.height >= this.thisRect.height;
                    break;
                case 'LEFT':
                    return this.targetRect.left >= this.thisRect.width;
                    break;
                case 'RIGHT':
                    return document.documentElement.clientWidth - this.targetRect.left - this.targetRect.width >= this.thisRect.width;
                    break;
            }
        },
        'calculateAlign': function(align){
            switch(align){
                case 'CENTER':
                    return this.targetRect.left + (this.targetRect.width - this.thisRect.width)/2;
                case 'MIDDLE':
                    return this.targetRect.top + (this.targetRect.height - this.thisRect.height)/2;
                case 'LEFT':
                    return this.targetRect.left;
                case 'RIGHT':
                    return this.targetRect.left + this.targetRect.width - this.thisRect.width;
                case 'TOP':
                    return this.targetRect.top;
                case 'BOTTOM':
                    return this.targetRect.top + this.targetRect.height - this.thisRect.height;
                case 'PAGE_TOP':
                    return 0;
                case 'PAGE_BOTTOM':
                    return document.documentElement.clientHeight - this.thisRect.height;
                case 'PAGE_LEFT':
                    return 0;
                case 'PAGE_RIGHT':
                    return document.documentElement.clientWidth - this.thisRect.width;
            }
        },
        'find': function(targetRect, thisRect, direction, align){
            this.targetRect = targetRect;
            this.thisRect = thisRect;

            var top, left;

            //Specify alternative positions by order if positioning fails
            var checkOrder;
            switch(direction){
                case 'TOP':
                    checkOrder = [
                        ['TOP', align],
                        ['BOTTOM', align],
                        ['RIGHT', direction == 'TOP' ? 'BOTTOM' : 'TOP'],
                        ['LEFT', direction == 'TOP' ? 'BOTTOM' : 'TOP']
                    ];
                    break;
                case 'BOTTOM':
                    checkOrder = [
                        ['BOTTOM', align],
                        ['TOP', align],
                        ['RIGHT', direction == 'TOP' ? 'BOTTOM' : 'TOP'],
                        ['LEFT', direction == 'TOP' ? 'BOTTOM' : 'TOP']
                    ];
                    break;
                case 'RIGHT':
                    checkOrder = [
                        ['RIGHT', align],
                        ['BOTTOM', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['TOP', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['LEFT', align]
                    ];
                    break;
                case 'LEFT':
                    checkOrder = [
                        ['LEFT', align],
                        ['BOTTOM', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['TOP', direction == 'RIGHT' ? 'LEFT' : 'RIGHT'],
                        ['RIGHT', align]
                    ];
                    break;
            }

            //Try positions
            direction = 'CORNER';
            align = '';
            Utils.each(checkOrder, function(_direction){
                if(this.checkDirection(_direction[0])){
                    direction = _direction[0];
                    align = _direction[1];
                    return false;
                }
            }, this);

            //If aligning fails, specify alternative aligns
            var calculatedAlign = this.calculateAlign(align);
            if(
                align == 'TOP' ||
                align == 'BOTTOM' ||
                align == 'MIDDLE'
            ){
                if(calculatedAlign < 0)
                    align = 'PAGE_TOP';
                else if(calculatedAlign + this.thisRect.height > document.documentElement.clientHeight){
                    align = this.calculateAlign('PAGE_BOTTOM') < 0 ?
                        'PAGE_TOP' :
                        'PAGE_BOTTOM';
                }
            }else if(
                align == 'LEFT' ||
                align == 'RIGHT' ||
                align == 'CENTER'
            ){
                if(calculatedAlign < 0)
                    align = 'PAGE_LEFT';
                else if(calculatedAlign + this.thisRect.width > document.documentElement.clientHeight){
                    align = this.calculateAlign('PAGE_RIGHT') < 0 ?
                        'PAGE_LEFT' :
                        'PAGE_RIGHT';
                }
            }

            //Apply direction and align
            switch(direction){
                case 'TOP':
                    top = this.targetRect.relativeTop - this.thisRect.height;
                    break;
                case 'BOTTOM':
                    top = this.targetRect.relativeTop + this.targetRect.height;
                    break;
                case 'LEFT':
                    left = this.targetRect.relativeLeft - this.thisRect.width;
                    break;
                case 'RIGHT':
                    left = this.targetRect.relativeLeft + this.targetRect.width;
                    break;
                case 'CORNER':
                    left = this.targetRect.relativeLeft - this.targetRect.left;
                    top = this.targetRect.relativeTop - this.targetRect.top;
                    break;
            }
            switch(align){
                case 'CENTER':
                case 'LEFT':
                case 'RIGHT':
                case 'PAGE_LEFT':
                case 'PAGE_RIGHT':
                    left = this.calculateAlign(align) - this.targetRect.left + this.targetRect.relativeLeft;
                    break;

                case 'MIDDLE':
                case 'TOP':
                case 'BOTTOM':
                case 'PAGE_TOP':
                case 'PAGE_BOTTOM':
                    top = this.calculateAlign(align) - this.targetRect.top + this.targetRect.relativeTop;
                    break;
            }

            //Set style according to align to put space
            var popupClass;
            switch(align){
                case 'LEFT':
                case 'RIGHT':
                case 'TOP':
                case 'BOTTOM':
                    popupClass = 'jb-popup-align-' + align.toLowerCase();
                    break;
            }

            //Result
            return {
                'popupClass': popupClass,
                'top': top,
                'left': left
            }
        }
    }
})
