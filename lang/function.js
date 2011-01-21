Function.prototype.bind = function (context) {
	if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
	var __method = this, args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var array = Array.prototype.slice.call(args,0);
		var arrayLength = array.length;
		var argumentsLength = arguments.length;
		while(argumentsLength--){
			array[arrayLength + argumentsLength] = arguments[argumentsLength];
		}
		return __method.apply(context, array);
	}
}