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
    alert(AnswerStr)

    /* 결과 요청 */
    var answerjs = {
        "apikey":"68b58f114640274a7d06e220f62feac1",
            "qestrnSeq" : "18",
            "trgetSe": "100208",
            "gender": "100323",
            "grade": "3",
            "startDtm": timestamp,
            "answers": AnswerStr
    };

    $.ajax({
        url:"inspct.career.go.kr/openapi/test/report?apikey=68b58f114640274a7d06e220f62feac1&q=18",
        type:"POST",
        data:JSON.stringify(answerjs),
        contentType: "application/json",
        success: function(data)
        {
            alert(data);
        }
        
    })
})

