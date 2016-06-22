/**
 * js/main.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.04.2016
 */

'use strict';

require.config({
});

require([
    'burner/core/Utils',
    'burner/ui/Document',
    'burner/ui/Element',
    'burner/ui/Label',
    'burner/ui/Button',
    'burner/ui/Input',
    'burner/ui/Group',
    'burner/ui/Tip',
    'burner/ui/Dropdown',
    'burner/ui/Check',
    'burner/ui/RadioGroup',
    'burner/ui/CheckGroup',
    'burner/ui/Switch',
    'burner/ui/DatePicker',
    'burner/ui/Spinner',
    'burner/ui/TimePicker',
    'burner/ui/Notifier',
    'burner/core/createClass',
    'burner/core/EventHandler',
    'burner/core/Ajax',
    'burner/core/AjaxGroup',
    'burner/third/date.format'
], function(
    Utils,
    Document,
    Element,
    Label,
    Button,
    Input,
    Group,
    Tip,
    Dropdown,
    Check,
    RadioGroup,
    CheckGroup,
    Switch,
    DatePicker,
    Spinner,
    TimePicker,
    Notifier,
    createClass,
    EventHandler,
    Ajax,
    AjaxGroup
){
    Document.new().add(
        Label.new('Testing')
    )
})
