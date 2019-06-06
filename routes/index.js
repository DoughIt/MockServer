const path = require('path');
const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;

const roads = ['蔡伦路', '博华路', '龙阳路', '芳华路', '高科路', '花木路', '陈春路', '张衡路', '海科路', '金科路', '高科中路', '碧波路', '中科路', '学林路', '康桥路'];
const communities = ['张江高科技园区', '锦绣满堂花园', '如意佳园', '旭辉公元城市'];
random.extend({
  road: function () {
    return this.pick(roads);
  },
  community: function () {
    return this.pick(communities);
  }
});
const getCommunityRoadInfo = function () {
  return Mock.mock({
    'errorCode': 0,
    'message': '成功',
    'itemList|20-40': [{
      'community': '@community',
      'road': '@road'
    }]
  });
};
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/api/community_road', function (req, res, next) {
  res.json(getCommunityRoadInfo());
});

router.post('/api/part_a/info/:id', function (req, res, next) {
  const {
    id
  } = req.params;
  res.json(Mock.mock({
    'errorCode': 0,
    'message': '成功',
    'data': {
      'partAId': id,
      'name': '@cname',
      'weChatId': 'wx_id_@id',
      'phoneNumber': '18717723912'
    }
  }));
});

router.get('/api/apk/latest_version', function (req, res, next) {
  res.json(Mock.mock({
    'errorCode': 0,
    'message': '成功',
    'data': {
      "versionCode": 2,
      "versionName": "1.0.1",
      "url": "apk/duoduo.apk?version=1.0.1",
      "issueComment": "修复了XXX"
    }
  }));
});
router.get('/api/apk/duoduo.apk', function (req, res, next) {
  const {
    version
  } = req.query;
  console.log(version);
  res.sendFile(path.resolve('routes/app-debug.apk'));
});
module.exports = router;