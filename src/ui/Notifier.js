/*
 * src/ui/Notifier.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 08.08.2016
 */

'use strict';

define(['../core/createClass', './Document', './Element', './Icon'], function(createClass, Document, Element, Icon){
    var notificationKon;

    function hideNotification(){
        this.addClass('jb-notification-slideup');
    }
    function removeNotification(){
        this.remove();
    }
    function showNotification(){
        this.addClass('jb-notification-fadein');
    }

    return createClass(/** @lends ui/Notifier# */{
        /**
         * Notifier component class.
         * @constructs
         * @augments core/createClass
         * @param {string} message - Content message text.
         * @param {string} theme - Color theme name.
         */
        'init': function(message, theme){
            this.super();

            if(!notificationKon){
                Document.new().add(
                    notificationKon = Element.new()
                    .addClass('jb-notifier')
                );
            }

            var className, iconName;
            switch(theme){
                case 'PRIMARY':
                    className = 'jb-primary';
                    iconName = 'info-circle';
                    break;
                case 'WARNING':
                    className = 'jb-warning';
                    iconName = 'warning';
                    break;
                case 'DANGER':
                    className = 'jb-danger';
                    iconName = 'minus-circle';
                    break;
                case 'SUCCESS':
                    className = 'jb-success';
                    iconName = 'check-circle';
                    break;
                case 'INFO':
                default:
                    className = 'jb-info';
                    iconName = 'info-circle';
                    break;
            }

            var notification = Element.new()
            .addClass('jb-notification ' + className)
            .add(
                Element.new()
                .addClass('jb-notification-content')
                .add(Icon.new(iconName), message)
            );
            notificationKon.prepend(notification);
            setTimeout(showNotification.bind(notification), 50);
            setTimeout(hideNotification.bind(notification), 5000);
            setTimeout(removeNotification.bind(notification), 5400);
        }
    })
})
