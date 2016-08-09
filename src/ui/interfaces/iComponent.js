/*
 * src/ui/interfaces/iComponent.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict';

define(function(){
    /**
     * Implements visiual component methods.
     * @interface iComponent
     */
    return [
        /**
         * Focuses on button.
         * @function
         * @name iComponent#focus
         * @return {Object} Instance reference.
         */
        'focus',
        /**
         * Sets disabled status.
         * @function
         * @name iComponent#setDisabled
         * @param {boolean} value - Disabled status.
         * @return {Object} Instance reference.
         */
        'setDisabled',
        /**
         * Sets color theme.
         * @function
         * @name iComponent#setTheme
         * @param {string} theme - Theme name.
         * @return {Object} Instance reference.
         */
        'setTheme'
    ]
})
