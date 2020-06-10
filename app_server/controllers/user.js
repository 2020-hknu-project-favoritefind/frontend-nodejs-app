/* 로그인 */
module.exports.login = function (req, res) {
    res.render('login', { title: 'login' }); //app_server-views-login-로그인화면
};

/* 회원가입 */
module.exports.join = function (req, res) {
    res.render('joinus', { title: 'join us' });
};

/* 회원가입 과정 */
module.exports.join_process = async function (req, res) {
    const axios = require("axios").default;
    const { SHA3 } = require("sha3");

    const hash = new SHA3(512);
    hash.update(req.body.password);
    await axios.post(`http://45.32.36.198/auth?id=${req.body.user_id}&pw=${hash.digest("hex")}`);
    res.redirect("/");
}

/* 즐겨찾기 */
module.exports.like = function (req, res) {
    res.render('like', { title: '즐겨찾기' });
};