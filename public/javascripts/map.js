/*
* [1] 지도
*/

/* 지도 변수 */
var map; //구글지도 담기
var user_latitude = 0; //유저 경도
var user_longitude = 0; //유저 위도
var city; //유저 지역
var marker;
var infoWindow;

/* 함수 */

//1. 지도 생성
window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position)
{
    window.user_latitude = position.coords.latitude;
    window.user_longitude = position.coords.longitude;
    showMap(position.coords);
}

function showMap(coords)
{
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 13,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    var title="취미 장소";
    var content="당신의 위치는 현재 여기입니다!";//클릭했을 때
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content)
{
    var markerOptions = 
    {
        position: latlong,
        map: map,
        title: title,
        clickable: true,
        icon: "/images/user.png"

    };
    
    marker = new google.maps.Marker(markerOptions);

    
    var infoWindowOptions = 
    {
        content: content,
        position: latlong
    };

    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    

    google.maps.event.addListener(marker, "click", function()
    {
        infoWindow.open(map);
    });

    geocodeLatLng(map);
}

//2. 위도 경도로 도시 이름 가져오기
function geocodeLatLng(map)
{
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: parseFloat(user_latitude), lng: parseFloat(user_longitude)};
    geocoder.geocode({'location': latlng}, function(results, status)
    {
        if(status == 'OK')
        {
            if(results[0])
            {
                city = results[0];
                city = results[0].formatted_address.split(' ')[2]; //전체주소에서 도시 뽑기
                placeRecommend(city);
            }
        else
        {
            window.alert('No results found');
        }
    }
    });
}

/*
* [2] 카테고리
*/

/* 변수 */
var result = get_query();

var category = []; //카테고리명
var placename = []; //시설명
var address = []; //주소
var phone = []; //전화번호
var latitude = []; // 장소 위도
var longitude = []; //장소 경도
var x = []; // 거리순 정렬 - x
var y = []; // 거리순 정렬 - y
var distance = []; // 거리순 정렬 - 위도 경도 거리
var all = []; // 총 집합

var category2 = []; //카테고리명
var placename2 = []; //시설명
var address2 = []; //주소
var phone2 = []; //전화번호
var latitude2 = []; // 장소 위도
var longitude2 = []; //장소 경도
var x2 = []; // 거리순 정렬 - x
var y2 = []; // 거리순 정렬 - y
var distance2 = []; // 거리순 정렬 - 위도 경도 거리
var all2 = []; // 총 집합

var category3 = []; //카테고리명
var placename3 = []; //시설명
var address3 = []; //주소
var phone3 = []; //전화번호
var latitude3 = []; // 장소 위도
var longitude3 = []; //장소 경도
var x3 = []; // 거리순 정렬 - x
var y3 = []; // 거리순 정렬 - y
var distance3 = []; // 거리순 정렬 - 위도 경도 거리
var all3 = []; // 총 집합

var category4 = []; //카테고리명
var placename4 = []; //시설명
var address4 = []; //주소
var phone4 = []; //전화번호
var latitude4 = []; // 장소 위도
var longitude4 = []; //장소 경도
var x4 = []; // 거리순 정렬 - x
var y4 = []; // 거리순 정렬 - y
var distance4 = []; // 거리순 정렬 - 위도 경도 거리
var all4 = []; // 총 집합

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

/* 목록 정렬 */

