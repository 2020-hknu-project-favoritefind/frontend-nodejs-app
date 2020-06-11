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
        radius: 10,
        language: "ko"
    };            
    // 요청
    service.textSearch(request, function(results, status)
    {
        if (status == google.maps.places.PlacesServiceStatus.OK) 
        {
            $("#search_detail").html('<div class="cards">');
            for (var i = 0; i < results.length; i++) 
            {
                var place = results[i];
                console.log(i+'번째 함수 호출하겠음');
                getPlaceDetail(place, i);
                $("#search_detail").append('</div>');
            }
        }
        else if(google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
        {
            $("#search").html("<h5>검색 결과가 없습니다.</h5><br><br><p>다음 포털 사이트에서 검색하기</p>"+
            '<a href="https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query='+name+'"><img src="/images/naver.png" width="50" height="50" style="padding: 0.5rem; alt="네이버로 장소 검색하기"></img></a>'+
            '<a href="https://www.google.com/search?q='+name+'&oq='+name+'&aqs=chrome..69i57j0l4j69i60l2j69i61.3055j0j7&sourceid=chrome&ie=UTF-8"><img src="/images/google.png" width="50" height="50" style="padding: 0.5rem; alt="구글로 장소 검색하기"></img></a>');
        }
        else
        {
            console.log('에러: '+status);
        }
    });
}

// 장소 ID로 상세 정보 받기
function getPlaceDetail(searchPlace, num)
{
    console.log(num+'번째 detail 함수 들어옴!');
    
    // 받고 싶은 필드 목록
    var totalFields = ['address_component', 'adr_address', 'alt_id', 'formatted_address', 'geometry', 'icon', 'id', 'name',
    'photo', 'place_id', 'scope', 'type', 'url', 'vicinity', 'formatted_phone_number',
    'opening_hours', 'website', 'rating', 'review'];
    var request = 
    {
        placeId: searchPlace.place_id,
        fields: totalFields
    };     
    service.getDetails(request, function(result, status)
    {
        console.log(num+'번째 detail 서비스 요청 시작!');
        var place = result;

        if (status == google.maps.places.PlacesServiceStatus.OK) 
        {
            /* 내부 변수 */
            var photo = place.photos[0];

            var photourl=photo.getUrl({"maxWidth": 400, "maxHeight": 400});
            
            var open = ""; //오픈 여부 직관적으로
            if(place.opening_hours == null)
            {
                open = "MAYBE CLOSE";
            }
            else if(place.opening_hours.open_now == true)
            {
                open = "OPEN";
            }
            else
            {
                open = "CLOSE";
            }

            var price = "";
            if(place.price_level == 0)
            {
                price = "무료";
            }
            else if (place.price_level == 1)
            {
                price = "저렴";
            }
            else if (place.price_level == 2)
            {
                price = "보통";
            }
            else if (place.price_level == 3)
            {
                price = "고가";
            }
            else
            {
                price = "매우 고가";
            }

            var review = place.reviews[0];
            var rating = 0.0;
            var ratingText = "";
            if (review == null)
            {
                rating = "데이터 없습니다.";
                ratingText = "아직 리뷰가 없습니다.";
            }
            else
            {
                rating = review.rating;
                ratingText = review.text;
            }

            //1. 첫번째로 간단히 카드 레이아웃 보여주기
            $("#search_detail").append('<div class="card'+num+'">'+'<div class="card-all">'+'<div class="card-header" style="background-image: url('+"'"+photourl+"')"+'">'+'<div class="card-header-is_closed">'+open+'</div>'+
            '<div class="card-header-star"><a href=""><i class="fa fa-star" aria-hidden="true"></i></a>'+'</div></div>'+ //a에 즐겨찾기 버튼 추가하게 추가하기
            //card-header
            '<div class="card-body">'+
            '<div class="card-body-header">'+
            '<h1>'+place.name+'</h1>'+
            //'<img src="'+photourl+'"></img>'+
            '<p class="card-body-first">'+
            place.formatted_address+'<br>'+
            place.formatted_phone_number+'<br>'+
            '<a href="'+place.website+'">'+place.website+'</a></p>'+
            '</div>'+ //card-body-header (first)

            //2. 두번째로 자세한 카드 레이아웃 보여주기
            '<p class="card-body-description">'+
            //place.opening_hours.weekday_text+'<br>'+
            '평점: '+rating+'<br>'+
            '리뷰: '+ratingText+'<br>'+
            '가격: '+price+'<br>'+
            '<a href="'+place.url+'"> 더 자세한 정보 </a>'+
            '</p>'+ //card-body (second)
            '</div></div>' //card-body, card-all, card-i
            );
            
            console.log(num+'번째 레이아웃 잘 들어감?');
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
            console.log("DB에 있는 내용이 표시되도록 재구현할 예정");
        }
    });
    
}

            /*Google Library 결과 
                //아이디 - 세부 정보 요청에 사용 : place_id
                영업 중 - opening_hours.open_now //true면 운영중, false면 중단
                아이콘 - icon
                장소 이름 - name
                주소 - formatted_address
                연락처 - international_phone_number
                영업 시간 - opening_hours.weekday_text
                평점 - rating
                리뷰 - reviews[]
                가격 수준 - price level (0 무료 ~ 4 매우 비싸다)
                웹사이트 - website
                사진 - photos
                더 자세한 정보 - url
            */


