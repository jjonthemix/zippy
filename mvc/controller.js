var Controller = Class.create({
	properties: {},
	methods: {
		onLoad: function(){
			
		},
		onUnload: function(){
			
		},
		doOnLoad: function(){
			this.onLoad();
		},
		doOnUnload: function(){
			this.onUnload();
			this._app._context.innerHTML = '';
		},
		initialize: function(app){
			this._app = app;
			this._view = this._app._view;
			this.prepare();
		},
		prepare: function(){
			
		},
		render: function(template,params){
			var body = this._view.render(template,params);
			this._app._context.innerHTML = body;
		}
	}
});