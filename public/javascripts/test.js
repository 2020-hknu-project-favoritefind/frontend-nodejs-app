/* 심리검사 OPEN API 출력함수 */
function gettingTest()
{
    $.ajax({
        type: "GET",
        url: "http://inspct.career.go.kr/openapi/test/questions?apikey=68b58f114640274a7d06e220f62feac1&q=18",
        success:function(data)
        {
            var text = data;
            var list = text.RESULT;
            var contentStr = "";

            /* 출력 */
            for(var i=0; i<list.length; i++) 
            {
                if (i <= 142 || i >= 152) //144 ~ 152번까지는 주관식 항목이라 없애기
                {
                    /* 질문 list[0] > 다음문제에서 list[1] > list[2] ... */
                    contentStr += '<li class="list-group-item">질문'+(i+1)+') '+list[i].question; //</li>
                    
                    /* 답 name="answer0"-질문 1에서 val="answer01", answer02, ... answer10 */
                    if (list[i].answer01 != null)
                    {
                        contentStr += '<br></br><label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore01+'" checked="checked" />'+list[i].answer01+'</label>　　';
                    }
                    if (list[i].answer02 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore02+'" />'+list[i].answer02+'</label>　　';
                    }
                    if (list[i].answer03 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore03+'" />'+list[i].answer03+'</label>　　';
                    }
                    if (list[i].answer04 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore04+'" />'+list[i].answer04+'</label>　　';
                    }
                    if (list[i].answer05 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore05+'" />'+list[i].answer05+'</label>　　';
                    }
                    if (list[i].answer06 != null)
                    {
                        contentStr += '<label><label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore06+'" />'+list[i].answer06+'</label>　　';
                    }
                    if (list[i].answer07 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore07+'" />'+list[i].answer07+'</label>　　';
                    }
                    if (list[i].answer08 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore08+'" />'+list[i].answer08+'</label>　　';
                    }
                    if (list[i].answer09 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore09+'" />'+list[i].answer09+'</label>　　';
                    }
                    if (list.answer10 != null)
                    {
                        contentStr += '<label><input type="radio" name="answer'+i+'"+ value="'+list[i].answerScore10+'" />'+list[i].answer10+'</label>　　';
                    }
                }
                contentStr += '</li>'
            }
            $("#testStart").html(contentStr);
        }
    })
}

$(document).ready(function()
{
    gettingTest();
})