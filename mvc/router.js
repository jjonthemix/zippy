var Router = Class.create({
	properties: {
		
	},
	methods: {
		initialize: function(routers){
			this._routing = routers;
		},
		dispatch: function(loc){
			var location = this.parse(loc.hash || '');
			if(this._location && this._location !== location && this._routing[this._location]){
				this._routing[this._location].doOnUnload();
			}else if(!this._location){
				this._location = location;	
			}else if(this._location === location){
				return;
			}
		
			this._location = location;
			if(this._routing[this._location]){
				this._routing[this._location].doOnLoad();
			}
		},
		parse: function(location){
			if(location.indexOf('#') === 0){
				location = location.substr(1);
			}
			return location;
		}
	}
});