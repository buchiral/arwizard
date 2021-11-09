//************************************************************************
//************************************************************************
//ARwizard Object with Configs
var arwizard = new Object();

// Core (Page and Fieldview)
arwizard.core = {
    width: window.innerWidth,
    height: window.innerHeight,
    fieldview_angle: 56,
    fieldview_angleHeight: 56,
    fieldview_width: window.innerWidth,
    fieldview_height: window.innerHeight - 5,
    list_mode_active: false,
    map_mode_active: false
};

// Radar
arwizard.radar = {
	current_radius: 0,
    max_distance: 100,
    widest_distance: 0 // widest distance of all POI
};

// Camera
arwizard.camera = {
    available: false, // is there e Camera
    support: false,
    error: false,
    errorname: '',
    permission_denied: false,
    containerId: "camera",
    isPlaying: false
};


//GPS, Geolocation
arwizard.geolocation = {
    available: false,
    support: false,
    error: false,
    errorname: '',
    permission_denied: false,
    position: ''
};

arwizard.geolocation.position = {
    latitude: '',
    longitude: '',
    accuracy: '',
    altitude: '',
    altitudeAccuracy: '',
    heading: '',
    speed: '',
    timestamp: ''
};

//Sensoren
arwizard.sensor = {
    deviceorientation: '',
    devicemotion: ''
};

//deviceorientation
arwizard.sensor.deviceorientation = {
    available: false,
    support: false,
    alpha: 0,
    beta: 0,
    gamma: 0
};

//devicemotion
arwizard.sensor.devicemotion = {
    available: false,
    support: false,
    accelerationIncludingGravity_x: '',
    accelerationIncludingGravity_y: '',
    accelerationIncludingGravity_z: '',
    rotationRate_alpha: '',
    rotationRate_beta: '',
    rotationRate_gamma: ''
};


//Navigation
arwizard.navigation = {
    status: false,
    max_distance_view: 0.030,
    endpoint_latitude: '',
    endpoint_longitude: '',
    active : false
};

//Prepare Objects
arwizard.szenario = {empty: 'empty'};
arwizard.poi      = {empty: 'empty'};


//************************************************************************
//************************************************************************
// Global VAriable
var cameraStream;