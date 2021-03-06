/*
 * src/ui/Popup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define([
  '../core/Utils',
  './Element', './Group',
  './utils/SpaceFinder'
], function (
  Utils,
  Element, Group,
  SpaceFinder
) {
  var shownPopup

  function targetClickedInClickMode (e) {
    if (this.hasClass('jb-hidden')) {
      this.show()
    } else {
      this.hide()
    }
    e.stopPropagation()
  }
  function popupOnShowInClickMode () {
    // Close Other Popup
    if (shownPopup && shownPopup !== this) shownPopup.hide()
    shownPopup = this

    // Put hide trigger
    window.addEventListener('click', this.hide)
  }
  function popupOnHideInClickMode () {
    shownPopup = null

    // Remove hide trigger
    window.removeEventListener('click', this.hide)
  }
  function stopPropagation (e) {
    e.stopPropagation()
  }
  function adjustPosition () {
    if (!this.getParent()) {
      this.get('target').add(this)
    }

    // Remove prev styles affects position to avoid incorrect rect
    this.removeClass('jb-popup-align-top jb-popup-align-bottom jb-popup-align-left jb-popup-align-right')
    this.removeStyle('height') // Full client height cases

    var targetRect = this.get('targetDom').getBoundingClientRect()
    targetRect.relativeTop = this.get('targetDom').offsetTop
    targetRect.relativeLeft = this.get('targetDom').offsetLeft
    var thisRect = this.getDom().getBoundingClientRect()

    var result = SpaceFinder.find(
      targetRect,
      thisRect,
      this.get('direction'),
      this.get('align')
    )

    if (result.popupClass) {
      this.addClass(result.popupClass)
    }

    // Result
    this.setStyle({
      'top': result.top,
      'left': result.left
    })

    // Calculate overflow for full client height
    // TODO This control is designed for Dropdown List, it has to be ready for other components
    if (result.height !== false) {
      if (!this.getChildAt(0).getComponent) return

      var computedStylesComponent = window.getComputedStyle(this.getChildAt(0).getComponent().getDom(), null)
      var computedStylesPopup = window.getComputedStyle(this.getDom(), null)
      result.height -= (
        parseInt(computedStylesComponent.getPropertyValue('padding-top')) +
        parseInt(computedStylesComponent.getPropertyValue('border-top-width'))
      ) * 2 +
      parseInt(computedStylesPopup.getPropertyValue('padding-top')) * 2

      this.setStyle('height', result.height)
    }
  }

  return Element.extend(/** @lends ui/Popup# */{
    /**
     * Popup component class.
     * @constructs
     * @param {ui/Element} content - An element as content
     * @augments ui/Element
     */
    'init': function (content) {
      this.super()
      this.addClass('jb-popup')
      this.hide()
      this.on('show', adjustPosition.bind(this))

      if (content) {
        this.add(content)
      }
    },

    'direction': 'TOP',
    'align': 'CENTER',
    /**
     * Sets direction of popup to target component.
     * @param {string} direction - Direction name. Options are TOP, BOTTOM, RIGHT, LEFT.
     * @param {string} align - Align name. Options are CENTER, MIDDLE, TOP, BOTTOM, RIGHT, LEFT.
     * @return {Object} Instance reference.
     */
    'setDirection': function (direction, align) {
      // TODO error (also include default align value)
      switch (direction) {
        case 'TOP':
        case 'BOTTOM':
          if (Utils.isUnset(align)) {
            align = 'CENTER'
          } else if (align !== 'LEFT' && align !== 'RIGHT' && align !== 'CENTER') {
            false // object-throw 'Align have to be LEFT, RIGHT or CENTER for direction ' + direction
          }
          break
        case 'LEFT':
        case 'RIGHT':
          if (Utils.isUnset(align)) {
            align = 'MIDDLE'
          } else if (align !== 'TOP' && align !== 'BOTTOM' && align !== 'MIDDLE') {
            false // object-throw 'Align have to be TOP, BOTTOM or MIDDLE for direction ' + direction
          }
          break
        default:
          false // object-throw 'Direction have to be one of TOP, BOTTOM, LEFT and RIGHT'
      }

      this.set('direction', direction)
      this.set('align', align)

      return this.ref
    },

    'bound': false,
    /**
     * Binds popup to a component.
     * @param {ui/ComponentContainer} target - Target component.
     * @param {string} [trigger=HOVER] - Trigger name. Options are CLICK, HOVER, FOCUS, NONE.
     * @return {Object} Instance reference.
     */
    'bind': function (target, trigger) {
      // TODO Error
      if (this.get('bound')) false // object-throw 'Popup is already bound.'
      this.set('bound', true)
      // TODO error
      if (!target.hasClass('jb-com-container')) {
        false // object-throw 'To bind popup, component has to have container.'
      }

      var targetComponent = target.getComponent()
      var targetComponentDom = targetComponent.getDom()

      this.set('target', target)
      this.set('targetComponent', targetComponent)
      this.set('targetDom', targetComponent.getDom())

      if (trigger === 'NONE') return this

      switch (trigger) {
        case 'FOCUS':
          targetComponentDom.addEventListener('focus', this.show)
          targetComponentDom.addEventListener('blur', this.hide)
          break
        case 'CLICK':
          target.on('click', targetClickedInClickMode.bind(this))
          this.on('show', popupOnShowInClickMode.bind(this))
          this.on('hide', popupOnHideInClickMode.bind(this))
          this.getDom().addEventListener('click', stopPropagation.bind(this))
          break
        case 'HOVER':
        default:
          targetComponentDom.addEventListener('mouseover', this.show)
          targetComponentDom.addEventListener('mouseout', this.hide)
          break
      }

      return this.ref
    }
  })
})

