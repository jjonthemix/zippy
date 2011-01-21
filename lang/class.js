var Class = {};
Class.inherits = function(Child,Parent){
	var Proxy = function () {}; 
	Proxy.prototype = Parent.prototype; 
	Child.prototype = new Proxy(); 
	Child.super = Parent.prototype; 
	Child.prototype.constructor = Child;
}

Class.create = function(){
	var parent;
	var properties;
	var methods;
	
	if(typeof arguments[0] === 'function'){
		parent = Array.prototype.shift.call(arguments);
	}
	
	if(typeof arguments[0] === 'object' && arguments[0]['properties']){
		var properties = arguments[0]['properties'];
	}
	
	if(typeof arguments[0] === 'object' && arguments[0]['methods']){
		var methods = arguments[0]['methods'];
	}
	
	function klass(){
		this._properties = properties || {};
		this._callbacks = {};
		this.initialize.apply(this,arguments);
	}
	
	if(parent){
		Class.inherits(klass,parent);
	}
	
	klass.prototype.get = function(name){
		return this._properties[name];
	}
	
	klass.prototype.set = function(name, value, options){
		var data = {};
		options = options || {};
		if(options && options.silent === false){
			data = {
				'property': name,
				'old': this._properties[name],
				'new': value
			};
		}
		this._properties[name] = value;
		if(options.silent === false){
			this.trigger(name + ':change', data);
		}
	}
	
	klass.prototype.subscribe = function(event, cb){
		if(!this._callbacks[event]){
			this._callbacks[event] = [];
		}
		
		this._callbacks[event].push(cb);
	}
	klass.prototype.trigger = function(event, data){
		if(!this._callbacks[event]){
			return;
		}
		for(var i=0;i<this._callbacks[event].length;i++){
			this._callbacks[event][i](data);
		}
	}
	klass.prototype.unsubscribe = function(event,cb){
		if(!this._callbacks[event]){
			return;
		}
		var stringified = cb.toString();
		for(var i=0;i<this._callbacks[event].length;i++){
			if(stringified == this._callbacks[event][i].toString()){
				this._callbacks[event].splice(i,1);
				break;
			}
		}
	}

	for(var name in methods){
		if(typeof methods[name] === 'function'){
			klass.prototype[name] = methods[name];
		}
	}
	
	if(!klass.prototype.initialize){
		klass.prototype.initialize = function(){
			
		}
	}
	
	return klass;
};