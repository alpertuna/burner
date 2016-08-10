/**
 * js/ui/iInput.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 28.04.2016
 */

define(function () {
  /**
   * Implements main component controller methods.
   * @interface iInput
   */
  return [
    /**
     * Returns value of component.
     * @function
     * @name iInput#getValue
     * @return{string|number} Value.
     */
    'getValue',
    /**
     * Sets value to default value.
     * @function
     * @name iInput#resetValue
     * @return {Object} Instance reference.
     */
    'resetValue',
    /**
     * Sets default value.
     * @function
     * @name iInput#setDefaultValue
     * @param {string|number} value - Default value.
     * @return {Object} Instance reference.
     */
    'setDefaultValue',
    /**
     * Sets value.
     * @function
     * @name iInput#setValue
     * @param {string|number} value - Value.
     * @return {Object} Instance reference.
     */
    'setValue'
  ]
})

