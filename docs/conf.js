(function () {
    var file = "./Engine/XDWorldEM.asm.js";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onload = function () {

        var script = document.createElement('script');
        script.innerHTML = xhr.responseText;
        document.body.appendChild(script);

        // 2. XDWorldEM.html.mem 파일 로드
        setTimeout(function () {
            (function () {
                var memoryInitializer = "./Engine/XDWorldEM.html.mem"
                var xhr = Module['memoryInitializerRequest'] = new XMLHttpRequest();
                xhr.open('GET', memoryInitializer, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function (e) {
                    // 3. XDWorldEM.js 파일 로드
                    var url = "./Engine/XDWorldEM.js?p=";
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onload = function () {
                        var script = document.createElement('script');
                        script.innerHTML = xhr.responseText;
                        document.body.appendChild(script);
                    };
                    xhr.send(null);
                };
                xhr.send(null);
            })();
        }, 1);
    };
    xhr.send(null);

})();

var Module = {
    TOTAL_MEMORY: 256 * 1024 * 1024,
    postRun: [init],
    canvas: (function () {

        var canvas = document.createElement('canvas');

        canvas.id = "canvas";
        canvas.width = "calc(100%)";
        canvas.height = "100%";

        canvas.style.position = "fixed";
        canvas.style.top = "0px";
        canvas.style.left = "0px";

        canvas.addEventListener("contextmenu", function (e) {
            //console.log(Module.canvas.getContext);
            e.preventDefault();
        });
        /*
        canvas.addEventListener("Fire_EventSelectedObject", function (e) {
            //console.log(e);

            let map = Module.getMap();

            let layerList = new Module.JSLayerList(false);
            let layer = layerList.nameAtLayer("dg_officetel_buld_in_level_12");

            console.log(e.objKey);

            let object = layer.keyAtObject("13_C.3ds");
            map.addSelectObject(object);

            //map.setSelectObject(layer.keyAtObject(e.objKey));

            //Module.getMap().addSelectObject(new Module.JSVector2D(e.x, e.y));
        });
        */
        document.body.appendChild(canvas);


        console.log("canavas");

        return canvas;
    })()
};

function init() {
    var ieMode = false;
    var isDevice;
    if (/iPhone/i.test(navigator.userAgent))
        isDevice = 0;
    else if (/iPad/i.test(navigator.userAgent))
        isDevice = 1;
    else if (/Android|android/i.test(navigator.userAgent))
        isDevice = 2;
    else if (/Mac/i.test(navigator.userAgent))
        isDevice = 3;
    else if (/Windows||windows/i.test(navigator.userAgent))
        isDevice = 4;
    else if (/10.0/i.test(navigator.userAgent))
        isDevice = 5;
    else if (/WOW64/i.test(navigator.userAgent))
        isDevice = 6;
    else
        isDevice = 6;

    var agent = navigator.userAgent.toLowerCase();
    // IE
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1))
        ieMode = true;

    Module.SetAPIKey("767B7ADF-10BA-3D86-AB7E-02816B5B92E9");

    // ryong 20180905 디바이스 구분
    if (isDevice < 3)
        Module.SetMobileMode(2); // 모바일
    else if (2 < isDevice) {
        if (ieMode)
            Module.SetMobileMode(2); // 데스크탑
        else
            Module.SetMobileMode(0); // 데스크탑
    }

    console.log("init");
    init();
}