var App = Class.create({
	properties: {
		
	},
	methods: {
		initialize: function(context, config){
			this._context = document.getElementById(context) || document.body;
			config = config || {};
			for(var name in config){
				if(name !== 'routers'){
					this.set(name, config.config[name],{ silent: true});
				}
			}	
		},
		start: function(){
			this._interval = setInterval(function(){
				this.router.dispatch(window.location);
			}.bind(this), 100);
		},
		stop: function(){
			stopInterval(this._interval);
		},
		listen: function(routers){
			for(var name in routers){
				routers[name] = new routers[name](this);
			}
			this.router = new Router(routers);
			this.start();
			//window.onload=this.start.bind(this);
		},
		redirect: function(location){
			window.location = window.location.protocol + '//' + window.location.host + '/#' + location;
		},
		setViewAdapter: function(adapter){
			this._view = adapter;
		}
	}
});