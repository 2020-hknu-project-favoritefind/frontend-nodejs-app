/* url 파라미터 스크립트로 가져오기 */
function get_query(){
    var url=document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}
var result = get_query();

var user_latitude = 0; //사용자 위도
var user_longitude = 0; //사용자 경도
var placename = []; //시설명
var address = []; //주소
var phone = []; //전화번호
var latitude = []; // 장소 위도
var longitude = []; //장소 경도
var x = []; // 거리순 정렬 - x
var y = []; // 거리순 정렬 - y
var distance = []; // 거리순 정렬 - 위도 경도 거리
var all = []; // 총 집합

/* 실제 OPEN API 출력! */
$(document).ready(function()
{
    
    function getMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLatitude);
        } else {
            alert("Oops, no geolocation support");
        }
    }
    
    function displayLatitude(position)
    {
        window.user_latitude = position.coords.latitude;
        window.user_longitude = position.coords.longitude;
    }

    function placeRecommend()
    {
    /* 교양 */
    if (result.hobby_type == "교양")
    {
        $.ajax({//공연장
            type: "GET",
            url: "https://openapi.gg.go.kr/PerformPlace?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PerformPlace[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                    contentStr += '<li class="list-group-item">[이름]'+list[i].BIZPLC_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].LOCPLC_FACLT_TELNO+"</li>";
                } 
                $("#output").html(contentStr);

                
                //거리순 정렬
                for(var i=0; i<list.length; i++)
                {
                    window.placename[i] = list[i].BIZPLC_NM;
                    window.address[i] = list[i].REFINE_ROADNM_ADDR;
                    window.phone[i] = list[i].LOCPLC_FACLT_TELNO;
                    window.latitude[i] = (list[i].REFINE_WGS84_LAT);
                    window.longitude[i] = (list[i].REFINE_WGS84_LOGT);
                    window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude));
                    window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                    window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) );
                    window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i]];
                }
            }
        })
        $.ajax({//영화관
            type: "GET",
            url: "https://openapi.gg.go.kr/MovieTheater?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.MovieTheater[1].row;
                var contentStr = "";

                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                    contentStr += '<li class="list-group-item">[이름]'+list[i].BIZPLC_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].LOCPLC_FACLT_TELNO+"</li>";
                } 
                $("#output").append(contentStr);

                //거리순 정렬
                for(var i=0; i<list.length; i++)
                {
                    window.placename[i] = list[i].BIZPLC_NM;
                    window.address[i] = list[i].REFINE_ROADNM_ADDR;
                    window.phone[i] = list[i].LOCPLC_FACLT_TELNO;
                    window.latitude[i] = (list[i].REFINE_WGS84_LAT);
                    window.longitude[i] = (list[i].REFINE_WGS84_LOGT);
                    window.x[i] = (Math.cos(latitude[i] * 6400 * 2 * 3.14 / 360) * Math.abs(longitude[i]-user_longitude));
                    window.y[i] = 111 * Math.abs(latitude[i] - user_latitude);
                    window.distance[i] = Math.sqrt( (Math.pow(x[i], 2)) + (Math.pow(y[i],2)) );
                    window.all[i] = [placename[i], address[i], phone[i], latitude[i], longitude[i], distance[i]];
                }
            }
        })
    }

    /* 레포츠 */
    if (result.hobby_type == "레포츠")
    {
        $.ajax({//사격장
            type: "GET",
            url: "https://openapi.gg.go.kr/PubPhysTrainFaciltyShootRange?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PubPhysTrainFaciltyShootRange[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
                {
                    if (list[i].FACLT_NM == null)
                    {
                        list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                    }
                    if (list[i].REFINE_ROADNM_ADDR == null)
                    {
                        list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                    }
                }

                for(var i=0; i<list.length; i++)
                {
                    contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+'</li>';
                } 
                $("#output").html(contentStr);
            }
        })
        $.ajax({//수영장
            type: "GET",
            url: "https://openapi.gg.go.kr/PublicSwimmingPool?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PublicSwimmingPool[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
                {
                    if (list[i].FACLT_NM == null)
                    {
                        list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                    }
                    if (list[i].REFINE_ROADNM_ADDR == null)
                    {
                        list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                    }
                }

                for(var i=0; i<list.length; i++)
                {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"</li>";
                } 
                $("#output").append(contentStr);
            }
        })
        $.ajax({//체육관
            type: "GET",
            url: "https://openapi.gg.go.kr/PublicLivelihood?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PublicLivelihood[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
                {
                    if (list[i].FACLT_NM == null)
                    {
                        list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                    }
                    if (list[i].REFINE_SIGUN_NM == null)
                    {
                        list[i].REFINE_SIGUN_NM = "지역 정보가 존재하지 않습니다.";
                    }
                }

                for(var i=0; i<list.length; i++)
                {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[지역]"+list[i].SIGUN_NM+"</li>";
                } 
                $("#output").append(contentStr);
            }
        })
        $.ajax({//체육도장
            type: "GET",
            url: "https://openapi.gg.go.kr/PhysicalTraining?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PhysicalTraining[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].BIZPLC_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].LOCPLC_FACLT_TELNO+"</li>";
                } 
                $("#output").append(contentStr);
            }
        })
        $.ajax({//낚시터
            type: "GET",
            url: "https://openapi.gg.go.kr/FISHPLCINFO?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.FISHPLCINFO[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                        contentStr += '<li class="list-group-item">[장소]'+list[i].FACLT_DIV_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].MANAGE_INST_TELNO+"</li>";
                } 
                $("#output").append(contentStr);
            }
        })
        $.ajax({//승마장
            type: "GET",
            url: "https://openapi.gg.go.kr/PublicHorseridingCenter?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.PublicHorseridingCenter[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
                {
                    if (list[i].FACLT_NM == null)
                    {
                        list[i].FACLT_NM = "시설명 정보가 존재하지 않습니다.";
                    }
                    if (list[i].SIGUN_NM == null)
                    {
                        list[i].SIGUN_NM = "지역 정보가 존재하지 않습니다.";
                    }
                    if (list[i].CONTCT_NO == null)
                    {
                        list[i].CONTCT_NO = "연락처 정보가 존재하지 않습니다.";
                    }
                }

                for(var i=0; i<list.length; i++)
                {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[지역]"+list[i].SIGUN_NM+"<br></br>[연락처]"+list[i].CONTCT_NO+"</li>";
                } 
                $("#output").append(contentStr);
            }
        }) //등산로,산책로 추가 못함 >> 웹페이지가 못버팀
    }

    /* 미술 */
    if (result.hobby_type == "미술")
    {
        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                    if(list[i].CRSE_CLASS_NM == "미술")
                    {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                    }
                } 
                $("#output").html(contentStr);
            }
        })
    }

    /* 공예 - url에서 최대 페이지 사이즈가 1000개가 한계라 임의로 페이지 인덱스 4로 설정 */
    if (result.hobby_type == "공예")
    {
        $.ajax({
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=4&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                    if(list[i].CRSE_CLASS_NM == "DIY가구제작(중급)" || list[i].CRSE_CLASS_NM == "DIY가구제작(초급)" || list[i].CRSE_CLASS_NM == "DIY목공" || list[i].CRSE_CLASS_NM == "로봇" || list[i].CRSE_CLASS_NM == "섬유공예머신퀼트" || list[i].CRSE_CLASS_NM == "꽃꽂이")
                    {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                    }
                } 
                $("#output").html(contentStr);
            }
        })
    }

    /* 어학 */
    if (result.hobby_type == "어학")
    {
         $.ajax({
             type: "GET",
             url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=4&pSize=1000",
             success:function(data){
                 var text = JSON.parse(data);
                 var list = text.Tbinstutm[1].row;
                 var contentStr = "";
                 
                 //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                 for(var i=0; i<list.length; i++)
                 {
                     if(list[i].CRSE_CLASS_NM == "실용외국어(유아/초·중·고)")
                     {
                         contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                     }
                 } 
                 $("#output").html(contentStr);
             }
         })
     }

     
    /* 춤 */
    if (result.hobby_type == "춤")
    {
        $.ajax({//댄스학원
            type: "GET",
            url: "https://openapi.gg.go.kr/DanceAcademy?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.DanceAcademy[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].BIZPLC_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].LOCPLC_FACLT_TELNO+"</li>";
                } 
                $("#output").html(contentStr);
            }
        })
            $.ajax({//연극
                type: "GET",
                //datatype: "json",
                url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=4&pSize=1000",
                success:function(data){
                    var text = JSON.parse(data);
                    var list = text.Tbinstutm[1].row;
                    var contentStr = "";
                    
                    //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                    for(var i=0; i<list.length; i++)
                    {
                        if(list[i].CRSE_CLASS_NM == "연극" || list[i].CRSE_CLASS_NM == "무용")
                        {
                            contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                        }
                    } 
                    $("#output").append(contentStr);
                }
            })
    }

    /* 요리 */
    if (result.hobby_type == "요리")
    {
         $.ajax({
             type: "GET",
             //datatype: "json",
             url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
             success:function(data){
                 var text = JSON.parse(data);
                 var list = text.Tbinstutm[1].row;
                 var contentStr = "";
                 
                 //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                 for(var i=0; i<list.length; i++)
                 {
                     if(list[i].CRSE_CLASS_NM == "식음료품(바리스타,소믈리에)" || list[i].CRSE_CLASS_NM == "식음료품")
                     {
                         contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                     }
                 } 
                 $("#output").html(contentStr);
             }
         })
    }

     /* 음악 */
    if (result.hobby_type == "음악")
    {
        $.ajax({//음악학원
            type: "GET",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                
                //null인 값 없다고 넣어주기
                for(var i=0; i<list.length; i++)
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
                }

                for(var i=0; i<list.length; i++)
                {
                    if(list[i].CRSE_CLASS_NM == "음악")
                    {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                    }
                } 
                $("#output").append(contentStr);
            }
        })
        $.ajax({//노래방
            type: "GET",
            url: "https://openapi.gg.go.kr/sngrumIndutype?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=1&pSize=50",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.sngrumIndutype[1].row;
                var contentStr = "";
                
                for(var i=0; i<list.length; i++)
                {
                    if (list[i].BIZPLC_NM == null)
                    {
                        list[i].BIZPLC_NM = "시설명 정보가 존재하지 않습니다.";
                    }
                    if (list[i].REFINE_ROADNM_ADDR == null)
                    {
                        list[i].REFINE_ROADNM_ADDR = "주소 정보가 존재하지 않습니다.";
                    }
                }

                for(var i=0; i<list.length; i++)
                {
                    contentStr += '<li class="list-group-item">[이름]'+list[i].BIZPLC_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"</li>";
                } 
                $("#output").html(contentStr);
            }
        })
    }

    /* 패션 */
    if (result.hobby_type == "패션")
    {
        $.ajax({
            type: "GET",
            //datatype: "json",
            url: "https://openapi.gg.go.kr/Tbinstutm?KEY=f6cc1704c2f24255b5cf45d4949f1f84&Type=json&pIndex=4&pSize=1000",
            success:function(data){
                var text = JSON.parse(data);
                var list = text.Tbinstutm[1].row;
                var contentStr = "";
                
                for(var i=0; i<list.length; i++)
                {
                    if(list[i].CRSE_CLASS_NM == "이·미용" || list[i].CRSE_CLASS_NM == "애견미용")
                    {
                        contentStr += '<li class="list-group-item">[이름]'+list[i].FACLT_NM+"<br></br>[주소]"+list[i].REFINE_ROADNM_ADDR+"<br></br>[연락처]"+list[i].TELNO+"</li>";
                    }
                } 
                $("#output").html(contentStr);
            }
        })
    }
    }
    placeRecommend();
    getMyLocation();
})

var sort = 1;

/* 가나다 순으로 목록 정렬 */
function sorting_name()
{
	var obj = $("#output");
	var list = obj.find('li');
	list.sort(function (left, right) {
		if (sort == "1") {
			return $(left).text().toUpperCase().localeCompare($(right).text().toUpperCase());
		} else {
			return $(right).text().toUpperCase().localeCompare($(left).text().toUpperCase());
		}
	}).each(function () {
		obj.append(this);
	});
	sort = (sort == 1) ? 2 : 1; //순서대로 정렬
}

function sorting_dis()
{
    console.log(user_latitude);
    console.log(user_longitude);
    all.sort(function(left, right)
    {
        return left[5]-right[5];
    })
    console.log(all);

    contentStr = '<li class="list-group-item">[이름]'+all[0][0] + "<br></br>[주소]"+all[0][1]+"<br></br>[연락처]"+all[0][2]+"</li>";
    for(var i=1; i<all.length; i++)
    {
        contentStr += '<li class="list-group-item">[이름]'+all[i][0]+"<br></br>[주소]"+all[i][1]+"<br></br>[연락처]"+all[i][2]+"</li>";
    } 
    $("#output").html(contentStr);

}

function sorting_like()
{
    alert("인기 순 정렬");
}