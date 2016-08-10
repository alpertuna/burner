/*
 * src/ui/Input.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define([
  '../core/Utils',
  './ComponentContainer', './Element',
  './utils/setTheme',
  './interfaces/iComponent', './interfaces/iInput'
], function (
  Utils,
  ComponentContainer, Element,
  setTheme,
  iComponent, iInput
) {
  function change (e) {
    this.emit('change', {
      value: e.target.value
    })
  }

  return ComponentContainer.extend(/** @lends ui/Input# */{
    /**
     * Input component class.
     * @constructs
     * @augments ui/ComponentContainer
     * @implements iInput
     * @implements iComponent
     */
    'init': function () {
      /**
       * Change event.
       * @event ui/Input.ui/Input:change
       * @param {string} value - Input value.
       */
      var component = Element.new('input')
        .setAttr('type', 'text')
        .addClass('jb-input')
      this.super(component)

      this.addClass('jb-com-container jb-input-container')
      this.handle('change')

      component.getDom().addEventListener('change', change.bind(this))
    },

    // Inherited from iComponent interface
    'setTheme': setTheme,
    // Inherited from iComponent interface
    'setDisabled': function (value) {
      var component = this.getComponent()

      if (value) {
        component.setAttr('disabled', 'disabled')
      } else {
        component.removeAttr('disabled')
      }

      return this.ref
    },
    // Inherited from iComponent interface
    'focus': function () {
      this.getComponent().getDom().focus()
      return this.ref
    },

    // Inherited from iInput interface
    'setValue': function (value) {
      this.getComponent().getDom().value = value
      return this.ref
    },
    // Inherited from iInput interface
    'getValue': function (value) {
      return this.getComponent().getDom().value
    },
    'defaultValue': '',
    // Inherited from iInput interface
    'setDefaultValue': function (value) {
      this.set('defaultValue', value)
      this.setValue(value)
      return this.ref
    },
    // Inherited from iInput interface
    'resetValue': function () {
      return this.setValue(this.get('defaultValue'))
    },

    /**
     * Puts placeholder.
     * @param {string} value - Placeholder text.
     * @return {Object} Instance reference.
     */
    'setPlaceholder': function (value) {
      this.get('component').setAttr('placeholder', value)
      return this.ref
    },

    /**
     * Sets required state.
     * @param {boolean} value - Required state.
     * @return {Object} Instance reference.
     */
    'setRequired': function (value) {
      if (value) {
        this.setAttr('required', 'required')
      } else {
        this.removeAttr('required')
      }

      return this.ref
    }
  }).implement(iComponent, iInput)
})
