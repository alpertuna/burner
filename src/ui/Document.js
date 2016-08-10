/*
 * src/ui/Document.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define(['../core/Utils', './Element'], function (Utils, Element) {
  var children = []

  return Element.extend(/** @lends ui/Document# */{
    /**
     * Document component class.
     * @constructs
     * @augments ui/Element
     */
    'init': function () {
      this.set('dom', document.body)
      this.set('children', children)
    }
  })
})

