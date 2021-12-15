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
    let isQuery = filter === "query" && (keys !== undefined || keys !== '')
    if (isQuery) {
        let keyList = keys.split('/')
        random.extend({
            key: function () {
                return this.pick(keyList)
            }
        })
    }

    let total = (pageNum + 2) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 3,
        "total": total,
        ["list|" + pageSize]: [{
            "id|+1": 29,
            "lessonNumber": "@string('upper', 4)@string('number', 8)",
            "lessonName": "《" + isQuery ? "@key" : "@ctitle" + "》",
            "teacherName": isQuery ? "@key" : "@cname",
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
    if (id === undefined || id <= 0)
        res.json(renderResult(null, 500, '课程id不能为空'))
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
    if (lessonId === undefined || lessonId <= 0)
        res.json(renderResult(null, 500, '课程id不能为空'))
    let total = (pageNum) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 1,
        "total": total,
        ["list|" + pageSize]: [{
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
    if (tagName === undefined || tagName === '')
        res.json(renderResult(null, 500, '标签名不能为空'))
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
        isPositive = true
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (lessonId === undefined || lessonId <= 0)
        res.json(renderResult(null, 500, '课程id不能为空'))
    if (tagName === undefined || tagName === '')
        res.json(renderResult(null, 500, '标签名不能为空'))
    res.json(renderResult(null))
})


//新增收藏
router.post('/favorite', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '')
        res.json(renderResult(null, 500, '请选择收藏商品id'))
    res.json(renderResult({}))
})

//取消收藏
router.delete('/favorite', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '')
        res.json(renderResult(null, 500, '请选择收藏课程id'))
    res.json(renderResult({}))
})

//我的收藏
router.get('/favorite', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        pageNum = 3,
        pageSize = 8,
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum + 1) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 2,
        "total": total,
        ["list|" + pageSize]: [{
            "id": '@integer(2, 1000000)',
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
module.exports = router;