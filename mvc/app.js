var App = Class.create({
	properties: {
		
	},
	methods: {
		initialize: function(config){
			config.config = config.config || {};
			for(var name in config.config){
				this.set(name, config.config[name],{ silent: true});
			}
			this.router = new Router(config.routers || {});
		},
		start: function(){
			this._interval = setInterval(function(){
				this.router.dispatch(window.location);
			}.bind(this), 100);
		},
		stop: function(){
			stopInterval(this._interval);
		},
		listen: function(){
			window.onload=this.start.bind(this);
		},
		redirect: function(location){
			window.location = window.location.protocol + '//' + window.location.host + '/#' + location;
		}
	}
});