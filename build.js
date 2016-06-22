({
    paths: {
        'burner': 'src'
    },
    shim: {
        'burner/third/date.format': true
    },
    wrapShim: true,
    name: 'license',
    /*preserveLicenseComments: false,*/
    include:[
        'burner/third/date.format',
        'burner/core/Utils',
        'burner/core/EventHandler',
        'burner/core/createClass',
        'burner/core/AjaxGroup',
        'burner/core/Ajax',
        'burner/ui/Element',
        'burner/ui/Switch',
        'burner/ui/TextElement',
        'burner/ui/iInput',
        'burner/ui/Group',
        'burner/ui/Icon',
        'burner/ui/Popup',
        'burner/ui/CheckGroup',
        'burner/ui/Input',
        'burner/ui/Button',
        'burner/ui/Label',
        'burner/ui/Notifier',
        'burner/ui/Document',
        'burner/ui/Spinner',
        'burner/ui/DatePicker',
        'burner/ui/Check',
        'burner/ui/Tip',
        'burner/ui/TimePicker',
        'burner/ui/RadioGroup',
        'burner/ui/DropdownPopup',
        'burner/ui/Dropdown',
        'burner/ui/DatePickerPopup'
    ]
})
