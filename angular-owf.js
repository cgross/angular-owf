angular.module('cgOwf',[]);

angular.module('cgOwf').factory('owf',['$q',function($q){

    var wrapWithPromiseFn = function(parentObj,fnName,callbackArgIndex){
      parentObj['_' + fnName] = parentObj[fnName];
      parentObj[fnName] = function(){
        var defer = $q.defer();
        var origCallback = arguments[callbackArgIndex];
        var callback = function(){
            var val;
            if (arguments.length === 1){
              val = arguments[0];
            } else if (arguments.length > 1){
              val = arguments;
            }
            if (origCallback){
              origCallback.apply(undefined,arguments);
            }
            defer.resolve(val);
        };

        var args = Array.prototype.slice.call(arguments,0,callbackArgIndex);
        args.push(callback);

        parentObj['_' + fnName].apply(parentObj,args);

        return defer.promise;
      };
    };

    if (OWF.Util && OWF.Util.isRunningInOWF()){
        wrapWithPromiseFn(OWF,'getOpenedWidgets',0);
        wrapWithPromiseFn(OWF.Launcher,'launch',1);
        wrapWithPromiseFn(OWF.RPC,'getWidgetProxy',1);

        return OWF;
    } else {
        return {
            getOpenedWidgets: function(){},
            ready: function(){},
            Launcher: {
                launch: function(){},
                getLaunchData: function(){}
            },
            Eventing: {
                publish:function(){},
                subscribe:function(){},
                unsubscribe:function(){},
            },
            RPC: { registerFunctions: function(){} }
        };
    }
}]);

(function(){

    var bootstrapper = document.querySelectorAll('[owf-app]');
    if (bootstrapper.length > 0){
        if (!OWF){
            throw new Error('Angular-owf found an owf-app directive but OWF global was not found.');
        }
        if (!OWF.Util.isRunningInOWF()){
            console.warn('[angular-owf]','Not running in OWF container. Bootstraping angular app now and proceeding with noop mocks.');
            angular.element(document).ready(function(){
                var moduleName = bootstrapper[0].getAttribute('owf-app');
                angular.bootstrap(bootstrapper[0], moduleName ? [moduleName] : []);
            });
        } else {
            OWF.ready(function(){
                var moduleName = bootstrapper[0].getAttribute('owf-app');
                angular.bootstrap(bootstrapper[0], moduleName ? [moduleName] : []);
            });
        }
    }
})();
