const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
random.extend({
    tokenHead: function () {
        return "Beare"
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
        username,
        password
    } = req.body;
    if (username === undefined || username === '')
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
        username,
        password
    } = req.body;
    if (username === undefined || username === '')
        res.json(renderResult(null, 500, '操作失败，用户名不合法'))
    else if (password === undefined || password === '')
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
        "username": "@cname",
        "nickName": "@cname",
        "avatar": "@image(80x80, '#FF6600')",
        "phoneNumber": '@phoneNumber',
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

// 推荐工具列表
router.get('/kitList', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        pageNum = 3,
        pageSize = 8,
        category = "ALL"
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum + 2) * pageSize + Mock.mock('@integer(1, 5)')
    let isAll = category === "ALL"
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 3,
        "total": total,
        "list|8": [{
            "id|+1": 15,
            "title": "@title",
            "address": "@url",
            "desc": "@csentence(2, 10)",
            "icon": "@image(80x80, @color)",
            "updatedTime": "@datetime",
            "state": "@integer(0, 1)",
            "category": isAll ? "@cword(2,4)" : category,
            "tagList|3-6": [{
                "id": "@integer(2, 100)",
                "tagName": "@cword(2, 4)",
                "generatedTime": "@datetime"
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