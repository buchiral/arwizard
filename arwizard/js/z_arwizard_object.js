//************************************************************************
//************************************************************************
//ARwizard Object with Configs
var arwizard = new Object();

arwizard.core = {
    width: window.innerWidth,
    height: window.innerHeight,
    fieldview_angle: 56,
    fieldview_width: window.innerWidth,
    fieldview_height: window.innerHeight - 5,
    list_mode_active: false,
    map_mode_active: false
};

// Radar
arwizard.radar = {
    radius: 200
};


// Field of View = Camera View
arwizard.fieldview = {
    angle: 56,
    width: window.innerWidth,
    height: window.innerHeight - 5
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


//Config from DB
arwizard.szenario = {empty: 'empty'};
arwizard.poi = {empty: 'empty'};
