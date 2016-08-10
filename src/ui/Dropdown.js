/*
 * src/ui/Dropdown.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

define([
  '../core/Utils',
  './Button', './Element', './Icon', './List', './Popup',
  './interfaces/iInput'
], function (
  Utils,
  Button, Element, Icon, List, Popup,
  iInput
) {
  function change (e) {
    this.emit('change', e)
  }
  function listSelectedInternally () {
    this.setCaption(this.getTitle())
    this.get('popup').hide()
  }

  return Button.extend(/** @lends ui/Dropdown# */{
    /**
     * Dropdown component class.
     * @constructs
     * @param {Object[]} items - Item list
     * @param {string} items[].title - Title of an item
     * @param {string|number} items[].value - Value of an item
     * @param {string} items[].type - Type of an item
     * @augments ui/Button
     * @implements iInput
     */
    'init': function (items) {
      /**
       * Change event.
       * @event ui/Dropdown.ui/Dropdown:change
       * @param {string|number} value - Value of selected item.
       * @param {string} title - Title of selected item.
       */
      this.super()
      this.addClass('jb-dropdown')
      this.handle('change')

      this.getComponent().add(Icon.new('caret-down jb-button-icon'))

      var list = List.new(items)
        .addClass('jb-dropdown-list')
        .on('selectedInternally', listSelectedInternally.bind(this))
        .on('change', change.bind(this))
      this.set('list', list)

      var popup = Popup.new(list)
        .bind(this, 'CLICK')
        .setDirection('BOTTOM', 'RIGHT')
      this.set('popup', popup)

      this.setCaption(list.getTitle())
    },

    // Inherited from iInput interface
    'getValue': function () {
      return this.get('list').getValue()
    },
    /**
     * Returns title of selected item.
     * @return {string} Title of selected item.
     */
    'getTitle': function () {
      return this.get('list').getTitle()
    },
    // Inherited from iInput interface
    'setValue': function (value) {
      this.get('list').setValue(value)
      return this.ref
    },
    // Inherited from iInput interface
    'setDefaultValue': function (value) {
      this.get('list').setDefaultValue(value)
      return this.ref
    },
    // Inherited from iInput interface
    'resetValue': function () {
      this.get('list').resetValue()
      return this.ref
    }
  }).implement(iInput)
})
