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
      'id': '@id',
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
module.exports = router;