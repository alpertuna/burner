/**
 * src/ui/utils/setTheme.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 02.08.2016
 */

'use strict';

define(['../../core/Utils'], function(Utils){
    return function(theme){
        var component = this.getComponent();
        var classPrefix = this.themeClassPrefix;
        if(Utils.isUnset(classPrefix)) classPrefix = '';

        component.removeClass('jb-' + classPrefix + 'primary jb-' + classPrefix + 'danger jb-' + classPrefix + 'warning jb-' + classPrefix + 'info jb-' + classPrefix + 'dark');

        switch(theme){
            case 'PRIMARY':
                component.addClass('jb-' + classPrefix + 'primary');
                break;
            case 'SUCCESS':
                component.addClass('jb-' + classPrefix + 'success');
                break;
            case 'DANGER':
                component.addClass('jb-' + classPrefix + 'danger');
                break;
            case 'WARNING':
                component.addClass('jb-' + classPrefix + 'warning');
                break;
            case 'INFO':
                component.addClass('jb-' + classPrefix + 'info');
                break;
            case 'DARK':
                component.addClass('jb-' + classPrefix + 'dark');
                break;
        }

        return this.ref;
    }
})
