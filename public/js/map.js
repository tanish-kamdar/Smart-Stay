mapboxgl.accessToken = 'pk.eyJ1IjoidGFuaXNoa2FtZGFyIiwiYSI6ImNtOW53N2pjYTAwNGcya3NmdTUwZTVyZ2YifQ.-uuSqxXueTd-TBLshTjRuA';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

const marker1 = new mapboxgl.Marker({color : 'red'})
    .setLngLat(coordinates)
    .addTo(map)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML("<p>Exact Location will be shared after booking.</p>"))
    ;