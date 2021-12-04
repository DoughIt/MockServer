const express = require('express');
const multiparty = require('multiparty')
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
random.extend({
    tokenHead: function () {
        return "Beare"
    },
    phoneNumber: function () {
        return this.pick(['187', '132', '191', '157']) + Mock.mock(/\d{8}/)
    }
});

const renderResult = (data, code = 200, message = '操作成功') => {
    return Mock.mock({
        'code': code,
        'message': message,
        'data': data
    })
}

//登录
router.post('/login', (req, res, next) => {
    const {
        studentId,
        openId,
        password
    } = req.body;
    if ((studentId === undefined && openId === undefined)
        || (studentId === '' && openId === ''))
        res.json(renderResult(null, 500, '操作失败，用户名不合法'))
    else if (password === undefined || password === '')
        res.json(renderResult(null, 500, '操作失败，密码为空'))
    res.json(renderResult({
        'tokenHead': '@tokenHead',
        'token': '@string(32).@string(32)'
    }))
});

//注册
router.post('/register', (req, res, next) => {
    const {
        studentId,
        openId,
        password,
        nickname
    } = req.body;
    if (studentId === undefined && openId === undefined)
        res.json(renderResult(null, 500, '操作失败，用户名不合法'))
    else if (password === undefined || openId === '')
        res.json(renderResult(null, 500, '操作失败，密码为空'))
    res.json(renderResult(null))
});


//用户信息
router.get('/info', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult({
        'id': '@integer(2, 100000)',
        "unthorized": '@boolean',
        "studentId": '@string(number, 11)',
        "openId": "@string(28)",
        "username": "@cname",
        "avatar": "@image(80x80, '#FF6600')",
        "phone": '@phoneNumber',
        "description": "@csentence",
        "registerTime": "@datetime",
        "loginTime": "@datetime"
    }))
});

// 刷新token
router.get('/refreshToken', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult({
        'tokenHead': '@tokenHead',
        'token': '@string(32).@string(32)'
    }))
})

// 上传头像
router.put('/avatar', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))

    let form = new multiparty.Form();
    form.parse(req, (err, fields, file) => {
        if (file === undefined)
            res.json(renderResult(null, 500, '请正确选择头像'))
        res.json(renderResult({
            'url': '@url'
        }))
    })
})

// 更新用户信息
router.put('/info', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        username,
        description
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult(null))
})

// 更新密码
router.put('/password', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        password,
        newPassword
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))

    if (password === undefined || password === "")
        res.json(renderResult(null, 500, '密码错误'))

    if (newPassword === undefined || newPassword === "")
        res.json(renderResult(null, 500, '新密码不能为空'))

    res.json(renderResult(null))
})

// 获取验证码
router.get('/vCode', (req, res, next) => {
    const {
        studentId
    } = req.query
    if (studentId === undefined || studentId === '')
        res.json(renderResult(null, 500, "学号不能为空"))
    res.json(renderResult(null, 200, "操作成功，验证码已发送至" + studentId + "@fudan.edu.cn"))
});

// 验证邮箱
router.put('/vCode', (req, res, next) => {
    const {
        studentId,
        vCode
    } = req.body
    if (studentId === undefined || studentId === '')
        res.json(renderResult(null, 500, "学号不能为空"))
    if (vCode === undefined || vCode.length !== 4)
        res.json(renderResult(null, 500, "验证码是4位数字"))
    res.json(renderResult(null))
});


// 讨论区
router.get('/topicList', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        pageNum = 3,
        pageSize = 8,
        lessonId,
        goodsId,
        topicId
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum + 2) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 3,
        "total": total,
        "list|8": [{
            "id|+1": 245,
            "parentId": topicId === undefined ? null : topicId,
            "title": "@ctitle",
            "content": "@cparagraph(2, 5)",
            "user": {
                "id": "@integer(2, 100000)",
                "avatar": "@image(80x80, @color)",
                "username": "@cname"
            },
            "issueTime": "@datetime",
            "state": "@integer(0, 1)",
            "children|5": topicId !== undefined ? null : [{
                "id|+1": 893,
                "parentId": 245,
                "title": "@ctitle",
                "content": "@cparagraph(2, 5)",
                "user": {
                    "id": "@integer(2, 100000)",
                    "avatar": "@image(80x80, '#FF6600')",
                    "username": "@cname"
                },
                "issueTime": "@datetime",
                "state": "@integer(0, 1)",
                "children": null
            }]
        }]
    }))
})

// 添加帖子
router.post('/topic', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        title,
        content,
        lessonId,
        goodsId,
        topicId
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (content === undefined)
        res.json(renderResult(null, 500, "操作失败，内容不能为空"))
    res.json(renderResult({
        "id": "@integer(2, 100000)",
        "parentId": topicId === undefined ? null : topicId,
        "title": "@ctitle",
        "content": "@cparagraph(2, 5)",
        "user": {
            "id": "@integer(2, 100000)",
            "avatar": "@image(80x80, '#FF6600')",
            "username": "@cname"
        },
        "issueTime": "@datetime",
        "state": "@integer(0, 1)",
        "children": null
    }))
})


module.exports = router;