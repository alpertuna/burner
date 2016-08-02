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
    'burner/ui/Spinner',
    'burner/ui/Check',
    'burner/ui/CheckGroup',
    'burner/ui/RadioGroup',
    'burner/ui/Switch',
    'burner/ui/Dropdown',
    /*'burner/ui/Tip',
    'burner/ui/DatePicker',
    'burner/ui/TimePicker',
    'burner/ui/Notifier',
    'burner/ui/Breadcrumb',
    'burner/ui/Message',
    'burner/ui/Tree',
    'burner/core/createClass',
    'burner/core/EventHandler',
    'burner/core/Ajax',
    'burner/core/AjaxGroup',*/
    'burner/third/date.format'
], function(
    Utils,
    Document,
    Element,
    Label,
    Button,
    Input,
    Group,
    Spinner,
    Check,
    CheckGroup,
    RadioGroup,
    Switch,
    Dropdown,
    Tip,
    DatePicker,
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

    function genSpace(){
        return Element.new().add('&nbsp;');
    }

    var b = Button.new('Button w Label');
    var cg = CheckGroup.new().on('change', function(e){
        console.log(e.value);
    });
    var rg = RadioGroup.new().on('change', function(e){
        console.log(e.value);
    });
    var i, c, s;
    Document.new().add(
        //Labels
        Element.new('h2').add('Labels'),
        Group.new('SPACED').add(
            Label.new('Label'),
            Label.new('Label w Icon').setIcon('bolt'),
            Label.new('Boxed Label').setBoxed(true),
            Label.new('Boxed Label w Icon').setBoxed(true).setIcon('bolt')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Label Normal'),
            Label.new('Label Primary').setTheme('PRIMARY'),
            Label.new('Label Success').setTheme('SUCCESS'),
            Label.new('Label Danger').setTheme('DANGER'),
            Label.new('Label Warning').setTheme('WARNING'),
            Label.new('Label Info').setTheme('INFO')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Boxed Label Normal').setBoxed(true),
            Label.new('Boxed Label Primary').setBoxed(true).setTheme('PRIMARY'),
            Label.new('Boxed Label Success').setBoxed(true).setTheme('SUCCESS')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Boxed Label Danger').setBoxed(true).setTheme('DANGER'),
            Label.new('Boxed Label Warning').setBoxed(true).setTheme('WARNING'),
            Label.new('Boxed Label Info').setBoxed(true).setTheme('INFO')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Disabled Label Normal').setDisabled(true),
            Label.new('Disabled Label Primary').setDisabled(true).setTheme('PRIMARY'),
            Label.new('Disabled Label Success').setDisabled(true).setTheme('SUCCESS'),
            Label.new('Disabled Label Danger').setDisabled(true).setTheme('DANGER'),
            Label.new('Disabled Label Warning').setDisabled(true).setTheme('WARNING'),
            Label.new('Disabled Label Info').setDisabled(true).setTheme('INFO')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Disabled Boxed Label Normal').setBoxed(true).setDisabled(true),
            Label.new('Disabled Boxed Label Primary').setBoxed(true).setDisabled(true).setTheme('PRIMARY'),
            Label.new('Disabled Boxed Label Success').setBoxed(true).setDisabled(true).setTheme('SUCCESS')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Disabled Boxed Label Danger').setBoxed(true).setDisabled(true).setTheme('DANGER'),
            Label.new('Disabled Boxed Label Warning').setBoxed(true).setDisabled(true).setTheme('WARNING'),
            Label.new('Disabled Boxed Label Info').setBoxed(true).setDisabled(true).setTheme('INFO')
        ),
        genSpace(),

        //Buttons
        Element.new('h2').add('Buttons'),
        Group.new('SPACED').add(
            Label.new('Label for Button').bind(b),
            b,
            Button.new('Button w Icon').setIcon('bolt'),
            Button.new('Button w Click Event').on('click', function(){alert('Hello');})
        ),
        genSpace(),
        Group.new('SPACED').add(
            Button.new('Button Normal'),
            Button.new('Button Primary').setTheme('PRIMARY'),
            Button.new('Button Success').setTheme('SUCCESS'),
            Button.new('Button Danger').setTheme('DANGER'),
            Button.new('Button Warning').setTheme('WARNING'),
            Button.new('Button Info').setTheme('INFO'),
            Button.new('Button Dark').setTheme('DARK')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Button.new('Disabled Button Normal').setDisabled(true),
            Button.new('Disabled Button Primary').setDisabled(true).setTheme('PRIMARY'),
            Button.new('Disabled Button Success').setDisabled(true).setTheme('SUCCESS')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Button.new('Disabled Button Danger').setDisabled(true).setTheme('DANGER'),
            Button.new('Disabled Button Warning').setDisabled(true).setTheme('WARNING'),
            Button.new('Disabled Button Info').setDisabled(true).setTheme('INFO'),
            Button.new('Disabled Button Dark').setDisabled(true).setTheme('DARK')
        ),

        //Inputs
        Element.new('h2').add('Inputs'),
        Group.new('SPACED').add(
            Input.new().setPlaceholder('Input w Placeholder'),
            Input.new().setPlaceholder('Input w Change Event').on('change', function(e){
                alert(e.value)
            })
        ),
        genSpace(),
        Group.new('SPACED').add(
            i = Input.new(),
            Button.new('Set Value').on('click', function(){
                i.setValue(prompt('Type value:'));
            }),
            Button.new('Set Default Value').on('click', function(){
                i.setDefaultValue(prompt('Type value:'));
            }),
            Button.new('Reset Value').on('click', function(){
                i.resetValue();
            }),
            Button.new('Get Value').on('click', function(){
                alert(i.getValue());
            })
        ),
        genSpace(),
        Group.new('SPACED').add(
            Input.new().setPlaceholder('Input Normal'),
            Input.new().setPlaceholder('Input Primary').setTheme('PRIMARY'),
            Input.new().setPlaceholder('Input Success').setTheme('SUCCESS')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Input.new().setPlaceholder('Input Danger').setTheme('DANGER'),
            Input.new().setPlaceholder('Input Warning').setTheme('WARNING'),
            Input.new().setPlaceholder('Input Info').setTheme('INFO')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Input.new().setPlaceholder('Disabled Input Normal').setDisabled(true),
            Input.new().setPlaceholder('Disabled Input Primary').setDisabled(true).setTheme('PRIMARY'),
            Input.new().setPlaceholder('Disabled Input Success').setDisabled(true).setTheme('SUCCESS')
        ),
        genSpace(),
        Group.new('SPACED').add(
            Input.new().setPlaceholder('Disabled Input Danger').setDisabled(true).setTheme('DANGER'),
            Input.new().setPlaceholder('Disabled Input Warning').setDisabled(true).setTheme('WARNING'),
            Input.new().setPlaceholder('Disabled Input Info').setDisabled(true).setTheme('INFO')
        ),

        //Spinners
        Element.new('h2').add('Spinners'),
        Group.new('SPACED').add(
            Label.new('Default Spinner'),
            Spinner.new()
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('5-10 Range'),
            Spinner.new().setMin(5).setMax(10)
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Loop and Padding'),
            Spinner.new().setMin(0).setMax(23).setPad(2).setLoop(true)
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Spinner w Event'),
            Spinner.new().on('change', function(e){
                console.log(e.value);
            })
        ),

        //Checks
        Element.new('h2').add('Checks'),
        Group.new('SPACED').add(
            Label.new('Default Check'),
            Check.new(),
            Label.new('Check w Different Icon'),
            Check.new().setIcon('times'),
            Label.new('Checked Check w Event'),
            Check.new().setValue(true).on('change', function(e){
                console.log(e.value);
            }),
            Label.new('Check to Test'),
            c = Check.new(),
            Button.new('Check').on('click', function(){
                c.setValue(true);
            }),
            Button.new('Uncheck').on('click', function(){
                c.setValue(false);
            }),
            Button.new('Reset Value').on('click', function(){
                c.resetValue();
            }),
            Button.new('Get Value').on('click', function(){
                alert(c.getValue());
            })
        ),

        //Switches
        Element.new('h2').add('Switches'),
        Group.new('SPACED').add(
            Label.new('Default Switch'),
            Switch.new(),
            Label.new('Checked Switch w Event'),
            Switch.new().setValue(true).on('change', function(e){
                console.log(e.value);
            }),
            Label.new('Check to Test'),
            s = Switch.new(),
            Button.new('Check').on('click', function(){
                s.setValue(true);
            }),
            Button.new('Uncheck').on('click', function(){
                s.setValue(false);
            }),
            Button.new('Reset Value').on('click', function(){
                s.resetValue();
            }),
            Button.new('Get Value').on('click', function(){
                alert(s.getValue());
            })
        ),

        //Check Group
        Element.new('h2').add('Check Group'),
        Group.new('SPACED').add(
            Label.new('Check 1'),
            Check.new(1).bind(cg),
            Label.new('Check 2'),
            Check.new(2).bind(cg),
            Label.new('Check 3'),
            Check.new(3).bind(cg)
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Switch 4'),
            Switch.new(4).bind(cg),
            Label.new('Switch 5'),
            Switch.new(5).bind(cg),
            Label.new('Switch 6'),
            Switch.new(6).bind(cg)
        ),
        genSpace(),
        Group.new('SPACED').add(
            Button.new('Set Value to [1, 2]').on('click', function(){
                cg.setValue([1, 2]);
            }),
            Button.new('Set Default Value to [1, 2]').on('click', function(){
                cg.setDefaultValue([1, 2]);
            }),
            Button.new('Reset Value').on('click', function(){
                cg.resetValue();
            })
        ),

        //Radio Group
        Element.new('h2').add('Radio Group'),
        Group.new('SPACED').add(
            Label.new('Radio 1'),
            Check.new(1).bind(rg),
            Label.new('Radio 2'),
            Check.new(2).bind(rg),
            Label.new('Radio 3'),
            Check.new(3).bind(rg)
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Radio 4'),
            Switch.new(4).bind(rg),
            Label.new('Radio 5'),
            Switch.new(5).bind(rg),
            Label.new('Radio 6'),
            Switch.new(6).bind(rg)
        ),
        genSpace(),
        Group.new('SPACED').add(
            Button.new('Set Value to 2').on('click', function(){
                rg.setValue(2);
            }),
            Button.new('Set Default Value to 3').on('click', function(){
                rg.setDefaultValue(3);
            }),
            Button.new('Reset Value').on('click', function(){
                rg.resetValue();
            }),
            Button.new('Focus').on('click', function(){
                rg.focus();
            })
        ),

        //Dropdown
        Element.new('h2').add('Dropdown'),
        Group.new('SPACED').add(
            Label.new('Dropdown'),
            Dropdown.new([
                {
                    'title': 'Record 1',
                    'value': 1
                },
                {
                    'title': 'Record 2',
                    'value': 2
                }
            ])
        )
    )
})
