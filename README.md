# angular-owf

> Angular service wrapper for the OWF's widget javascript library.

## Features

 * Provides a service wrapper around the global `OWF` object.  You may now inject `owf` into a controller or any other angular component.  This allows for easier mocking of the OWF global in unit tests.  The `owf` object points to `OWF` thus you can write calls like `owf.Launcher.launch(...)` as would normally against `OWF`.

 * Includes an optional `owf-app` directive.  This directive will ensure that OWF's ready event is fired before launching your angular app.  Just replace your normal `ng-app="myModule"` with `owf-app="MyModule"`.

 * Modifies various asynchronous OWF methods so they now return $q promises. If the original callback would have been called with one argument, the promise will be resolved to that value.  If the callback would have been called with multiple arguments, the promise will be resolved with an array of those argument values. Currently the only promise-ified methods are:
  * `OWF.getOpenedWidgets()`
  * `OWF.Launcher.launch(...)`
  * `OWF.RPC.getWidgetProxy(...)`

## Getting Started

Install with Bower or download the the files directly from the repo.

```bash
bower install angular-owf --save
```

Add `angular-owf.js` to your index.html. This library also depends on the [OWF Bower package](https://github.com/cgross/owf-bower) and you'll need to add its `owf-widget-min.js` from it or from OWF directly.

Add `cgOwf` as a module dependency for your module.

```js
angular.module('your_app', ['cgOwf']);
```

Then inject and use the `owf` service.

```js
function myController($scope,owf){  // <-- Inject owf

    owf.Launcher.launch({
        universalName: 'widget.company.com'
    }).then(function(){
        console.log('Widget launched!');
    });

}
```

## Running Outside of OWF

When running outside of an OWF contained widget, this service will instead contain various noop versions of the standard OWF methods.  The noop-ed methods include `OWF.ready()`, `OWF.getOpenedWidgets()`, `OWF.Launcher.launch()`, `OWF.Launcher.getLaunchData()`, `OWF.RPC.registerFunctions()`, `OWF.Eventing.publish()`, `OWF.Eventing.subscribe()`, and `OWF.Eventing.unsubscribe()`.  

## Release History
 * 9/5/2012 - v0.2.1
    * Ensure OWF contains a Util property to determine if we're running an OWF widget (instead of running inside the OWF frame itself).
    * Added methods from OWF.Eventing to the noops when running outside of OWF.
    * Changed bootstraping code when using `owf-app` so that the app will be automatically bootstrapped/launched when not running inside OWF.
 * 6/17/2014 - v0.2.0 - Added getWidgetProxy to the promise-ified methods.  Added noop methods when outside of OWF.
 * 5/31/2014 - v0.1.0 - Initial release
