const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
random.extend({
  gender: function () {
    const genders = ['男', '女', '其他', '保密'];
    return this.pick(genders);
  }
})
const getUserInfo = (phoneNumber) => {
  return Mock.mock({
    'errorCode': 0,
    'message': '成功',
    'data': {
      'name': '@cname',
      'phoneNumber': phoneNumber,
      'gender': '@gender',
      'avatar': 'user/avatars/3434.jpg',
      'groupId': 2,
      'provider': {
        'id': '@id',
        'permission': '@int(0,1)',
        'company': '多多房产',
        'icon': '@image()'
      },
      'accessToken': '@string(64)',
      'refreshToken': '@string(64)'
    }
  });
};

/* 获取用户信息，':'代表通配符 */
router.get('/:phoneNumber', function (req, res, next) {
  const {
    phoneNumber
  } = req.params;
  res.json(getUserInfo(phoneNumber));
});

module.exports = router;