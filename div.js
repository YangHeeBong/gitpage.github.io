let m_element;

function init() {
	Module.Start(window.innerWidth, window.innerHeight - 200);
	Module.getViewCamera().setLocation(new Module.JSVector3D(129.13782351349964, 35.17887462859219, 8000));
	createDivObject();
}

function createDivObject() {

	var layerList = new Module.JSLayerList(true);
	let layer = layerList.createLayer("HTML_OBJEC_LAYER", Module.ELT_POLYHEDRON);//일반
	layer.setMaxDistance(10000);

	//let element = document.createElement("div");
	m_element = document.createElement("div");
	let parameter = {
		position: new Module.JSVector3D(129.13782351349964, 35.17887462859219, 200.0),	// 위치 지점
		container: "divcontainer",	// div를 담을 Container 명칭 지정(명칭에 해당되는 div가 없다면 createHTMLObject 작업중 생성)
		canvas: Module.canvas,	// 화면 사이즈 설정을 위한 canvas 설정
		element: m_element,	// 엔진 오브젝트와 연동할 HTML Element
		verticalAlign: "middle",	// 수직 정렬 (top, middle, bottom, px 지원 )	|| 태그 미 설정 시 [Default top]
		horizontalAlign: "center",	// 수평 정렬 (left, center, right, px 지원 )	|| 태그 미 설정 시 [Default left]
	};

	let object = Module.createHTMLObject("div_object");
	let complet = object.createbyJson(parameter);
	console.log(complet);

	if (complet.result == 1) {
		layer.addObject(object, 0);
		//createUI(element);
	}
}

function start() {
	createUI(m_element);
}

// m3u8 동영상 플레이 방법
function createUI(_element) {
	let ele = document.getElementById(_element.id);
	let video_element = document.createElement("video");
	video_element.style.width = "400px";
	var hls = new Hls();
	hls.loadSource("http://61.43.246.227:1935/rtplive/cctv_242.stream/playlist.m3u8");
	hls.attachMedia(video_element);
	hls.on(Hls.Events.MANIFEST_PARSED, function () {
		video_element.play();
	});
	ele.append(video_element);
}