//1. 가나다순 정렬
function sorting_name()
{
   all = all.filter(function(item)
   {
       return item !== null && item !== undefined && item !== '';
   }) //빈 항목 제거

    all.sort(function(left, right)
    {
        return left[0].toUpperCase().localeCompare(right[0].toUpperCase());
    }) //가나다순 정렬

    /*다른 정보는 다르게*/
    if(all[0][2] == "체육도장업" || all[0][2] == "유통관련업")
    {
        //체육 도장업 손보기
        contentStr = '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
        '<h4>'+all[0][0]+'</h4><hr><h2>'+all[0][1]+"<br></br>"+all[0][2]+
        '</h2><br><div class="sebu" align="center">'+
        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[0][0]+"&latitude="+all[0][3]+"&longitude="+all[0][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
        '<button type="button" id="like">좋아요</button>'+
        '<button type="button" id="star">즐겨찾기</button></li></div>';

        for(var i=1; i<all.length; i++)
        {
            contentStr += '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
            '<h4>'+all[i][0]+'</h4><hr><h2>'+all[i][1]+"<br></br>"+all[i][2]+
            '</h2><br><div class="sebu" align="center">'+
            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[i][0]+"&latitude="+all[i][3]+"&longitude="+all[i][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
            '<button type="button" id="like">좋아요</button>'+
            '<button type="button" id="star">즐겨찾기</button></li></div>';
        } 
        $("#output").html(contentStr); //다시 정렬한거에 맞게 표시
    }
    else
    {
        contentStr = '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
        '<h4>'+all[0][0]+'</h4><hr><h2>'+all[0][1]+"<br></br>"+all[0][2]+
        '</h2><br><div class="sebu" align="center">'+
        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[0][0]+"&latitude="+all[0][3]+"&longitude="+all[0][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
        '<button type="button" id="like">좋아요</button>'+
        '<button type="button" id="star">즐겨찾기</button></li></div>';
    
        for(var i=1; i<all.length; i++)
        {
            contentStr += '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
            '<h4>'+all[i][0]+'</h4><hr><h2>'+all[i][1]+"<br></br>"+all[i][2]+
            '</h2><br><div class="sebu" align="center">'+
            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[i][0]+"&latitude="+all[i][3]+"&longitude="+all[i][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
            '<button type="button" id="like">좋아요</button>'+
            '<button type="button" id="star">즐겨찾기</button></li></div>';
        } 
        $("#output").html(contentStr); //다시 정렬한거에 맞게 표시
    }

}

function sorting_name2()
{
    all2 = all2.filter(function(item)
   {
       return item !== null && item !== undefined && item !== '';
   })

	all2.sort(function(left, right)
    {
        return left[0].toUpperCase().localeCompare(right[0].toUpperCase());
    })

    contentStr = '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
    '<h4>'+all2[0][0]+'</h4><hr><h2>'+all2[0][1]+"<br></br>"+all2[0][2]+
    '</h2><br><div class="sebu" align="center">'+
    '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all2[0][0]+"&latitude="+all2[0][3]+"&longitude="+all2[0][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
    '<button type="button" id="like">좋아요</button>'+
    '<button type="button" id="star">즐겨찾기</button></li></div>';

    for(var i=1; i<all2.length; i++)
    {
        contentStr += '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
        '<h4>'+all2[i][0]+'</h4><hr><h2>'+all2[i][1]+"<br></br>"+all2[i][2]+
        '</h2><br><div class="sebu" align="center">'+
        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all2[i][0]+"&latitude="+all2[i][3]+"&longitude="+all2[i][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
        '<button type="button" id="like">좋아요</button>'+
        '<button type="button" id="star">즐겨찾기</button></li></div>';
    } 
    $("#output2").html(contentStr);
}

//2. 거리순 정렬
function sorting_dis()
{
    all = all.filter(function(item)
    {
        return item !== null && item !== undefined && item !== '';
    })

    all.sort(function(left, right)
    {
        return left[5]-right[5];
    })

    if(all[0][2] == "체육도장업" || all[0][2] == "유통관련업")
    {
        //체육도장업 손보기
        contentStr = '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
        '<h4>'+all[0][0]+'</h4><hr><h2>'+all[0][1]+"<br></br>"+all[0][2]+
        '</h2><br><div class="sebu" align="center">'+
        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[0][0]+"&latitude="+all[0][3]+"&longitude="+all[0][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
        '<button type="button" id="like">좋아요</button>'+
        '<button type="button" id="star">즐겨찾기</button></li></div>';
        
        for(var i=1; i<all.length; i++)
        {
            contentStr += '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
            '<h4>'+all[i][0]+'</h4><hr><h2>'+all[i][1]+"<br></br>"+all[i][2]+
            '</h2><br><div class="sebu" align="center">'+
            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[i][0]+"&latitude="+all[i][3]+"&longitude="+all[i][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
            '<button type="button" id="like">좋아요</button>'+
            '<button type="button" id="star">즐겨찾기</button></li></div>';
        }
        $("#output").html(contentStr);
    }
    else
    {
        contentStr = '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
        '<h4>'+all[0][0]+'</h4><hr><h2>'+all[0][1]+"<br></br>"+all[0][2]+
        '</h2><br><div class="sebu" align="center">'+
        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[0][0]+"&latitude="+all[0][3]+"&longitude="+all[0][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
        '<button type="button" id="like">좋아요</button>'+
        '<button type="button" id="star">즐겨찾기</button></li></div>';
        
        for(var i=1; i<all.length; i++)
        {
            contentStr += '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
            '<h4>'+all[i][0]+'</h4><hr><h2>'+all[i][1]+"<br></br>"+all[i][2]+
            '</h2><br><div class="sebu" align="center">'+
            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all[i][0]+"&latitude="+all[i][3]+"&longitude="+all[i][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
            '<button type="button" id="like">좋아요</button>'+
            '<button type="button" id="star">즐겨찾기</button></li></div>';
        } 
        $("#output").html(contentStr);
    }
}

function sorting_dis2()
{
    all2 = all2.filter(function(item)
    {
        return item !== null && item !== undefined && item !== '';
    })

    all2.sort(function(left, right)
    {
        return left[5]-right[5];
    })

    console.log(all2);


    contentStr = '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
    '<h4>'+all2[0][0]+'</h4><hr><h2>'+all2[0][1]+"<br></br>"+all2[0][2]+
    '</h2><br><div class="sebu" align="center">'+
    '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all2[0][0]+"&latitude="+all2[0][3]+"&longitude="+all2[0][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
    '<button type="button" id="like">좋아요</button>'+
    '<button type="button" id="star">즐겨찾기</button></li></div>';

    for(var i=1; i<all2.length; i++)
    {
        contentStr += '<li class="list-group-item style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
        '<h4>'+all2[i][0]+'</h4><hr><h2>'+all2[i][1]+"<br></br>"+all2[i][2]+
        '</h2><br><div class="sebu" align="center">'+
        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+all2[i][0]+"&latitude="+all2[i][3]+"&longitude="+all2[i][4]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
        '<button type="button" id="like">좋아요</button>'+
        '<button type="button" id="star">즐겨찾기</button></li></div>';
    } 
    $("#output2").html(contentStr);
    
}

//3. 인기순 정렬
function sorting_like()
{
    alert("인기 순 정렬 업데이트 예정");
}

function sorting_like2()
{
    alert("인기 순 정렬 업데이트 예정");
}

/* 실제 목록 나오게 하는 함수 */
function placeRecommend(city)
{
    /* 교양 */
    if (result.hobby_type == "교양")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            '<h5> Concert Hall </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            '<h5> Movie Theaters </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>교양 1. Concert Hall ...</span>";
        /*
        $.ajax({
            type:"GET",
            url:"http://45.32.36.198/place?city=안성시&category=교양",
            success:function(data)
            {
                var text = JSON.parse(data);
                console.log(text);
            }
        })
        */
        $.ajax({//공연장
            type: "GET",
            url: "https://openapi.gg.go.kr/PerformPlace?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PerformPlace[1].row;
                var contentStr = "";
                
                //1. 배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    if(city == list[i].SIGUN_NM) //사용자 도시 = 장소 이름일 경우에만
                    {
                        if (list[i].BIZPLC_NM == null)
                        {
                            list[i].BIZPLC_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].LOCPLC_FACLT_TELNO == null)
                        {
                            list[i].LOCPLC_FACLT_TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        window.category[i] = "공연장";
                        window.placename[i] = list[i].BIZPLC_NM; //장소명
                        window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone[i] = list[i].LOCPLC_FACLT_TELNO; //전화번호
                        window.latitude[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                        window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                        window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장

                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[교양] 공연장",
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                }
                $("#output").html(contentStr);
            }
        })

        var subcategory2 = document.getElementById("sub2");
        subcategory2.innerHTML += "<span>교양 2. Movie Theaters ...</span>";

        $.ajax({//영화관
            type: "GET",
            url: "https://openapi.gg.go.kr/MovieTheater?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.MovieTheater[1].row;
                var contentStr = "";

                //1. 배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    if(city == list[i].SIGUN_NM)
                    {
                        if (list[i].BIZPLC_NM == null)
                        {
                            list[i].BIZPLC_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].LOCPLC_FACLT_TELNO == null)
                        {
                            list[i].LOCPLC_FACLT_TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        window.category2[i] = "영화관";
                        window.placename2[i] = list[i].BIZPLC_NM; //장소명
                        window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone2[i] = list[i].LOCPLC_FACLT_TELNO; //전화번호
                        window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                        window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                        window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                        window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';

                        var abj =
                        {
                            y: latitude2[i],
                            x: longitude2[i],
                            img: "/images/marker.png",
                            category: "[교양] 영화관",
                            name: placename2[i],
                            etc: phone2[i],
                            address: address2[i]
                        };

                        addSymbol(abj);
                    }
                }
                $("#output2").append(contentStr);

            }
        })
    }

    /* 레포츠 */
    if (result.hobby_type == "레포츠")
    {
        //1. 스포츠
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Sports </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Fishing Hole </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>레포츠 1. Sport ...</span>";

        $.ajax({ //1-1. 체육관
            type: "GET",
            url: "https://openapi.gg.go.kr/PublicLivelihood?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PublicLivelihood[1].row;
                var contentStr = "";
                
                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    if(city == list[i].SIGUN_NM)//사용자 도시 = 장소
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].ETC_FACLT_NM == null)
                        {
                            list[i].ETC_FACLT_NM = "갖춰진 시설 정보가 존재하지 않습니다.";
                        }
                        if(list[i].GYM_POSBL_ITEM_CONT == null)
                        {
                            list[i].GYM_POSBL_ITEM_CONT = "가능한 종목의 정보가 존재하지 않습니다.";
                        }
                        window.category[i] = "체육관";
                        window.placename[i] = list[i].FACLT_NM; //장소명
                        window.address[i] = list[i].ETC_FACLT_NM; //시설
                        window.phone[i] = list[i].GYM_POSBL_ITEM_CONT; //종목
                        window.latitude[i] = 10000//위도
                        window.longitude[i] = 10000 //경도
                        window.x[i] = 10000; 
                        window.y[i] = 10000;
                        window.distance[i] = 10000; //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+list[i].FACLT_NM+'</h4><hr><h2>'+list[i].ETC_FACLT_NM+" :: "+list[i].GYM_POSBL_ITEM_CONT+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
                        
                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[레포츠] 체육관",
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                }
                $("#output").html(contentStr);
            }
        })

        $.ajax({ //1-2.체육도장
            type: "GET",
            url: "https://openapi.gg.go.kr/PhysicalTraining?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PhysicalTraining[1].row;
                var contentStr = "";
                
                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    if(city == list[i].SIGUN_NM && list[i].REFINE_ROADNM_ADDR != null)
                    {
                        if (list[i].BIZPLC_NM == null)
                        {
                            list[i].BIZPLC_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].CULTUR_PHSTRN_INDUTYPE_NM == null)
                        {
                            list[i].CULTUR_PHSTRN_INDUTYPE_NM = "종목 정보가 존재하지 않습니다.";
                        }

                        window.category3[i] = "체육도장";
                        window.placename3[i] = list[i].BIZPLC_NM; //장소명
                        window.address3[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone3[i] = list[i].CULTUR_PHSTRN_INDUTYPE_NM; //전화번호
                        window.latitude3[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude3[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x3[i] = (Math.cos(latitude3[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude3[i]-user_longitude)); 
                        window.y3[i] = 111 * Math.abs(latitude3[i] - user_latitude);
                        window.distance3[i] = Math.sqrt( (Math.pow(x3[i], 2)) + (Math.pow(y3[i],2)) ); //거리
                        window.all3[i] = [placename3[i], address3[i], phone3[i], latitude3[i], longitude3[i], distance3[i],category3[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename3[i]+'</h4><hr><h2>'+window.address3[i]+"<br></br>"+list[i].PLVTINST_DIV_NM+" "+window.phone3[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename3[i]+"&latitude="+latitude3[i]+"&longitude="+longitude3[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
                    
                        var abj =
                        {
                            y: latitude3[i],
                            x: longitude3[i],
                            img: "/images/marker.png",
                            category: "[레포츠] 체육도장",
                            name: placename3[i],
                            etc: phone3[i],
                            address: address3[i]
                        };

                        addSymbol(abj);
                    }
                }
                $("#output").append(contentStr);

                window.placename = window.placename.concat(window.placename3);
                window.address = window.address.concat(window.address3);
                window.phone = window.phone.concat(window.phone3);
                window.latitude = window.latitude.concat(window.latitude3);
                window.longitude = window.longitude.concat(window.longitude3);
                window.all = window.all.concat(window.all3);

                all = all.filter(function(item)
                {
                    return item !== null && item !== undefined && item !== '';
                })
            }
        })

        $.ajax({ //1-3. 수영장
            type: "GET",
            url: "https://openapi.gg.go.kr/PublicSwimmingPool?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PublicSwimmingPool[1].row;
                var contentStr = "";

                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    if(city == list[i].SIGUN_NM && list[i].REFINE_ROADNM_ADDR != null)
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].CONTCT_NO == null)
                        {
                            list[i].CONTCT_NO = "연락처 정보가 존재하지 않습니다.";
                        }
                
                        window.category4[i] = "수영장";
                        window.placename4[i] = list[i].FACLT_NM; //장소명
                        window.address4[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone4[i] = list[i].CONTCT_NO; //전화번호
                        window.latitude4[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude4[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x4[i] = (Math.cos(latitude4[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude4[i]-user_longitude)); 
                        window.y4[i] = 111 * Math.abs(latitude4[i] - user_latitude);
                        window.distance4[i] = Math.sqrt( (Math.pow(x4[i], 2)) + (Math.pow(y4[i],2)) ); //거리
                        window.all4[i] = [placename4[i], address4[i], phone4[i], latitude4[i], longitude4[i], distance4[i], category4[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename4[i]+'</h4><hr><h2>'+window.address4[i]+"<br></br>"+window.phone4[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename4[i]+"&latitude="+latitude4[i]+"&longitude="+longitude4[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';

                        var abj =
                        {
                            y: latitude4[i],
                            x: longitude4[i],
                            img: "/images/marker.png",
                            category: "[레포츠] 수영장",
                            name: placename4[i],
                            etc: phone4[i],
                            address: address4[i]
                        };

                        addSymbol(abj);
                    
                    }
                }
                $("#output").append(contentStr);

                window.placename = window.placename.concat(window.placename4);
                window.address = window.address.concat(window.address4);
                window.phone = window.phone.concat(window.phone4);
                window.latitude = window.latitude.concat(window.latitude4);
                window.longitude = window.longitude.concat(window.longitude4);
                window.all = window.all.concat(window.all4);

                all = all.filter(function(item)
                {
                    return item !== null && item !== undefined && item !== '';
                })
            }
        })

        //2. 낚시터
        var subcategory2 = document.getElementById("sub2");
        subcategory2.innerHTML += "<span>레포츠 2. Fishing Hole ...</span>";
        
        $.ajax({//낚시터
            type: "GET",
            url: "https://openapi.gg.go.kr/FISHPLCINFO?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.FISHPLCINFO[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
                {
                    if(city == list[i].SIGUN_NM && list[i].REFINE_ROADNM_ADDR != null)
                    {
                        if (list[i].FACLT_DIV_NM == null)
                        {
                            list[i].FACLT_DIV_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].MANAGE_INST_TELNO == null)
                        {
                            list[i].MANAGE_INST_TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        window.category2[i] = "낚시터";
                        window.placename2[i] = list[i].SIGUN_NM+" "+list[i].FACLT_DIV_NM; //장소명
                        window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone2[i] = list[i].MANAGE_INST_TELNO; //전화번호
                        window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                        window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                        window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                        window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i], category2[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
                       
                        var abj =
                        {
                            y: latitude2[i],
                            x: longitude2[i],
                            img: "/images/marker.png",
                            category: "[레포츠] 낚시터",
                            name: placename2[i],
                            etc: phone2[i],
                            address: address2[i]
                        };

                        addSymbol(abj);
                    }

                }
                $("#output2").append(contentStr);
            }
        })
    }

    /* 미술 */
    if (result.hobby_type == "미술")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Art </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Cartoon </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>미술 1. Art ...</span>";

        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=2&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                var contentStr2 = "";

                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    //1. 만화
                    if( (list[i].FACLT_NM.indexOf("만화") != -1) && (city == list[i].SIGUN_NM) ) //시설명에 만화 포함하면
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].TELNO == null)
                        {
                            list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                        }
                    
                        window.placename2[i] = list[i].FACLT_NM;
                        window.category2[i] = "만화";
                        window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone2[i] = list[i].TELNO; //연락처
                        window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                        window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                        window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                        window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
                        
                        var abj =
                        {
                            y: latitude2[i],
                            x: longitude2[i],
                            img: "/images/marker.png",
                            category: "[미술] 만화",
                            name: placename2[i],
                            etc: phone2[i],
                            address: address2[i]
                        };

                        addSymbol(abj);
                    }
                    else
                    {
                        //2. 만화 제외 미술
                        if( ( (list[i].FACLT_NM.indexOf("미술") != -1) || (list[i].CRSE_CLASS_NM == "미술") ) && (city == list[i].SIGUN_NM) )
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            
                            window.placename[i] = list[i].FACLT_NM;
                            window.category[i] = "미술";
                            window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone[i] = list[i].TELNO; //연락처
                            window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                            window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                            window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                            window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                            window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                            window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude[i],
                                x: longitude[i],
                                img: "/images/marker.png",
                                category: "[미술] 미술",
                                name: placename[i],
                                etc: phone[i],
                                address: address[i]
                            };
    
                            addSymbol(abj);
                        }
                    }
                }
                $("#output").html(contentStr);

                var subcategory2 = document.getElementById("sub2");
                subcategory2.innerHTML = "<span>미술 2. Cartoon ...</span>";
                $("#output2").html(contentStr2);

            }
        })

        
    }

    /* 공예  */
    if (result.hobby_type == "공예")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Programming </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Making </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>공예 1. Programming ...</span>";

        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=7&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                var contentStr2 = "";

                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    //1. 컴퓨터
                    if( ( (list[i].CRSE_CLASS_NM != null) && (list[i].CRSE_CLASS_NM.indexOf("컴퓨터") != -1) ) && city == list[i].SIGUN_NM ) //과목명에 컴퓨터 포함하면 
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].TELNO == null)
                        {
                            list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        window.placename[i] = list[i].FACLT_NM;
                        window.category[i] = list[i].CRSE_CLASS_NM;
                        window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone[i] = list[i].TELNO; //연락처
                        window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                        window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                        window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                        window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                        window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                          
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';

                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[공예] 컴퓨터",
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                    else
                    {
                        //2. 공예
                        if( ( (list[i].CRSE_CLASS_NM != null) && ((list[i].CRSE_CLASS_NM.indexOf("공예") != -1) || (list[i].CRSE_CLASS_NM.indexOf("꽃") != -1) ) ) && city == list[i].SIGUN_NM ) //과목명에 컴퓨터 포함하면  && city == list[i].SIGUN_NM
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            window.placename2[i] = list[i].FACLT_NM;
                            window.category2[i] = list[i].CRSE_CLASS_NM;
                            window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone2[i] = list[i].TELNO; //연락처
                            window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                            window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                            window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                            window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                            window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                            window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude2[i],
                                x: longitude2[i],
                                img: "/images/marker.png",
                                category: "[공예] "+category2[i],
                                name: placename2[i],
                                etc: phone2[i],
                                address: address2[i]
                            };
    
                            addSymbol(abj);
                        }
                    }
                    
                }
                $("#output").html(contentStr);

                var subcategory2 = document.getElementById("sub2");
                subcategory2.innerHTML = "<span>공예 2. Making ...</span>";
                $("#output2").html(contentStr2);
            }
        })
    }

    /* 어학 */
    if (result.hobby_type == "어학")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Language </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Speaking </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>어학 1. Language ...</span>";

         $.ajax({
             type: "GET",
             url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
             success:function(data){
                 var text = JSON.parse(data);
                 var list = text.Tbinstutm[1].row;
                 var contentStr = "";
                var contentStr2 = "";
                 
                 //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    //1. 외국어 학원
                    if( ( (list[i].CRSE_CLASS_NM != null) && ( (list[i].CRSE_CLASS_NM.indexOf("영어") != -1) || (list[i].CRSE_CLASS_NM.indexOf("외국어") != -1)) ) && city == list[i].SIGUN_NM ) //과목명에 영어나 외국어 포함하면 
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].TELNO == null)
                        {
                            list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        
                        window.placename[i] = list[i].FACLT_NM;
                        window.category[i] = list[i].CRSE_CLASS_NM;
                        window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone[i] = list[i].TELNO; //연락처
                        window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                        window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                        window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                        window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                        window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                          
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';

                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[어학] "+category[i],
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                    else
                    {
                        //2. 논술
                        if( ( (list[i].CRSE_CLASS_NM != null) && ((list[i].CRSE_CLASS_NM.indexOf("논술") != -1) ) )&& city == list[i].SIGUN_NM ) //과목명에 논술 포함하면  && city == list[i].SIGUN_NM
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            window.placename2[i] = list[i].FACLT_NM;
                            window.category2[i] = list[i].CRSE_CLASS_NM;
                            window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone2[i] = list[i].TELNO; //연락처
                            window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                            window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                            window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                            window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                            window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                            window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude2[i],
                                x: longitude2[i],
                                img: "/images/marker.png",
                                category: "[어학] "+category2[i],
                                name: placename2[i],
                                etc: phone2[i],
                                address: address2[i]
                            };
    
                            addSymbol(abj);
                        }
                    }
                }
                 $("#output").html(contentStr);

                var subcategory2 = document.getElementById("sub2");
                subcategory2.innerHTML = "<span>어학 2. Speaking ...</span>";
                $("#output2").html(contentStr2);
             }
         })
     }

     
    /* 춤 */
    if (result.hobby_type == "춤")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Modern Dance </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Dancing </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>춤 1. Modern Dance ...</span>";

        //1. 무용
        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/DanceAcademy?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.DanceAcademy[1].row;
                var contentStr = "";
                var contentStr2 = "";

                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    if( city == list[i].SIGUN_NM ) //사용자 위치 = 장소 도시 
                    {
                        if (list[i].BIZPLC_NM == null)
                        {
                            list[i].BIZPLC_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].LOCPLC_FACLT_TELNO == null)
                        {
                            list[i].LOCPLC_FACLT_TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        window.placename[i] = list[i].BIZPLC_NM;
                        window.category[i] = "현대 무용";
                        window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone[i] = list[i].LOCPLC_FACLT_TELNO; //연락처
                        window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                        window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                        window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                        window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                        window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                          
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
 
                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[무용] 현대무용",
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                }
                $("#output").html(contentStr);
            }
        })
        //2. 춤+연기
        var subcategory2 = document.getElementById("sub2");
        subcategory2.innerHTML += "<span>춤 2. Dancing ...</span>";
        
            $.ajax({//연극
                type: "GET",
                //datatype: "json",
                url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=4&pSize=1000",
                success:function(data){
                    var text = JSON.parse(data);
                    var list = text.Tbinstutm[1].row;
                    var contentStr = "";
                    
                    //배열로 저장
                    for(var i=0; i<list.length; i++)
                    {
                        if( ( (list[i].CRSE_CLASS_NM != null) && ((list[i].CRSE_CLASS_NM.indexOf("연극") != -1 || (list[i].FACLT_NM.indexOf("댄스") != -1))) )) //&& (city == list[i].SIGUN_NM) )
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            window.placename2[i] = list[i].FACLT_NM;
                            window.category2[i] = list[i].CRSE_CLASS_NM;
                            window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone2[i] = list[i].TELNO; //연락처
                            window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                            window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                            window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                            window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                            window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                            window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude2[i],
                                x: longitude2[i],
                                img: "/images/marker.png",
                                category: "[무용] 현대무용 / 연기",
                                name: placename2[i],
                                etc: phone2[i],
                                address: address2[i]
                            };
    
                            addSymbol(abj);
                        }
                    }

                    $("#output2").append(contentStr);

                }
            })
    }

    /* 요리 */
    if (result.hobby_type == "요리")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Cooking </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Barista </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>요리 1. Cook ...</span>";

         $.ajax({
             type: "GET",
             //datatype: "json",
             url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
             success:function(data){
                 var text = JSON.parse(data);
                 var list = text.Tbinstutm[1].row;
                 var contentStr = "";
                 var contentStr2 = "";
                 
                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    
                    //1. 요리
                    if ( ( (list[i].FACLT_NM != null) && (list[i].FACLT_NM.indexOf("요리") != -1)) && city == list[i].SIGUN_NM ) //과목명에 컴퓨터 포함하면 
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].TELNO == null)
                        {
                            list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                        }

                        window.placename[i] = list[i].FACLT_NM;
                        window.category[i] = list[i].CRSE_CLASS_NM;
                        window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone[i] = list[i].TELNO; //연락처
                        window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                        window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                        window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                        window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                        window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                          
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';

                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[요리] 요리",
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                    else
                    {
                        //2. 바리스타 + 소믈리에
                        if( ( (list[i].CRSE_CLASS_NM != null) && ((list[i].CRSE_CLASS_NM.indexOf("식음료품") != -1))) && city == list[i].SIGUN_NM ) //과목명에 컴퓨터 포함하면  && city == list[i].SIGUN_NM
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            window.placename2[i] = list[i].FACLT_NM;
                            window.category2[i] = list[i].CRSE_CLASS_NM;
                            window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone2[i] = list[i].TELNO; //연락처
                            window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                            window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                            window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                            window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                            window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                            window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';
                            
                            var abj =
                            {
                                y: latitude2[i],
                                x: longitude2[i],
                                img: "/images/marker.png",
                                category: "[요리] 바리스타",
                                name: placename2[i],
                                etc: phone2[i],
                                address: address2[i]
                            };
    
                            addSymbol(abj);
                        }

                    }

                }
                 $("#output").html(contentStr);

                var subcategory2 = document.getElementById("sub2");
                subcategory2.innerHTML = "<span>요리 2. barista ...</span>";
                $("#output2").html(contentStr2);
             }
         })
    }

     /* 음악 */
    if (result.hobby_type == "음악")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Vocal </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Instrument </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>음악 1. vocal ...</span>";

        $.ajax({//음악학원
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                var contentStr2 = "";
                
                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    //1. 보컬
                    if( ( (list[i].CRSE_CLASS_NM != null) && ( (list[i].CRSE_CLASS_NM.indexOf("보컬") != -1) || list[i].CRSE_CLASS_NM.indexOf("음악") != -1 ) ) && city == list[i].SIGUN_NM ) //과목명에 음악이나 보컬 포함하면 
                    {
                        if (list[i].FACLT_NM == null)
                        {
                            list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].TELNO == null)
                        {
                            list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                        }
                    

                        window.placename[i] = list[i].FACLT_NM;
                        window.category[i] = list[i].CRSE_CLASS_NM;
                        window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone[i] = list[i].TELNO; //연락처
                        window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                        window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                        window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                        window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                        window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                        window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                          
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';
                        
                        var abj =
                        {
                            y: latitude[i],
                            x: longitude[i],
                            img: "/images/marker.png",
                            category: "[음악] 보컬",
                            name: placename[i],
                            etc: phone[i],
                            address: address[i]
                        };

                        addSymbol(abj);
                    }
                    else
                    {
                        //2. 악기
                        if ( ( (list[i].CRSE_CLASS_NM != null) && ((list[i].CRSE_CLASS_NM.indexOf("피아노") != -1) || (list[i].CRSE_CLASS_NM.indexOf("드럼") != -1))) && city == list[i].SIGUN_NM)
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            window.placename2[i] = list[i].FACLT_NM;
                            window.category2[i] = list[i].CRSE_CLASS_NM;
                            window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone2[i] = list[i].TELNO; //연락처
                            window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                            window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                            window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                            window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                            window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                            window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude2[i],
                                x: longitude2[i],
                                img: "/images/marker.png",
                                category: "[음악] 악기",
                                name: placename2[i],
                                etc: phone2[i],
                                address: address2[i]
                            };
    
                            addSymbol(abj);
                        }
                    }
                }

                $("#output").html(contentStr);

                var subcategory2 = document.getElementById("sub2");
                subcategory2.innerHTML = "<span>음악 2. Instrument ...</span>";
                $("#output2").html(contentStr2);
            }
        })
        //2. 노래방
        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/sngrumIndutype?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.sngrumIndutype[1].row;
                var contentStr = "";
                
                for(var i=0; i<list.length; i++)
                {
                    if( (city == list[i].SIGUN_NM) && (list[i].BSN_STATE_NM != null) && (list[i].BSN_STATE_NM.indexOf("폐") == -1) )
                    {
                        if (list[i].BIZPLC_NM == null)
                        {
                            list[i].BIZPLC_NM = "시설명 정보가 존재하지 않습니다.";
                        }
                        if (list[i].REFINE_ROADNM_ADDR == null)
                        {
                            list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                        }
                        if (list[i].CULTUR_BIZMAN_DIV_NM == null)
                        {
                            list[i].CULTUR_BIZMAN_DIV_NM = "업종 정보가 존재하지 않습니다.";
                        }

                        window.category3[i] = "노래방";
                        window.placename3[i] = list[i].BIZPLC_NM; //장소명
                        window.address3[i] = list[i].REFINE_ROADNM_ADDR; //주소
                        window.phone3[i] = list[i].CULTUR_BIZMAN_DIV_NM; //업종 정보
                        window.latitude3[i] = (list[i].REFINE_WGS84_LAT); //위도
                        window.longitude3[i] = (list[i].REFINE_WGS84_LOGT); //경도
                        window.x3[i] = (Math.cos(latitude3[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude3[i]-user_longitude)); 
                        window.y3[i] = 111 * Math.abs(latitude3[i] - user_latitude);
                        window.distance3[i] = Math.sqrt( (Math.pow(x3[i], 2)) + (Math.pow(y3[i],2)) ); //거리
                        window.all3[i] = [placename3[i], address3[i], phone3[i], latitude3[i], longitude3[i], distance3[i], category3[i]]; //배열로 저장
                        
                        contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                        '<h4>'+window.placename3[i]+'</h4><hr><h2>'+window.address3[i]+"<br></br>"+window.phone3[i]+
                        '</h2><br><div class="sebu" align="center">'+
                        '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename3[i]+"&latitude="+latitude3[i]+"&longitude="+longitude3[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                        '<button type="button" id="like">좋아요</button>'+
                        '<button type="button" id="star">즐겨찾기</button></li></div>';

                        var abj =
                        {
                            y: latitude3[i],
                            x: longitude3[i],
                            img: "/images/marker.png",
                            category: "[음악] 노래방",
                            name: placename3[i],
                            etc: phone3[i],
                            address: address3[i]
                        };

                        addSymbol(abj);
                    }
                }
                
                $("#output").append(contentStr);

                window.placename = window.placename.concat(window.placename3);
                window.address = window.address.concat(window.address3);
                window.phone = window.phone.concat(window.phone3);
                window.latitude = window.latitude.concat(window.latitude3);
                window.longitude = window.longitude.concat(window.longitude3);
                window.all = window.all.concat(window.all3);

                all = all.filter(function(item)
                {
                    return item !== null && item !== undefined && item !== '';
                })
            }
        })
    }

    /* 패션 */
    if (result.hobby_type == "패션")
    {
        $("#subcat1").html('<button id="subcat" style="float: left;"><a href="#target1">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Hair </h5></a></button>');
        $("#subcat2").html('<button id="subcat" style="float: left;"><a href="#target2">'+
            //'<img src="/images/submovie.PNG" id="place"></img>' +
            '<h5> Beauty </h5></a></button>');
        var subcategory = document.getElementById("sub");
        subcategory.innerHTML = "<span>패션 1. Hair ...</span>";

        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=4&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                var contentStr2 = "";

                //배열로 저장
                for(var i=0; i<list.length; i++)
                {
                    //1. 미용
                    if ( ( (list[i].CRSE_CLASS_NM != null) && (list[i].CRSE_CLASS_NM.indexOf("미용") != -1) ) && city == list[i].SIGUN_NM)
                    {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            
                            window.placename[i] = list[i].FACLT_NM;
                            window.category[i] = "미용";
                            window.address[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone[i] = list[i].TELNO; //연락처
                            window.latitude[i] = (list[i].REFINE_WGS84_LAT);//위도
                            window.longitude[i] = (list[i].REFINE_WGS84_LOGT) //경도
                            window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude)); 
                            window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                            window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) ); //거리
                            window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i],category[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename[i]+'</h4><hr><h2>'+window.address[i]+"<br></br>"+window.phone[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename[i]+"&latitude="+latitude[i]+"&longitude="+longitude[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude[i],
                                x: longitude[i],
                                img: "/images/marker.png",
                                category: "[패션] 미용",
                                name: placename[i],
                                etc: phone[i],
                                address: address[i]
                            };
    
                            addSymbol(abj);
                    }
                    else
                    {
                        //2. 네일 (뷰티)
                        if( ( (list[i].CRSE_CLASS_NM != null) && ((list[i].CRSE_CLASS_NM.indexOf("네일") != -1) || (list[i].FACLT_NM.indexOf("뷰티") != -1) ) ) && city == list[i].SIGUN_NM ) //과목명에 컴퓨터 포함하면  && city == list[i].SIGUN_NM
                        {
                            if (list[i].FACLT_NM == null)
                            {
                                list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                            }
                            if (list[i].REFINE_ROADNM_ADDR == null)
                            {
                                list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                            }
                            if (list[i].TELNO == null)
                            {
                                list[i].TELNO = "연락처 정보가 존재하지 않습니다.";
                            }

                            window.placename2[i] = list[i].FACLT_NM;
                            window.category2[i] = list[i].CRSE_CLASS_NM;
                            window.address2[i] = list[i].REFINE_ROADNM_ADDR; //주소
                            window.phone2[i] = list[i].TELNO; //연락처
                            window.latitude2[i] = (list[i].REFINE_WGS84_LAT); //위도
                            window.longitude2[i] = (list[i].REFINE_WGS84_LOGT); //경도
                            window.x2[i] = (Math.cos(latitude2[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude2[i]-user_longitude)); 
                            window.y2[i] = 111 * Math.abs(latitude2[i] - user_latitude);
                            window.distance2[i] = Math.sqrt( (Math.pow(x2[i], 2)) + (Math.pow(y2[i],2)) ); //거리
                            window.all2[i] = [placename2[i], address2[i], phone2[i], latitude2[i], longitude2[i], distance2[i],category2[i]]; //배열로 저장
                            
                            contentStr += '<li class="list-group-item" style="margin-top:50px; margin-bottom:50px; border-color:white; border-radius: 40px 80px;">'+
                            '<h4>'+window.placename2[i]+'</h4><hr><h2>'+window.address2[i]+"<br></br>"+window.phone2[i]+
                            '</h2><br><div class="sebu" align="center">'+
                            '<button type="button" id="detail" onclick="location.href='+"'/placedetail?name="+placename2[i]+"&latitude="+latitude2[i]+"&longitude="+longitude2[i]+"&category="+result.hobby_type+"'"+'">자세히보기</button>'+
                            '<button type="button" id="like">좋아요</button>'+
                            '<button type="button" id="star">즐겨찾기</button></li></div>';

                            var abj =
                            {
                                y: latitude2[i],
                                x: longitude2[i],
                                img: "/images/marker.png",
                                category: "[패션] 네일(뷰티)",
                                name: placename2[i],
                                etc: phone2[i],
                                address: address2[i]
                            };

                        addSymbol(abj);
                        }
                    }
                } 
                $("#output").html(contentStr);

                var subcategory2 = document.getElementById("sub2");
                subcategory2.innerHTML = "<span> 패션 2. Beauty ...</span>";
                $("#output2").html(contentStr2);
            }
        })
    }
}

/* 장소 목록들 마커 */
function addSymbol(obj) 
{
 
    /* 마커 추가*/
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(obj.y , obj.x), //마커가 위치할 위도,경도
        icon: obj.img, // 마커로 사용할 이미지
        title: obj.title, // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
        map: map
    });

    /* 마커 이벤트 리스너 */
    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            
            content = '<div id="MarkerText"><h4><a style="color: rgb(8, 0, 100);" target="_blank" href=" /placedetail?name='+obj.name+'&latitude='+obj.y+'&longitude='+obj.x+'">'+obj.name+'</a></h4><p>카테고리: '+
            obj.category+'<br>주소: '+obj.address+'<br>기타 정보: '+obj.etc+'</div>';
            //html로 표시될 인포 윈도우의 내용
            infoWindow.setContent(content);
            
            //인포윈도우가 표시될 위치
            infoWindow.open(map, marker);
            map.setZoom(14);
        }
    })(marker));
}
    
