/**
 * js/main.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 11.04.2016
 */

'use strict';

require.config({
    /*'baseUrl': 'js',
    'paths':{
        'core': 'burner/core',
        'ui': 'burner/ui',
        'third': 'burner/third'
    },*/
    /*'shim': {
        'third/date.format': true
    }*/
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
    'burner/ui/CheckGroup',
    'burner/ui/RadioGroup',
    'burner/ui/Switch',
    'burner/ui/DatePicker',
    'burner/ui/Spinner',
    'burner/ui/TimePicker',
    'burner/core/createClass',
    'burner/core/EventHandler',
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
    CheckGroup,
    RadioGroup,
    Switch,
    DatePicker,
    Spinner,
    TimePicker,
    createClass,
    EventHandler
){
    $(function(){
        $('.language-js').each(function(){
            var demo = eval(this.innerText.replace('Document.new()', 'Element.new().addClass(\'demo\')'));
            demo.add(
                Element.new().addClass('code-label').add('Demo')
            );
            $(this).addClass('language-javascript').append(
                Element.new().addClass('code-label').add('Source Code').getDom()
            ).parent().before(demo.getDom());
        });

        if(location.hash)
            $('.body').scrollTop($('.body').scrollTop() + $(location.hash).offset().top - 49);
    })
})
