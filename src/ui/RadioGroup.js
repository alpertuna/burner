/*
 * src/ui/RadioGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define([
  '../core/Utils', '../core/EventHandler',
  './interfaces/iComponent', './interfaces/iInput'
], function (
  Utils, EventHandler,
  iComponent, iInput
) {
  return EventHandler.extend(/** @lends ui/RadioGroup# */{
    'type': 'RADIO',

    /**
     * RadioGroup component class.
     * @constructs
     * @augments ui/EventHandler
     * @implements iComponent
     * @implements iInput
     */
    'init': function () {
      /**
       * Change event.
       * @event ui/RadioGroup.ui/RadioGroup:change
       * @param {string|number} value - New value of component.
       */
      this.set('options', [])
      this.handle('change')
    },

    // Inherited from iInput interface
    'setValue': function (value) {
      this.set('value', value)
      Utils.each(this.get('options'), function (option) {
        option.setValue(option.get('groupValue') === value, true)
      })
      return this.ref
    },
    // Inherited from iInput interface
    'getValue': function () {
      return this.get('value')
    },
    // Inherited from iInput interface
    'setDefaultValue': function (value) {
      this.set('defaultValue', value)
      this.setValue(value)
      return this.ref
    },
    // Inherited from iInput interface
    'resetValue': function () {
      var defaultValue = this.get('defaultValue')
      if (!Utils.isSet(defaultValue)) {
        defaultValue = this.get('options')[0].get('groupValue')
      }
      this.setValue(defaultValue)
      return this.ref
    },

    // Inherited from iComponent interface
    'setDisabled': function (value) {
      Utils.each(this.get('options'), function (option) {
        option.setDisabled(value)
      })
      return this.ref
    },
    // Inherited from iComponent interface
    'setTheme': function (theme) {
      Utils.each(this.get('options'), function (option) {
        option.setTheme(theme)
      })
      return this.ref
    },
    // Inherited from iComponent interface
    'focus': function () {
      this.get('options')[0].focus()
    }
  }).implement(iComponent, iInput)
})
