mapboxgl.accessToken = 'pk.eyJ1IjoibGVhc21hbjciLCJhIjoiY2tyNW1kcW9jMjJtNDJwbGR1dWJhc2lkOSJ9.uNg9Kb2_D6a3w51fuoDYCA'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542,42.358862],
    zoom: 14
});

var markers = [];

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
  await createMarkers(locations);

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

async function createMarkers(locationList) {
  console.log(markers.length);
  if (locationList == null) {
    return;
  }
  markers.forEach(marker => {
    marker.remove();
  });
  markers = [];

  locationList.forEach(location => {
    var el = document.createElement('div');
      el.className = 'marker';
    var marker = new mapboxgl.Marker(el)
      .setLngLat([location.attributes.longitude, location.attributes.latitude])
      .addTo(map);
    markers.push(marker);  
  });
}

run();