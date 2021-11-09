function add_Even() {
    window.addEventListener("orientationchange", function() {
        // der change hat eine Verzögerung
        window.removeEventListener("orientationchange");
        document.getElementById("page").style.display = 'none';
        delay = setTimeout(function() {
            init_camera();
        }, 1800);
    }, false);

};



function init_camera() {
   if (MediaStreamTrack.getSources){
    MediaStreamTrack.getSources(function(sourceInfos) {
        console.log('Log: function: init_camera');

        var audioSource = null;
        var videoSource = null;

        for (var i = 0; i != sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            if (sourceInfo.kind === 'audio') {
                //   console.log(sourceInfo.id, sourceInfo.label || 'microphone');

                audioSource = sourceInfo.id;
            } else if (sourceInfo.kind === 'video') {
                // console.log(sourceInfo.id, sourceInfo.label || 'camera');

                videoSource = sourceInfo.id;
            } else {
                // console.log('Some other kind of source: ', sourceInfo);
            }
        }

        if (videoSource) {
            arwizard.camera.support = true;
            console.log('Log: There is a Source available');
            selectCameraSource(audioSource, videoSource);
        } else {
            arwizard.camera.support = false;
            console.log('Log: There ist no Source');
            
            //
        };

    });
    
    } else {
    	 arwizard.camera.support = false;
    	console.log('Log: Media Stream not supported');
    };
    addEventhandlerPlaying();
    return 'ok';
};

function selectCameraSource(audioSource, videoSource) {
    var fieldview_w = arwizard.core.fieldview_width;
    var fieldview_h = arwizard.core.fieldview_height;

    if (fieldview_w>fieldview_h){
        
            var camera_w = Math.min(fieldview_w, 480); //HTML5 only support 640/480
            var camera_h = Math.min(fieldview_h, 640);

        
    } else {
            var camera_w = Math.min(fieldview_w, 640); //HTML5 only support 640/480
            var camera_h = Math.min(fieldview_h, 480);
        
    };

    var constraints = {
        audio: false,
        video: {
            optional: [{
                sourceId: videoSource
            }],
            mandatory: {
                "minWidth": camera_w,
                "minHeight": camera_h,
                "maxWidth": camera_w,
                "maxHeight": camera_h
            }
        }
    };


    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
            navigator.getUserMedia(constraints, handleVideo, videoError);
   
    };
    
};


function handleVideo(stream) {
    arwizard.camera.available = true;
    arwizard.camera.error = false;  
    console.log('Log: handleVideo');
    cameraStream = stream; // Global
    var id = arwizard.camera.containerId;
    document.getElementById(id).src = window.URL.createObjectURL(stream);
    document.getElementById(id).autoplay = true;
    };

function videoError(error) {
    console.log(error);
    arwizard.camera.available = false;
    arwizard.camera.error = true;
    arwizard.camera.errorname = error.name;
    if (error.name == 'PermissionDeniedError'){
    arwizard.camera.permission_denied = true;   
    }
};


// AddListener
function addEventhandlerPlaying(){
    var id = arwizard.camera.containerId;
    
    document.getElementById(id).addEventListener('playing', function(event) {
                                arwizard.camera.isPlaying = true;
                                $('#'+arwizard.camera.containerId).show(); 
                                showOverlayerLoadingToggle('','hide');
    }, false);
    
}














