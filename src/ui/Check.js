/*
 * src/ui/Check.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define([
  '../core/Utils',
  './ComponentContainer', './Element', './Icon',
  './utils/setTheme',
  './interfaces/iComponent', './interfaces/iInput'
], function (
  Utils,
  ComponentContainer, Element, Icon,
  setTheme,
  iComponent, iInput
) {
  function repaint () {
    var icon = this.get('icon')
    if (this.getValue()) {
      icon.removeClass('jb-unvisible')
    } else {
      icon.addClass('jb-unvisible')
    }
  }
  function toggle () {
    var oldValue = this.get('value')
    var group = this.get('group')
    var isRadioGroup = group && group.get('type') === 'RADIO'
    if (isRadioGroup) {
      var oldGroupValue = group.getValue()
    }

    this.toggle()

    var newValue = this.get('value')

    if (oldValue !== newValue) {
      this.emit('change', {
        'value': newValue
      })

      if (group) {
        if (isRadioGroup) {
          Utils.each(group.get('options'), function (option) {
            if (option.get('groupValue') === oldGroupValue) {
              option.emit('change', {'value': false})
              return false
            }
          })
        }
        group.emit('change', {
          'value': group.getValue()
        })
      }
    }
  }

  return ComponentContainer.extend(/** @lends ui/Check# */{
    'value': false,

    /**
     * Check component class.
     * @constructs
     * @param {string|number} groupValue - Group value to use for CheckGroup or RadioGroup
     * @augments ui/ComponentContainer
     * @implements iInput
     * @implements iComponent
     */
    'init': function (groupValue) {
      /**
       * Click event.
       * @event ui/Check.ui/Check:change
       */
      /**
       * Change event.
       * @event ui/Check.ui/Check:click
       * @param {boolean} value - Check state.
       */
      var component = Element.new('button')
      component.addClass('jb-check')
      this.super(component)

      this.setIcon('check')
      this.set('groupValue', groupValue)
      this.handle('change')
      this.handle('click')
      this.on('click', toggle.bind(this))
      component.getDom().addEventListener('click', toggle.bind(this))
    },

    // Inherited from iInput interface
    'setValue': function (value, force) {
      if (!force) {
        var group = this.get('group')
        if (group) {
          // Radio Group
          if (group.get('type') === 'RADIO') {
            if (value) group.setValue(this.get('groupValue'))
            return this.ref
          }

          // Check Group
          var groupValues = group.getValue()
          var groupValue = this.get('groupValue')
          if (value) groupValues.push(this.get('groupValue'))
          else groupValues.splice(groupValues.indexOf(groupValue), 1)
        }
      }

      this.set('value', value)
      repaint.call(this)
      return this.ref
    },
    // Inherited from iInput interface
    'getValue': function () {
      return this.get('value')
    },
    'defaultValue': false,
    // Inherited from iInput interface
    'setDefaultValue': function (value) {
      this.set('defaultValue', value)
      this.setValue(value)
      return this.ref
    },
    // Inherited from iInput interface
    'resetValue': function () {
      this.setValue(this.get('defaultValue'))
      return this.ref
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

    /**
     * Toggles value.
     * @return {Object} Instance reference.
     */
    'toggle': function () {
      return this.setValue(!this.get('value'))
    },
    /**
     * Sets value to true.
     * @return {Object} Instance reference.
     */
    'check': function () {
      return this.setValue(true)
    },
    /**
     * Sets value to false.
     * @return {Object} Instance reference.
     */
    'uncheck': function () {
      return this.setValue(false)
    },

    /**
     * Binds a CheckGroup or RadioGroup to work with other Checks and Switches.
     * @param {CheckGroup|RadioGroup} gruop - Group instance to bind.
     * @return {Object} Instance reference.
     */
    'bind': function (group) {
      this.set('group', group)
      var options = group.get('options')
      options.push(this)
      if (group.get('type') === 'RADIO') {
        this.getComponent().addClass('jb-radio')
        this.setIcon('circle')
        if (options.length === 1) this.check()
      }
      return this.ref
    },

    /**
     * Sets check icon.
     * @param {string} name - Icon name.
     * @return {Object} Instance reference.
     */
    'setIcon': function (name) {
      var icon = this.get('icon')
      if (icon) {
        icon.remove()
      }

      icon = Icon.new(name + ' jb-check-icon')
      this.getComponent().add(icon)
      this.set('icon', icon)
      repaint.call(this)

      return this.ref
    },

    /**
     * Sets value to represent in a group.
     * @param {string|number} value - Value to represent in a group.
     * @return {Object} Instance reference.
     */
    'setGroupValue': function (value) {
      return this.set('groupValue', value)
    }
  }).implement(iComponent, iInput)
})
