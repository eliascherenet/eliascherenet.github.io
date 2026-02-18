// Initialize map
var map = L.map('map').setView([2, 37], 6);

map.setMaxBounds([
    [-5, 30],   // Southwest corner
    [15, 45]    // Northeast corner
]);


// OpenStreetMap Base Layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Satellite Layer (ESRI)
var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
});

// Color by country
function getColor(country) {
    if (country === "Kenya") return "green";
    if (country === "Ethiopia") return "blue";
    return "gray";
}

// Load GeoJSON
fetch('./plots.geojson')
.then(response => response.json())
.then(data => {

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: getColor(feature.properties.country),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<b>" + feature.properties.name + "</b><br>" +
                "<strong>Country:</strong> " + feature.properties.country + "<br>" +
                "<strong>Year:</strong> " + feature.properties.year + "<br>" +
                "<strong>Funding:</strong> " + feature.properties.funding + "<br><br>" +
                feature.properties.description
            );
        }
    }).addTo(map);

});

// Layer Control
var baseMaps = {
    "OpenStreetMap": osm,
    "Satellite (Esri)": satellite
};

L.control.layers(baseMaps).addTo(map);

// Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += "<h4>Research Locations</h4>";
    div.innerHTML += '<i style="background: green"></i> Kenya<br>';
    div.innerHTML += '<i style="background: blue"></i> Ethiopia<br>';
    return div;
};

legend.addTo(map);
