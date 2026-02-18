// -------------------------------
// Initialize Map
// -------------------------------

var map = L.map('map').setView([4.5, 39], 6);

// OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// -------------------------------
// Research Locations Coordinates
// -------------------------------

// Kapiti Conservancy, Kenya
var kapiti = [-1.617, 37.058];

// Eastern Ethiopia (Haramaya / ASAL region approx.)
var ethiopia = [9.4, 42.0];


// -------------------------------
// Add Markers
// -------------------------------

var marker1 = L.marker(kapiti).addTo(map)
    .bindPopup("<b>Kenya</b><br>Kapiti Conservancy<br>Range Biomass Modeling");

var marker2 = L.marker(ethiopia).addTo(map)
    .bindPopup("<b>Ethiopia</b><br>Arid & Semi-Arid Lands<br>Natural Resources Monitoring");


// -------------------------------
// Curved Network Connection
// -------------------------------

// Function to create curved arc between two points
function createCurve(latlng1, latlng2) {

    var lat1 = latlng1[0],
        lng1 = latlng1[1],
        lat2 = latlng2[0],
        lng2 = latlng2[1];

    // Calculate midpoint offset for curve
    var offsetX = lng2 - lng1,
        offsetY = lat2 - lat1;

    var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
    var theta = Math.atan2(offsetY, offsetX);

    var thetaOffset = (Math.PI / 8); // Increase for higher curve

    var r2 = (r / 2) / Math.cos(thetaOffset);
    var theta2 = theta + thetaOffset;

    var midpointX = r2 * Math.cos(theta2) + lng1;
    var midpointY = r2 * Math.sin(theta2) + lat1;

    var midpointLatLng = [midpointY, midpointX];

    return L.polyline([latlng1, midpointLatLng, latlng2], {
        color: 'blue',
        weight: 3,
        opacity: 0.8
    }).addTo(map);
}

// Create curved connection
createCurve(kapiti, ethiopia);


// -------------------------------
// Auto Zoom to Show All Locations
// -------------------------------

var group = new L.featureGroup([marker1, marker2]);
map.fitBounds(group.getBounds());
