/* url 파라미터 스크립트로 가져오기 */
function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

/* 결과 요청하는 함수 */
function testScore()
{
    var answerjs = {
        "apikey":"68b58f114640274a7d06e220f62feac1",
        "qestrnSeq" : "18",
        "trgetSe": "100207",
        "gender": "100323",
        "grade": "3",
        "startDtm": timestamp,
        "answers": '"'+AnswerStr+'"'
    };

    $.ajax({
        url:"http://inspct.career.go.kr/openapi/test/report?apikey=68b58f114640274a7d06e220f62feac1&q=18",
        contentType: "application/json",
        type:"POST",
        data:JSON.stringify(answerjs),
        contentType: "application/json",
        success: function(data)
        {
            console.log(data);
            var text = data;
            var list = text.RESULT;
            var contentStr = "";
            
            //contentStr += '<li class="list-group-item"> 검사결과) ' +list.url+'</li>'; 
            contentStr += '<li class="list-group-item"><a href="'+list.url+'"> 여기를 눌러서 당신의 홀랜드 유형을 확인해보세요!</a></li>';
            $("#testEnd").html(contentStr);
        }
        
    })
}

/* 유형에 따라 나타나게 하는 함수 */
function yourHobby()
{
    var img = "";
    img = '<li> <img src="/images/convention.png" style="height: 18em; width: 32em;") </li>'; //사진
    img += '<div class="wrapper"><a href="/map?hobby_type=공예" class="btn10"><span>관습형 취미 추천</span><div class="transition"></div></a></div>' //버튼-링크
    $("#YourType").html(img);
    
    $('select[name=TestType]').change(function()
    {
        var imgText = $(this).val();
        var hobbyType = "";
        var typeText = "";

        if($(this).val() == "artistic")
        {
            hobbyType = "미술";
            typeText = "예술";
        }
        if($(this).val() == "convention")
        {
            hobbyType = "공예";
            typeText = "관습";
        }
        if($(this).val() == "enterprise")
        {
            hobbyType = "어학";
            typeText = "기업";
        }
        if($(this).val() == "invest")
        {
            hobbyType = "교양";
            typeText = "탐구";
        }
        if($(this).val() == "real")
        {
            hobbyType = "레포츠";
            typeText = "실재";
        }
        if($(this).val() == "social")
        {
            hobbyType = "어학";
            typeText = "사회";
        }

        img = '<li> <img src="/images/'+imgText+'.png" style="height: 18em; width: 32em") </li>';
        img += '<div class="wrapper"><a href="map?hobby_type='+hobbyType+'" class="btn10"><span>'+typeText+'형 취미 추천</span><div class="transition"></div></a></div>' //버튼-링크
        $("#YourType").html(img);
    })
}


/* A=1, A=2, ... 형태로 가져오기 */
var A = new Array(); //파라미터 > 유저 답 넣을 배열
var AnswerStr = ""; //배열 > 스트링 > 결과 요청할 때
var timestamp =+ new Date();

$(document).ready(function()
{
    for(var i=0; i<=161; i++)
    {
        A[i]=getParam('answer'+i);
        AnswerStr += ("A"+(i+1)+"="+A[i]+" ");
    }

    testScore();
    yourHobby();
})

