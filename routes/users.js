const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
random.extend({
  gender: function () {
    const genders = ['男', '女', '其他', '保密'];
    return this.pick(genders);
  }
});

const getUserInfo = (phoneNumber) => {
  return Mock.mock({
    'errorCode': 0,
    'message': '成功',
    'data': {
      'name': '@cname',
      'phoneNumber': phoneNumber,
      'gender': '@gender',
      'avatar': 'user/avatars/3434.jpg',
      'groupId': '@int(1, 2)',
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

router.post('/get_user_info', (req, res, next) => {
  const {
    access_token
  } = req.body;
  res.json(getUserInfo(18717723912));
});

/* 获取用户信息，':'代表通配符 */
router.get('/:phoneNumber', function (req, res, next) {
  const {
    phoneNumber
  } = req.params;
  res.json(getUserInfo(phoneNumber));
});

//登录
router.post('/login', (req, res, next) => {
  const {
    user_phone,
    password,
    user_agent
  } = req.body;
  res.json(getUserInfo(user_phone));
});

//注册--验证
router.post('/verify', (req, res, next) => {
  const {
    user_phone,
    password,
    name,
    verify_code,
    user_agent,
    gender
  } = req.body;
  res.json(getUserInfo(user_phone));
});

//注册--获取验证码
router.post('/acquire_verify_code', (req, res, next) => {
  const {
    user_phone
  } = req.body;
  res.json({
    'errorCode': 0,
    'message': 'success'
  });
});

//忘记密码--验证
router.post('/verify_for_forget', (req, res, next) => {
  const {
    user_phone,
    password,
    verify_code,
    user_agent
  } = req.body;
  res.json({
    'errorCode': 0,
    'message': 'success'
  });
});

//忘记密码--获取验证码
router.post('/acquire_code_for_forget', (req, res, next) => {
  const {
    user_phone
  } = req.body;
  res.json({
    'errorCode': 0,
    'message': 'success'
  });
});

//修改手机号--验证
router.post('/verify_for_modify', (req, res, next) => {
  const {
    user_phone,
    new_user_phone,
    verify_code,
    user_agent,
    access_token
  } = req.body;
  res.json(Mock.mock({
    'errorCode': 0,
    'message': '成功',
    'data': {
      'accessToken': '@string(64)',
      'refreshToken': '@string(64)'
    }
  }));
});

// 修改手机号--获取验证码
router.post('/acquire_code_for_modify', (req, res, next) => {
  const {
    user_phone,
    new_user_phone,
    access_token
  } = req.body;
  res.json({
    'errorCode': 0,
    'message': 'success'
  });
});
//修改密码--验证
router.post('/modify_password', (req, res, next) => {
  const {
    user_phone,
    original_password,
    password,
    access_token
  } = req.body;
  res.json({
    'errorCode': 0,
    'message': 'success'
  });
});

router.post('/logout', (req, res, next) => {
  const {
    access_token
  } = req.body;
  res.json({
    'errorCode': 0,
    'message': 'success'
  });
});

router.post('/refresh_token', (req, res, next) => {
  const {
    refresh_token,
    user_agent
  } = req.body;
  res.json(Mock.mock({
    'errorCode': 0,
    'message': 'success',
    'data': {
      'access_token': '@string(64)'
    }
  }));
});
module.exports = router;