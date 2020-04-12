/* 시작화면 */
module.exports.home = function (req, res) {
    res.render('home', { title: '페이보릿' });
};

/* 카테고리 */
module.exports.place = function (req, res)
{
    res.render('place', { title: '분야' })
}
/* 취미분석 */
module.exports.test = function (req, res) {
    res.render('test', { title: '취미 분석' });
};

/* 장소추천 첫화면-실내 실외 물어보기*/
module.exports.find = function (req, res) {
    res.render('find', { title: '장소 추천' });
};

/* 추천 장소 표시 */
module.exports.map = function (req, res) {
    res.render('map', { title: '당신에게 맞는 취미는?', inout: req.query.inout, hobby_type: req.query["hobby-type"] });
};

/* 장소추가 */
module.exports.add = function (req, res) {
    res.render('add', { title: '장소 추가' });
};

/* 인기장소 */
module.exports.best = function (req, res) {
    res.render('best', { title: 'TOP 20' });
};