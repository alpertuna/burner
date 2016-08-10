/*
 * src/ui/Tip.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define(['../core/Utils', './Popup', './Element'], function (Utils, Popup, Element) {
  return Popup.extend(/** @lends ui/Tip# */{
    /**
     * Tip component class.
     * @constructs
     * @param {string} message - Content message text.
     * @augments ui/Element
     */
    'init': function (text) {
      this.super()
      var content = Element.new()
      .addClass('jb-tip-content')
      .add(text)

      this.addClass('jb-tip')
      this.add(content)

      // this.add(Element.new().addClass('jb-tip-pointer'))
    }
  })
})

