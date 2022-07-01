function init() {
	console.log("init start");
	
	Module.Start(window.innerWidth, window.innerHeight - 200);
	Module.getViewCamera().setLocation(new Module.JSVector3D(129.13782351349964, 35.17887462859219, 8000));

	console.log("init end");
}
