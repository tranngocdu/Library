exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  buildTarget: 'iOS'

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: [
          'vendor/scripts/cordova/cordova-2.4.0.js',
          'vendor/scripts/cordova/plugins/ChildBrowser.js',
          'vendor/scripts/cordova/plugins/Filepicker.js',
          'vendor/scripts/jquery-1.9.1.min.js',
          'vendor/scripts/jquery.mobile-1.3.1.min.js'
          'vendor/scripts/backbone/underscore-1.4.4-min.js',
          'vendor/scripts/backbone/json2.js',
          'vendor/scripts/backbone/backbone1.0-min.js',
          'vendor/scripts/backbone/backstack.js',
          'vendor/scripts/parse-1.2.12.min.js',
          'vendor/scripts/bg-options.js'
        ]

    stylesheets:
      defaultExtension: 'scss'
      joinTo: 'stylesheets/app.css'
      order:
        before: [
          'vendor/styles/normalize.css',
          'jquery.mobile.1.3.1.min.css'
        ]
        after: ['']

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js'

