/*
 * src/ui/TextElement.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

// To avoid loop and unnecessary ElementCore class, this is Element likely class
define(['../core/createClass'], function (createClass) {
  return createClass(/** @lends ui/TextElement# */{
    /**
     * TextElement component class.
     * @constructs
     * @augments core/createClass
     * @param {string} text - Content text.
     */
    'init': function (text) {
      /* this.set('dom', document.createElement('span'))
      this.get('dom').innerHTML = text;*/
      if (text === '&nbsp;') text = '\u00A0'
      this.set('dom', document.createTextNode(text))
    },
    /**
     * Returns dom object.
     * @return {dom} Element dom object.
     */
    'getDom': function () {
      return this.get('dom')
    }
  })
})
