/**
 * Created by abdou on 01/04/17.
 */
//todo dependency_injector
Function.prototype.run = function (thisArg,dependencies) {
    if(typeof dependencies !== 'object' || dependencies == null || dependencies.constructor === Array)
        throw 'error in params type';

    //from: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
    var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    function getParamNames(func) {
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }
    //**************

    var params = getParamNames(this);
    var args = [];
    var l = params.length;

    for(var i = 0 ; i < l ; ++i){
        if(dependencies.hasOwnProperty(params[i])){
            args.push(dependencies[params[i]])
        }else{
            args.push(undefined);
        }
    }

    return this.apply(thisArg,args);
};
