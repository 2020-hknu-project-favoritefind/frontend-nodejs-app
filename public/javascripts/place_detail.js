/*
* [1] 장소 세부 정보
*/

/* 변수 */
var result = get_query();
var name = result.name; //이름
var latitude = result.latitude; //위도
var longitude = result.longitude; //경도
var map; //지도
var service; //세부 사항 서비스


window.onload = search;

/* 함수 */
//1. url 파라미터 > 스크립트로 가져오기
function get_query(){
    var url=document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

//2. 장소 세부 정보
function search()
{
    $("#detail").html('<h4>'+name+'</h4>'+'<h6> 위도:'+latitude+'</h6><h6>경도: '+longitude+'</h6>')

    /*
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv,
    {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude)),
        zoom: 15
    });

    
    var request = {
        location: new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude)),
        radius: '500',
        query: name
    };
    
    service = new google.maps.places.PlacesService(map);
    service.search(request, callback);
}

function callback(results, status)
{
    if (status == google.maps.places.PlacesServiceStatus.OK)
    {
        for(var i=0; i<results.length; i++)
        {
            var place = results[i];
            createMarker(results[i]);
            console.log(results[i]);
        }
    }
}
*/
}

