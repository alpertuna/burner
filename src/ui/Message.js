/*
 * src/ui/Message.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define([
  './Element', './Icon',
  './utils/setTheme'
], function (
  Element, Icon,
  setTheme
) {
  return Element.extend(/** @lends ui/Message# */{
    /**
     * Message component class.
     * @constructs
     * @param {string} message - Content message text.
     * @param {string} theme - Color theme name.
     * @augments ui/Element
     */
    'init': function (message, theme) {
      this.super()

      var className, iconName
      switch (theme) {
        case 'WARNING':
          className = 'jb-warning'
          iconName = 'warning'
          break
        case 'DANGER':
          className = 'jb-danger'
          iconName = 'minus-circle'
          break
        case 'SUCCESS':
          className = 'jb-success'
          iconName = 'check-circle'
          break
        case 'INFO':
          className = 'jb-info'
          iconName = 'info-circle'
          break
        default:
        case 'PRIMARY':
          className = 'jb-primary'
          iconName = 'info-circle'
          break
      }

      this.addClass('jb-message ' + className)
      this.add(
        Icon.new(iconName + ' jb-message-icon'),
        message
      )
    }
  })
})
