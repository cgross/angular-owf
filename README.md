# angular-owf

> Angular service wrapper for the OWF's widget javascript library.

## Features

 * Provides a service wrapper around the global `OWF` object.  You may now inject `owf` into a controller or any other angular component.  This allows for easier mocking of the OWF global in unit tests.  The `owf` object points to `OWF` thus you can write calls like `owf.Launcher.launch(...)` as would normally against `OWF`.

 * Includes an optional `owf-app` directive.  This directive will ensure that OWF's ready event is fired before launching your angular app.  Just replace your normal `ng-app="myModule"` with `owf-app="MyModule"`.

 * Modifies various asynchronous OWF methods so they now return $q promises. If the original callback would have been called with one argument, the promise will be resolved to that value.  If the callback would have been called with multiple arguments, the promise will be resolved with an array of those argument values. Currently the only promise-ified methods are:
  * `OWF.getOpenedWidgets()`
  * `OWF.Launcher.launch(...)`  

## Release History
 * 5/31/2014 - v0.1.0 - Initial release
