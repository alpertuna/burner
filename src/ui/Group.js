/*
 * src/ui/Group.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define([
  '../core/Utils',
  './Element',
  './interfaces/iComponent'
], function (Utils, Element, iComponent) {
  return Element.extend(/** @lends ui/Group# */{
    /**
     * Group component class.
     * @constructs
     * @augments ui/Element
     * @param {string} mod - Mod name to present children.
     * @implements iComponent
     */
    'init': function (mod) {
      this.super()

      var className
      switch (mod) {
        /* case 'VERTICAL':
          className = 'jb-vertical-group'
          break;*/
        case 'SPACED':
          className = 'jb-spaced-group'
          break
        case 'BLOCK':
          className = 'jb-group jb-group-block'
          break
        default:
          className = 'jb-group'
          break
      }
      this.addClass(className)
    },

    // Inherited from iInput interface
    'setDisabled': function (value) {
      Utils.each(this.get('children'), function (child) {
        child.setDisabled(value)
      })

      return this.ref
    },
    // Inherited from iInput interface
    'setTheme': function (value) {
      Utils.each(this.get('children'), function (child) {
        child.setTheme(value)
      })

      return this.ref
    },
    // Inherited from iInput interface
    'focus': function () {
      this.getChildAt(0).focus()
      return this.ref
    }
  }).implement(iComponent)
})

