var map = L.map('map').setView([48.866667, 2.333333], 4);
    
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var cities = document.getElementsByClassName('cities');

for (var i=0 ; i<cities.length ; i++) {
    var long = cities[i].dataset.long;
    var lat = cities[i].dataset.lat;
    var name = cities[i].dataset.name;

    var redIcon = L.icon({
        iconUrl: '../images/leaf-red.png',
        shadowUrl: '../images/leaf-shadow.png',
    
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    
    L.marker([lat, long], {icon: redIcon}).bindPopup(name).openPopup().addTo(map)
    
}


