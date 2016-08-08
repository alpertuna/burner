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
         * @return Instance reference.
         */
        'focus',
        /**
         * Sets disabled status.
         * @function
         * @name iComponent#setDisabled
         * @param {boolean} value - Disabled status.
         * @return Instance reference.
         */
        'setDisabled',
        /**
         * Sets color theme.
         * @function
         * @name iComponent#setTheme
         * @param {string} theme - Theme name.
         * @return Instance reference.
         */
        'setTheme'
    ]
})
