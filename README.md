# JS Burner - A Framework for JavaScript
An amd-based framework focuses on class structure and ui components for javascript.

# Contribute
Framework is very fresh and it is under development now. It needs many arrangements and optimizations or new ideas make it better. Also documentation page may need language fixes.

# Brief Information
This framework does not use package managers like npm. Since it's designed for full of browser usage. That's why it uses AMD (Asyncronous Module Definition). Also this framework has its own class stucture to make writing code closer to object-oriented class logic, and it supports more than javascript's native class structure. To tell usage mentality of framework, this can be said that component classes and methods are like a little Java programming and a little jQuery.

# Install
### Requirements
- [RequireJS](http://requirejs.org/) For AMD module management.
- [Font Awesome](http://fontawesome.io/) Default icon set used in components.

### Installation
Clone repository into wherever you want in your project.
```sh
git clone git@github.com:alpertuna/burner.git
```

Or you can download and extract it.
```sh
tar -xf burner-xxx.tar.gz
```

Then embed stylesheet to your project.
```html
<link rel="stylesheet" href="path/to/burner.min.css" />
```

Add JS Burner Framework bundle script, between RequireJS script and your main script.
```html
<script type="text/javscript" src="path/to/require.js"></script>
<script type="text/javscript" src="path/to/burner.min.js"></script>
<script type="text/javscript" src="path/to/your_main.js"></script>
```
For debugging, you may use non-minified files.


# Usage
To learn how to use it, you should read [documentation](https://alpertuna.github.io/burner).
