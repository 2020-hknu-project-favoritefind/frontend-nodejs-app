//처음화면-카테고리에서 레포츠 클릭했을 때 도전했는데 존나 안됨

window.onload = function() {
    handleRefresh();
}

function response_json(json)
{
    var jamsDiv = document.getElementById("here");
    var text = JSON.parse(json);
    var jams = PublicLivelihood.row; // 공공체육관 이름

    var place_button = document.getElementById("place"); //버튼 클릭된거 가져오기

    place_button.onclick = function() {

        if (place.value == "jam"); //만약 값이 레포츠면?
        {
            for (var i = 0; i < jams.length; i++)
            {
                jam = jams[i];
                var div = document.createElement("div");
                div.setAttribute("class", "jamItem");

                div.innerHTML = "[" + FACLT_NM + "]";
            }

            if(jamsDiv.childElementCount == 0)
            {
                jamsDiv.appendChild(div);
            }
            else
            {
                jamsDiv.insertBefore(div, jamsDiv.firstChild);
            }
        }
    }
    handleRefresh();

}

function handleRefresh()
{
    var url = "https://openapi.gg.go.kr/PublicLivelihood";
    var request = new XMLHttpRequest();
    request.open("GET",url);
    request.onload = function()
    {
        if(request.status == 200)
        {
            response_json(request.responseText);
        }
    };
    request.send(null);
}