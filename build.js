({
    paths: {
        'burner': 'src'
    },
    /*shim: {
        'burner/third/x': true
    },*/
    wrapShim: true,
    name: 'license',
    /*preserveLicenseComments: false,*/
    include:[
        'burner/core/createClass',
        'burner/core/Ajax',
        'burner/core/AjaxGroup',
        'burner/core/EventHandler',
        'burner/core/Utils',

        'burner/ui/Breadcrumb',
        'burner/ui/Button',
        'burner/ui/Check',
        'burner/ui/CheckGroup',
        'burner/ui/ComponentContainer',
        'burner/ui/Document',
        'burner/ui/Dropdown',
        'burner/ui/Element',
        'burner/ui/Group',
        'burner/ui/Icon',
        'burner/ui/Input',
        'burner/ui/Label',
        'burner/ui/List',
        'burner/ui/Message',
        'burner/ui/Notifier',
        'burner/ui/Popup',
        'burner/ui/RadioGroup',
        'burner/ui/Spinner',
        'burner/ui/Switch',
        'burner/ui/TextElement',
        'burner/ui/Tip',

        'burner/ui/utils/setTheme',
        'burner/ui/utils/SpaceFinder',

        'burner/ui/interfaces/iComponent',
        'burner/ui/interfaces/iInput'
    ]
})
