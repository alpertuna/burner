/*
 * src/core/AjaxGroup.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict'

define(['./EventHandler'], function (EventHandler) {
  function onOpenedConnection () {
    if (this.get('connections') === 0) {
      this.emit('openedFirstConnection')
    }
    this.inc('connections')
    this.emit('change')
  }
  function onClosedConnection () {
    this.inc('connections', -1)
    if (this.get('connections') === 0) {
      this.emit('closedLastConnection')
    }
    this.emit('change')
  }

  return EventHandler.extend(/** @lends core/AjaxGroup# */{
    'connections': 0,
    'maxConnection': 0,

    /**
     * AjaxGroup component class.
     * @constructs
     * @augments ui/EventHandler
     */
    'init': function () {
      /**
       * On any connection is closed or opened event.
       * @event core/AjaxGroup.core/AjaxGroup:change
       */
      /**
       * On any connection is opened event.
       * @event core/AjaxGroup.core/AjaxGroup:openedConnection
       */
      /**
       * On any connection is closed event.
       * @event core/AjaxGroup.core/AjaxGroup:closedConnection
       */
      /**
       * On opened first active connection event.
       * @event core/AjaxGroup.core/AjaxGroup:openedFirstConnection
       */
      /**
       * On closed last active connection event.
       * @event core/AjaxGroup.core/AjaxGroup:closedLastConnection
       */
      /**
       * On reached maximum connection event.
       * @event core/AjaxGroup.core/AjaxGroup:maxConnection
       */
      this.handle('change')
      this.handle('openedConnection')
      this.handle('closedConnection')
      this.handle('openedFirstConnection')
      this.handle('closedLastConnection')
      this.handle('maxConnection')
      this.on('openedConnection', onOpenedConnection.bind(this))
      this.on('closedConnection', onClosedConnection.bind(this))
    },

    /**
     * Sets maximum connection waits respond at the same time.
     * @param {number} value - Connection number.
     * @return {Object} Instance reference.
     */
    'setMaxConnection': function (value) {
      this.set('maxConnection', value)
      return this.ref
    },

    /**
     * Returns if there is room for new connection.
     * @return {boolean} If there is room for new connection.
     */
    'hasRoom': function () {
      var maxConnection = this.get('maxConnection')
      if (maxConnection === 0) return true
      return this.countConnections() < maxConnection
    },
    /**
     * Returns number of active connections.
     * @return {number} Number of active connections.
     */
    'countConnections': function () {
      return this.get('connections')
    }
  })
})
