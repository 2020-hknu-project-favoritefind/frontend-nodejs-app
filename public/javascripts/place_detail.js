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

//2. 장소 검색 - place id 받아오기
function search()
{
    service = new google.maps.places.PlacesService(document.getElementById('search'));
    
    var request = 
    {
        query: name,
        location: new google.maps.LatLng(latitude , longitude),
        radius: '30'
    };            
    // 요청
    service.textSearch(request, function(results, status)
    {
        if (status == google.maps.places.PlacesServiceStatus.OK) 
        {
            $("#search_text").html('<section style="display: flex; justify-content: space-between;">');
            for (var i = 0; i < results.length; i++) 
            {
                var place = results[i];
                getPlaceDetail(place.place_id, i);
                console.log(place);
                /* 결과 
                장소 이름 : name
                아이디 - 세부 정보 요청에 사용 : place_id
                위도랑 경도 제공 : geometry.location
                영업 중 - opening_hours.open_now
                평점 - rating
                주소 - formatted_address
                */
                $("#search_text").append('<article style="width:width: 320px; padding: 20px; border: 1px solid #c9c9c9;">'+
                '<h5>'+place.name+'</h5>'+
                '<p>주소: '+place.formatted_address+'</p>'+
                '<p>운영 상태:'+place.business_status+'</p>'+
                '<p>평점: '+place.rating+'</p>'+
                '<a href="#layer'+[i]+'">자세히 보기</a></article>');
                console.log(place.photos[0].getUrl({maxWidth: 70, maxHeight: 50}));
            }
            $("#search_text").append('</section>')
        }
        else if(status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
        {
            console.log('INVALID_REQUEST ', status);
        }
        else if(status == google.maps.places.PlacesServiceStatus.ERROR)
        {
            console.log('ERROR ', status);
        }
        else if(google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
        {
            console.log("검색 결과가 아쉽게도 없습니다");
            $("#search").html("<h5>검색 결과가 없습니다.</h5><br><br><p>다음 포털 사이트에서 검색하기</p>"+
            '<a href="https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query='+name+'"><img src="/images/naver.png" width="50" height="50" style="padding: 0.5rem; alt="네이버로 장소 검색하기"></img></a>'+
            '<a href="https://www.google.com/search?q='+name+'&oq='+name+'&aqs=chrome..69i57j0l4j69i60l2j69i61.3055j0j7&sourceid=chrome&ie=UTF-8"><img src="/images/google.png" width="50" height="50" style="padding: 0.5rem; alt="구글로 장소 검색하기"></img></a>');
        }
    });
}

// 장소 ID로 상세 정보 받기
function getPlaceDetail(searchPlaceID, num)
{
    console.log(searchPlaceID);
    
    /*
    // 받고 싶은 필드 목록
    var totalFields = ['address_component', 'adr_address', 'alt_id', 'formatted_address', 'geometry', 'icon', 'id', 'name',
    'photo', 'place_id', 'scope', 'type', 'url', 'vicinity', 'formatted_phone_number',
    'opening_hours', 'website', 'rating', 'review'];
    
    var request = 
    {
        placeId: searchPlaceID,
        fields: totalFields
    };
            
    service.getDetails(request, function(results, status)
    {
        if (status == google.maps.places.PlacesServiceStatus.OK) 
        {
            $("#search_detail").html('<div id="layer'+num+'" class="pop-layer">'+
            '<div class="pop-container">'+
            '<div class="pop=conts">'+
            '<h4>'+place.name+'</h4>'+
            '<p class="ctxt mb20">'+
            '<img>'+place.photos[0].getUrl()+'</img>'+
            '주소: '+place.formatted_address+'<br>'+
            '전화번호: '+place.formatted_phone_number+'<br>'+
            '영업시간: '+place.opnening_hours.periods+'<br>'+
            '평점: '+place.rating+'<br>'+
            '리뷰: '+place.reviews+'<br>'+
            '홈페이지: '+place.website+'<br>'+
            '<a href='+place.url+'>더 자세한 정보 확인하기</a></p>'+
            '<div class="btn-r">'+
            '<a href="#" class="btn-layerClose">Close</a></div></div></div></div>')
        }
        else if(status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
        {
            console.log('INVALID_REQUEST ', status);
        }
        else if(status == google.maps.places.PlacesServiceStatus.ERROR)
        {
            console.log('ERROR ', status);
        }
        else if(google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
        {
            console.log("검색 결과가 아쉽게도 없습니다");
            $("#search_text").append("<h5>검색 결과가 존재하지 않습니다.</h5>");
        }
    });
    */
}


