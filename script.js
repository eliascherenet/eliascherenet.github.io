// Initialize map
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
// Draw Network Connection
// -------------------------------

var connectionLine = L.polyline([kapiti, ethiopia], {
    color: 'blue',
    weight: 3,
    opacity: 0.7,
    dashArray: '5,5'
}).addTo(map);

// Fit map bounds to show all locations
var group = new L.featureGroup([marker1, marker2]);
map.fitBounds(group.getBounds());
