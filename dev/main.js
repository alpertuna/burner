/**
 * js/main.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.04.2016
 */

'use strict';

require.config({
    'paths': {
        'burner': '../src'
    }
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
    'burner/ui/Breadcrumb',
    'burner/ui/Message',
    'burner/ui/Tree',
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
    Breadcrumb,
    Message,
    Tree,
    createClass,
    EventHandler,
    Ajax,
    AjaxGroup
){
    /*window.Document = Document;
    window.Button = Button;
    window.Label = Label;*/

    Document.new()
    .add(
        Tree.new([
            {
                'icon': 'bolt',
                'title': 'Root 1',
                'subItems': [
                    {
                        'icon': 'bell',
                        'title': 'Sub Item 1',
                        'subItems': [
                            {
                                'icon': 'cog',
                                'title': 'Sub sub item'
                            }
                        ]
                    },
                    {
                        'icon': 'bell',
                        'title': 'Sub sub item',
                        'subItems': [
                            {
                                'icon': 'cog',
                                'title': 'Sub sub item'
                            },
                            {
                                'icon': 'cog',
                                'title': 'Sub sub item'
                            }
                        ]
                    },
                    {
                        'icon': 'bell',
                        'title': 'Sub Item 1',
                        'subItems': [
                            {
                                'icon': 'cog',
                                'title': 'Sub sub item'
                            }
                        ]
                    }
                ]
            },
            {
                'icon': 'user',
                'title': 'Root 2',
                'subItems': [
                    {
                        'icon': 'cog',
                        'title': 'Sub sub item',
                        'subItemCallBack': function(callBack){
                            setTimeout(callBack.bind(this, [
                                {
                                    'icon': 'cog',
                                    'title': 'Sub sub item'
                                },
                                {
                                    'icon': 'cog',
                                    'title': 'Sub sub item'
                                }
                            ]), 2000);
                        }
                    }
                ]
            }
        ])
    )
})
