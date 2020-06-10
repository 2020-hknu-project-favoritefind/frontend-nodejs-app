var express = require('express');
var router = express.Router();
var ctrlHobby = require('../controllers/hobby');
var ctrlUser = require('../controllers/user');

/* GET Hobby page. */
router.get('/', ctrlHobby.home); //시작화면
router.get('/test', ctrlHobby.test); //취미분석
router.get('/find', ctrlHobby.find); //장소 추천-사용자에게 장소/분야 물어보기
router.get('/map', ctrlHobby.map) //장소 추천2-지도랑 보여주기
router.get('/place', ctrlHobby.place) //카테고리에서 클릭
router.get('/place/add', ctrlHobby.add); //장소 추가
router.get('/place/best', ctrlHobby.best); //인기 장소
router.get('/placedetail', ctrlHobby.detail); //장소 세부 정보

/* GET User pages */
router.get('/login', ctrlUser.login); //로그인
router.post('/login/process', ctrlUser.login_process);// 로그인 과정
router.get('/join', ctrlUser.join); //회원가입
router.post('/join/process', ctrlUser.join_process);//회원가입 과정
router.get('/like', ctrlUser.like); //즐겨찾기

/* 아직 디자인 안한 페이지 */
// 1. 검색화면

module.exports = router;
