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
    }
});

const renderResult = (data, code = 200, message = '操作成功') => {
    return Mock.mock({
        'code': code,
        'message': message,
        'data': data
    })
}

// 消息列表
router.get('/msgList', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        pageNum = 3,
        pageSize = 8,
        userId
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum + 1) * pageSize + Mock.mock('@integer(1, 5)')
    if (userId === undefined)
        res.json(renderResult({
            "pageNum": pageNum,
            "pageSize": pageSize,
            "totalPage": pageNum + 2,
            "total": total,
            ["list|" + pageSize]: [{
                "sender": {
                    "id|+3": 36,
                    "avatar": "@image(80x80, @color)",
                    "username": "@cname"
                },
                "last_message": {
                    "id": "@integer(2, 100000)",
                    "senderId|+3": 36,
                    "receiverId": 1,
                    "content": "@cparagraph(2, 5)",
                    "issueTime": "@datetime",
                    "read": "@boolean"
                }
            }]
        }))
    else {
        res.json(renderResult({
            "pageNum": pageNum,
            "pageSize": pageSize,
            "totalPage": pageNum + 2,
            "total": total,
            ["list|" + pageSize]: [{
                "id": "@integer(2, 100000)",
                "senderId": userId,
                "receiverId": 3,
                "content": "@cparagraph(2, 5)",
                "issueTime": "@datetime",
                "read": "@boolean"
            }]
        }))
    }
})


// 发送消息
router.post('/msg', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        receiverId,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (receiverId === undefined) {
        res.json(renderResult(null, 500, "操作失败，请指定接受者"));
    }
    if (content === undefined) {
        res.json(renderResult(null, 500, "操作失败，内容不能为空"));
    }
    res.json(renderResult(null))
})


module.exports = router;