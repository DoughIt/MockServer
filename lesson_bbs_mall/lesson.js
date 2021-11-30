const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
random.extend({
    tokenHead: function () {
        return "Beare"
    },
    phoneNumber: function () {
        return this.pick(['187', '132', '191', '157']) + Mock.mock(/\d{8}/)
    },
    semester: function () {
        return this.pick(['春季', '秋季', '暑假学期', '寒假学期'])
    },
    credit: function () {
        return this.pick([0, 1, 2, 3, 5])
    }
});

const renderResult = (data, code = 200, message = '操作成功') => {
    return Mock.mock({
        'code': code,
        'message': message,
        'data': data
    })
}

// 课程列表
router.get('/lessonList', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        pageNum = 3,
        pageSize = 8,
        filter = "hot",
        keys
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
            "id|+1": 29,
            "lessonNumber": "@string('upper', 4)@string('number', 8)",
            "lessonName": "《 @ctitle 》",
            "teacherName": "@cname",
            "pictures|2-5": [
                "@image('1080x768', @color)"
            ],
            "semester": "@semester",
            "credit": "@credit"
        }]
    }))
})


// 课程信息
router.get('/info', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        id
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult({
        "id": id,
        "lessonNumber": "@string('upper', 4)@string('number', 8)",
        "lessonName": "《 @ctitle 》",
        "teacherName": "@cname",
        "pictures|2-5": [
            "@image('1080x768', @color)"
        ],
        "semester": "@semester",
        "credit": "@credit"
    }))
})


// 课程标签列表
router.get('/tagList', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        pageNum = 3,
        pageSize = 8,
        lessonId
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 1,
        "total": total,
        "list|8": [{
            "tagName": "@cword(2, 4)",
            "positive": "@integer(5, 100)",
            "negative": "@integer(0, 20)"
        }]
    }))
})


// 课程标签
router.get('/tag', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        tagName
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult({
        "tagName": tagName,
        "positive": "@integer(5, 100)",
        "negative": "@integer(0, 20)"
    }))
})


// 添加标签
router.post('/tag', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    let {
        lessonId,
        tagName,
        isPositive
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult(null))
})

module.exports = router;