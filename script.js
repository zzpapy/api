
//    var mymap = L.map('mapid').setView([48,7.748974], 8);
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox/outdoors-v11',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'pk.eyJ1IjoienpwYXB5IiwiYSI6ImNrYmx2MHBkbDFjaHUyeWxzYWkyNWZzb3QifQ.ksHH4jx4ETQZv4cfOYstVg'
//     }).addTo(mymap);
//     var icon = L.icon({
//         iconUrl:'logo.png',
//         iconSize:[50,50],
//         popupAnchor:[0,-15]
//     })
//     var centres = { "Strasbourg" : [48.5655,7.748974], "Colmar" : [48.075924,7.344578], "Mulhouse": [47.742742,7.293029] };
//     var i = 0
//     console.log(centres)
//     var iterator = Object.keys(centres)
//     for (var item in centres) {
//         marker = L.marker(centres[item],{icon:icon}).addTo(mymap);
//         marker.bindPopup("centre Elan de <br>"+iterator[i]);
//         i++
//     }
    
//     var marker = L.marker([48.583328, 7.75]).addTo(mymap); 

    

//     function onMapClick(e) {
//         alert("You clicked the map at " + e.latlng);
//     }

//     mymap.on('click', onMapClick);
//     var geojsonFeature = {
//         "type": "Feature",
//         "properties": {
//             "name": "Coors Field",
//             "amenity": "Baseball Stadium",
//             "popupContent": "This is where the Rockies play!"
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [48.583328, 7.75]
//         }
//     };
//     var myLines = [{
//         "type": "LineString",
//         "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
//     }, {
//         "type": "LineString",
//         "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
//     }];
    $(".search").on("click",(e)=>{
        e.preventDefault()
        $(".reponse").empty()
        url = "http://api.weatherstack.com/current"
        console.log("toto")
        $.get(url,{   
            access_key:"abfadee90f3388d42847ecaf65fd651d",
            query : $(".ville").val()
        }).then(function(response){
            var container = L.DomUtil.get('meteo');
            if(container != null){
                container._leaflet_id = null;
            }
            var mymap = L.map('meteo').setView([response.location.lat,response.location.lon], 8);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/outdoors-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoienpwYXB5IiwiYSI6ImNrYmx2MHBkbDFjaHUyeWxzYWkyNWZzb3QifQ.ksHH4jx4ETQZv4cfOYstVg'
            }).addTo(mymap);
            var icon = L.icon({
                iconUrl:'logo.png',
                iconSize:[50,50],
                popupAnchor:[0,-15]
            })  
            var marker = L.marker([response.location.lat,response.location.lon]).addTo(mymap);
            $(".temp").html("Temperature : "+response.current.temperature)
            $(".obs").html("Heure de relevé : "+response.current.observation_time)
            $(".img").attr("src",response.current.weather_icons[0])
           console.log(response)            
      })
    })
    
    $(".ville").on("keyup",(e)=>{
        e.preventDefault()
        var val = $(".ville").val()
        url =  "https://api-adresse.data.gouv.fr/search/?q="+val+"&type=municipality"
        console.log("toto")
        $.get(url,{   
            access_key:"abfadee90f3388d42847ecaf65fd651d",
            query : $(".ville").val()
        }).then(function(response){
           var i = 0
           while(i < response.features.length )
           {
               $(".reponse").append("<div class='choix'>"+response.features[i].properties.name+"<div>")
            $(".choix").on('click',function(){
                console.log($(this).html())
                var value = $(this).html()
                var value = value.replace("<div></div>", "");
                $(".ville").val(value)
                $(".reponse").html('')
            })        
            i++
           }
      })
    })
    "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port"