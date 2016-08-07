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
    'burner/core/createClass',
    'burner/core/EventHandler',
    'burner/core/Utils',
    'burner/ui/Document',
    'burner/ui/Element',
    'burner/ui/Label',
    'burner/ui/Button',
    'burner/ui/Input',
    'burner/ui/Group',
    'burner/ui/Breadcrumb',
    'burner/ui/Spinner',
    'burner/ui/Check',
    'burner/ui/CheckGroup',
    'burner/ui/RadioGroup',
    'burner/ui/Switch',
    'burner/ui/List',
    'burner/ui/Dropdown',
    'burner/ui/Message',
    'burner/ui/Notifier',
    'burner/ui/Popup',
    'burner/ui/Tip',
    'burner/ui/Icon',
    'burner/core/Ajax',
    'burner/core/AjaxGroup'
    //'burner/ui/Tree',
], function(
    createClass,
    EventHandler,
    Utils,
    Document,
    Element,
    Label,
    Button,
    Input,
    Group,
    Breadcrumb,
    Spinner,
    Check,
    CheckGroup,
    RadioGroup,
    Switch,
    List,
    Dropdown,
    Message,
    Notifier,
    Popup,
    Tip,
    Icon,
    Ajax,
    AjaxGroup,
    Tree
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
    var a = Ajax.new('ajaxtest.php').on('success', function(d){
        console.log(d);
    }).on('always', function(respond){
        ai.hide();
        ab1.setDisabled(false);
        ab2.setDisabled(false);
    });
    var ag = AjaxGroup.new().setMaxConnection(3).on('change', function(){
        agl.setCaption(this.countConnections());
    }).on('openedFirstConnection', function(){
        agi.show();
    }).on('closedLastConnection', function(){
        agi.hide();
    });
    var i, c, s, l, dd, tb1, tb2, tb3, tb4, pb1, pb2, pb3, pb4, ab1, ab2, ai, agb, agl, agi;
    Document.new().add(
        /*//Labels
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
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Check Themes'),
            Check.new(),
            Check.new().setTheme('PRIMARY'),
            Check.new().setTheme('WARNING'),
            Check.new().setTheme('INFO'),
            Check.new().setTheme('DANGER'),
            Check.new().setTheme('SUCCESS')
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

        //List
        Element.new('h2').add('List'),
        Group.new('SPACED').add(
            Label.new('List w Events'),
            l = List.new([
                {
                    'title': 'Record 1',
                    'value': 1
                },
                {
                    'title': 'Record 2',
                    'value': 2
                },
                {
                    'title': 'A Long Named Record',
                    'value': 3
                }
            ]).on('change', function(e){
                console.log(e.value);
            }),
            Button.new('Set Value to 2').on('click', function(){
                l.setValue(2);
            }),
            Button.new('Set Default Value to 2').on('click', function(){
                l.setDefaultValue(2);
            }),
            Button.new('Reset Value').on('click', function(){
                l.resetValue();
            })
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('List w Scrollbar'),
            List.new((function(){
                var records = [];
                for(var i = 0; i < 20; i++){
                    records.push({
                        'title': 'Record ' + i,
                        'value': i
                    });
                }
                return records;
            })()).setHeight('164px'),
            Label.new('Disabled List'),
            List.new([
                {
                    'title': 'Record 1',
                    'value': 1
                },
                {
                    'title': 'Record 2',
                    'value': 2
                },
                {
                    'title': 'A Long Named Record',
                    'value': 3
                }
            ]).setValue(2).setDisabled(true),
            Label.new('List w Separator'),
            List.new([
                {
                    'title': 'Record 1',
                    'value': 1
                },
                {
                    'title': 'Record 2',
                    'value': 2
                },
                {
                    'type': 'SEPARATOR',
                    'title': 'Separator w Title'
                },
                {
                    'title': 'A Long Named Record',
                    'value': 3
                },
                {
                    'type': 'SEPARATOR'
                },
                {
                    'title': 'Last Record',
                    'value': 4
                }
            ])
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('List Theme'),
            List.new([{'title': 'Record 1','value': 1},{'title': 'Record 2','value': 2},{'title': 'A Long Named Record','value': 3}]).setValue(2).setTheme('PRIMARY'),
            List.new([{'title': 'Record 1','value': 1},{'title': 'Record 2','value': 2},{'title': 'A Long Named Record','value': 3}]).setValue(2).setTheme('SUCCESS'),
            List.new([{'title': 'Record 1','value': 1},{'title': 'Record 2','value': 2},{'title': 'A Long Named Record','value': 3}]).setValue(2).setTheme('DANGER'),
            List.new([{'title': 'Record 1','value': 1},{'title': 'Record 2','value': 2},{'title': 'A Long Named Record','value': 3}]).setValue(2).setTheme('WARNING'),
            List.new([{'title': 'Record 1','value': 1},{'title': 'Record 2','value': 2},{'title': 'A Long Named Record','value': 3}]).setValue(2).setTheme('INFO')
        ),
        genSpace(),
        Label.new('Block List'),
        List.new([
            {
                'title': 'Record 1',
                'value': 1
            },
            {
                'title': 'Record 2',
                'value': 2
            },
            {
                'title': 'A Long Named Record',
                'value': 3
            }
        ]).setBlock(true),

        //Dropdown
        Element.new('h2').add('Dropdown'),
        Group.new('SPACED').add(
            Label.new('Dropdown w Event'),
            dd = Dropdown.new([
                {
                    'title': 'Record 1',
                    'value': 1
                },
                {
                    'title': 'Record 2',
                    'value': 2
                }
            ]).on('change', function(e){
                console.log(e.value);
            }),
            Button.new('Set Value to 2').on('click', function(){
                dd.setValue(2);
            }),
            Button.new('Set Default Value to 2').on('click', function(){
                dd.setDefaultValue(2);
            }),
            Button.new('Reset Value').on('click', function(){
                dd.resetValue();
            })
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Dropdown w Separator'),
            Dropdown.new([
                {
                    'title': 'Record 1',
                    'value': 1
                },
                {
                    'title': 'Record 2',
                    'value': 2
                },
                {
                    'type': 'SEPARATOR',
                    'title': 'Separator w Title'
                },
                {
                    'title': 'Record 3',
                    'value': 3
                },
                {
                    'type': 'SEPARATOR'
                },
                {
                    'title': 'Record 4',
                    'value': 4
                }
            ]).on('change', function(e){
                console.log(e.value);
            })
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Dropdown w Long Record'),
            Dropdown.new((function(){
                var records = [];
                for(var i = 0; i < 20; i++){
                    records.push({
                        'title': 'Record ' + i,
                        'value': i
                    });
                }
                return records;
            })())
        ),

        //Group
        Element.new('h2').add('Group'),
        Group.new('SPACED').add(
            Group.new().add(
                Label.new('Label'),
                Button.new('Button'),
                Dropdown.new([
                    {'title': 'Dropdown', 'value': 1},
                    {'title': 'Another Item', 'value': 2}
                ]),
                Check.new(),
                Check.new('x1').bind(rg),
                Switch.new(),
                Spinner.new(),
                Input.new()
            )
        ),
        genSpace(),
        Group.new('SPACED').add(
            Group.new().add(
                Label.new('Label'),
                Button.new('Button'),
                Dropdown.new([
                    {'title': 'Dropdown', 'value': 1},
                    {'title': 'Another Item', 'value': 2}
                ]),
                Check.new(),
                Check.new('x2').bind(rg),
                Switch.new(),
                Spinner.new(),
                Input.new()
            )
        ).setDisabled(true),
        Element.new('h2').add('Block Group'),
        Group.new('BLOCK').add(
            Label.new('Label'),
            Button.new('Button'),
            Dropdown.new([
                {'title': 'Dropdown', 'value': 1},
                {'title': 'Another Item', 'value': 2}
            ]),
            Check.new(),
            Check.new('x2').bind(rg),
            Switch.new(),
            Spinner.new(),
            Input.new()
        ),
        genSpace(),
        Group.new('BLOCK').add(
            Button.new('Button'),
            Input.new()
        ),

        //Breadcrumb
        Element.new('h2').add('Breadcrumb'),
        Group.new('SPACED').add(
            Label.new('Breadcrumb'),
            Breadcrumb.new().add(
                Label.new('Label'),
                Button.new('A Button'),
                Button.new('Another Button'),
                Button.new('Another Button More')
            )
        ),
        genSpace(),
        Group.new('SPACED').add(
            Label.new('Spaced Breadcrumb'),
            Breadcrumb.new('SPACED').add(
                Label.new('Label'),
                Button.new('A Button'),
                Button.new('Another Button'),
                Button.new('Another Button More')
            )
        ),
        genSpace(),
        Breadcrumb.new().add(
            Label.new('Label'),
            b = Button.new('Button'),
            Dropdown.new([
                {'title': 'Dropdown', 'value': 1},
                {'title': 'Another Item', 'value': 2}
            ]),
            Check.new(),
            Check.new('x3').bind(rg),
            Switch.new(),
            Spinner.new()
        ),
        genSpace(),
        Breadcrumb.new('SPACED').add(
            Label.new('Label'),
            b = Button.new('Button'),
            Dropdown.new([
                {'title': 'Dropdown', 'value': 1},
                {'title': 'Another Item', 'value': 2}
            ]),
            Check.new(),
            Check.new('x3').bind(rg),
            Switch.new(),
            Spinner.new()
        ),

        //Message
        Element.new('h2').add('Message'),
        Message.new('Default Message'),
        genSpace(),
        Message.new('Primary Message', 'PRIMARY'),
        genSpace(),
        Message.new('Success Message', 'SUCCESS'),
        genSpace(),
        Message.new('Warning Message', 'WARNING'),
        genSpace(),
        Message.new('Danger Message', 'DANGER'),
        genSpace(),
        Message.new('Info Message', 'INFO'),

        //Notifier
        Element.new('h2').add('Notifier'),
        Group.new('SPACED').add(
            Button.new('Notify Message').on('click', function(){
                Notifier.new('Message')
            }),
            Button.new('Notify Primary Message').on('click', function(){
                Notifier.new('Primary Message', 'PRIMARY')
            }),
            Button.new('Notify Warning Message').on('click', function(){
                Notifier.new('Warning Message', 'WARNING')
            }),
            Button.new('Notify Danger Message').on('click', function(){
                Notifier.new('Danger Message', 'DANGER')
            }),
            Button.new('Notify Success Message').on('click', function(){
                Notifier.new('Success Message', 'SUCCESS')
            }),
            Button.new('Notify Info Message').on('click', function(){
                Notifier.new('Info Message', 'INFO')
            })
        ),

        //Tip
        Element.new('h2').add('Tip'),
        Group.new('SPACED').add(
            tb1 = Button.new('Button'),
            tb2 = Button.new('Button'),
            tb3 = Button.new('Button'),
            tb4 = Button.new('Button')
        ),

        //Popup
        Element.new('h2').add('Popup'),
        Group.new('SPACED').add(
            pb1 = Button.new('Button with Popup opens with Click')
        ),

        //Ajax
        Element.new('h2').add('Ajax'),
        Group.new('SPACED').add(
            ab1 = Button.new('GET Request').on('click', function(){
                ai.show();
                ab1.setDisabled(true);
                ab2.setDisabled(true);
                a.setMethod('GET').send({
                    'action': 'select',
                    'recordId': 2
                });
            }),
            ab2 = Button.new('POST Request').on('click', function(){
                ai.show();
                ab1.setDisabled(true);
                ab2.setDisabled(true);
                a.setMethod('POST').send({
                    'action': 'insert',
                    'record': {
                        'name': 'H.Alper Tuna',
                        'email': 'halpertuna@gmail.com'
                    }
                });
            }),
            ai = Label.new().setIcon('cog fa-spin').hide()
        ),

        //Ajax Group
        Element.new('h2').add('Ajax Group'),
        Group.new('SPACED').add(
            Label.new('Limited Connection'),
            agb = Button.new('A Request').on('click', function(){
                Ajax.new('ajaxtest.php')
                    .on('success', function(d){
                        console.log(d);
                    })
                    .bind(ag)
                    .send({
                        'action': 'a_request'
                    });
            }),
            agl = Label.new('0').setBoxed(true),
            agi = Label.new().setIcon('cog fa-spin').hide()
        )*/
    );

    /*Popup.new().add(
        Element.new().setStyle({
            'width': '320px',
            'height': '300px',
            'line-height': '300px',
            'text-align': 'center',
            'background': '#EEE',
            'border': '1px solid #999'
        }).add(
            'Popup'
        )
    )
        .bind(pb1, 'CLICK')
        .setDirection('RIGHT', 'TOP');

        window.pb1 = pb1;


    Tip.new('Tip at right with this message').bind(tb1, 'HOVER').setDirection('RIGHT');
    Tip.new('Tip at top with this message').bind(tb2, 'HOVER').setDirection('TOP');
    Tip.new('Tip at bottom with this message').bind(tb3, 'HOVER').setDirection('BOTTOM');
    Tip.new('Tip at left with this message').bind(tb4, 'HOVER').setDirection('LEFT');*/
})
