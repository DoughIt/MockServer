const express = require('express');
const multiparty = require('multiparty')
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
random.extend({
    newDegree: function () {
        return this.pick(['全新', '半新'])
    },
    paperSize: function () {
        return this.pick(['A4', 'A5', 'A3', 'B4'])
    },
    unit: function () {
        return this.pick(['$', '¥'])
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
router.get('/ppts', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        pageNum = 3,
        pageSize = 8
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
            'id|+1': '@integer(2, 1000000)',
            'pictures|2-5': [{
                'url': '@image(1024x768, \'#FF6600\')'
            }],
            'chapters': '@integer(1, 20)',
            'paperSize': '@paperSize',
            'singlePrint': '@boolean',
            'newDegree': '@newDegree',
            'price': '@integer(0, 100)',
            'unit': '@unit',
            'content': '@csentence(2, 4)',
            'seller': {
                'id': '@integer(2, 100000)',
                "username": "@cname",
                "avatar": "@image(80x80, '#FF6600')",
            },
            'lesson': {
                'id': '@integer(2, 1000)',
                'lessonName': '@ctitle'
            }
        }]
    }))
})
//ppt
router.get('/ppts/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult({
        'id': id,
        'pictures|2-5': [{
            'url': '@image(1024x768, \'#FF6600\')'
        }],
        'chapters': '@integer(1, 20)',
        'paperSize': '@paperSize',
        'singlePrint': '@boolean',
        'newDegree': '@newDegree',
        'price': '@integer(0, 100)',
        'unit': '@unit',
        'content': '@csentence(2, 4)',
        'seller': {
            'id': '@integer(2, 100000)',
            "username": "@cname",
            "avatar": "@image(80x80, '#FF6600')",
        },
        'lesson': {
            'id': '@integer(2, 1000)',
            'lessonName': '@ctitle'
        }
    }))
})

//ppt
router.put('/ppts/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    const {
        picture,
        chapters,
        paperSize,
        singlePrint,
        newDegree,
        price,
        unit,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '') {
        res.json(renderResult(null, 500, '验证失败，请先选择ppt'))
    }
    if (picture === undefined && chapters === undefined &&
        paperSize === undefined && singlePrint === undefined &&
        newDegree === undefined && price === undefined &&
        unit === undefined && content === undefined) {
        res.json(renderResult(null, 500, '请指定picture或chapters或paperSize或singlePrint或newDegree或price或unit或content的值'))
    }
    res.json(renderResult(null))
})

//ppt
router.post('/ppts', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        lessonId,
        picture,
        chapters,
        paperSize,
        singlePrint,
        newDegree,
        price,
        unit,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (lessonId === undefined || picture === undefined || chapters === undefined ||
        paperSize === undefined || singlePrint === undefined ||
        newDegree === undefined || price === undefined ||
        unit === undefined || content === undefined) {
        res.json(renderResult(null, 500, '请指定lessonId、picture、chapters、paperSize、singlePrint、newDegree、price、unit、content的值'))
    }
    res.json(renderResult(null))
})


//ppt
router.delete('/ppts/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '') {
        res.json(renderResult(null, 500, '验证失败，请先选择ppt'))
    }
    res.json(renderResult(null))
})


//book
router.get('/books', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        pageNum = 3,
        pageSize = 8
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum + 1) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 2,
        "total": total,
        "list|8": [{
            'id|+1': '@integer(2, 1000000)',
            'pictures|2-5': [{
                'url': '@image(1024x768, \'#FF6600\')'
            }],
            'bookName': '《 @ctitle 》',
            'author': '@cname',
            'publisher': '@ctitle',
            'newDegree': '@newDegree',
            'price': '@integer(0, 100)',
            'unit': '@unit',
            'content': '@csentence(2, 4)',
            'seller': {
                'id': '@integer(2, 100000)',
                "username": "@cname",
                "avatar": "@image(80x80, '#FF6600')",
            },
            'lesson': {
                'id': '@integer(2, 1000)',
                'lessonName': '@ctitle'
            }
        }]
    }))

})

//book
router.get('/books/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    res.json(renderResult({
        'id': id,
        'pictures|2-5': [{
            'url': '@image(1024x768, \'#FF6600\')'
        }],
        'bookName': '《 @ctitle 》',
        'author': '@cname',
        'publisher': '@ctitle',
        'newDegree': '@newDegree',
        'price': '@integer(0, 100)',
        'unit': '@unit',
        'content': '@csentence(2, 4)',
        'seller': {
            'id': '@integer(2, 100000)',
            "username": "@cname",
            "avatar": "@image(80x80, '#FF6600')",
        },
        'lesson': {
            'id': '@integer(2, 1000)',
            'lessonName': '@ctitle'
        }
    }))
})


//book
router.put('/books/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    const {
        picture,
        bookName,
        author,
        publisher,
        newDegree,
        price,
        unit,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '') {
        res.json(renderResult(null, 500, '验证失败，请先选择book'))
    }
    if (picture === undefined && bookName === undefined &&
        author === undefined && publisher === undefined &&
        newDegree === undefined && price === undefined &&
        unit === undefined && content === undefined) {
        res.json(renderResult(null, 500, '请指定picture或bookName或author或publisher或newDegree或price或unit或content的值'))
    }
    res.json(renderResult(null))
})

//book
router.post('/books', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        lessonId,
        picture,
        author,
        publisher,
        bookName,
        newDegree,
        price,
        unit,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (lessonId === undefined || picture === undefined || bookName === undefined ||
        author === undefined || publisher === undefined ||
        newDegree === undefined || price === undefined ||
        unit === undefined || content === undefined) {
        res.json(renderResult(null, 500, '请指定lessonId、picture、bookName、author、publisher、newDegree、price、unit、content的值'))
    }
    res.json(renderResult(null))
})


//book
router.delete('/books/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '') {
        res.json(renderResult(null, 500, '验证失败，请先选择book'))
    }
    res.json(renderResult(null))
})


//note
router.get('/notes', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        pageNum = 3,
        pageSize = 8
    } = req.query
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    let total = (pageNum + 1) * pageSize + Mock.mock('@integer(1, 5)')
    res.json(renderResult({
        "pageNum": pageNum,
        "pageSize": pageSize,
        "totalPage": pageNum + 2,
        "total": total,
        "list|8": [{
            'id|+1': '@integer(2, 1000000)',
            'pictures|2-5': [{
                'url': '@image(1024x768, \'#FF6600\')'
            }],
            'coverPercentage': '@integer(0, 100) %',
            'price': '@integer(0, 100)',
            'unit': '@unit',
            'content': '@csentence(2, 4)',
            'seller': {
                'id': '@integer(2, 100000)',
                "username": "@cname",
                "avatar": "@image(80x80, '#FF6600')",
            },
            'lesson': {
                'id': '@integer(2, 1000)',
                'lessonName': '@ctitle'
            }
        }]
    }))
})

//note
router.get('/notes/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))

    res.json(renderResult({
        'id': id,
        'pictures|2-5': [{
            'url': '@image(1024x768, \'#FF6600\')'
        }],
        'coverPercentage': '@integer(0, 100) %',
        'price': '@integer(0, 100)',
        'unit': '@unit',
        'content': '@csentence(2, 4)',
        'seller': {
            'id': '@integer(2, 100000)',
            "username": "@cname",
            "avatar": "@image(80x80, '#FF6600')",
        },
        'lesson': {
            'id': '@integer(2, 1000)',
            'lessonName': '@ctitle'
        }
    }))
})

//note
router.put('/notes/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    const {
        picture,
        coverPercentage,
        price,
        unit,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '') {
        res.json(renderResult(null, 500, '验证失败，请先选择笔记'))
    }
    if (picture === undefined && coverPercentage === undefined && price === undefined && unit === undefined && content === undefined) {
        res.json(renderResult(null, 500, '请指定picture或coverPercentage或price或unit或content的值'))
    }
    res.json(renderResult(null))
})

//note
router.post('/notes', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        lessonId,
        picture,
        coverPercentage,
        price,
        unit,
        content
    } = req.body
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (lessonId === undefined || picture === undefined || coverPercentage === undefined || price === undefined || unit === undefined || content === undefined) {
        res.json(renderResult(null, 500, '请指定lessonId、picture、coverPercentage、price、unit、content的值'))
    }
    res.json(renderResult(null))
})


//note
router.delete('/notes/:id', (req, res, next) => {
    const {
        authorization
    } = req.headers;
    const {
        id
    } = req.params;
    if (authorization === undefined || authorization === '')
        res.json(renderResult(null, 500, '验证失败，token已过期'))
    if (id === undefined || id === '') {
        res.json(renderResult(null, 500, '验证失败，请先选择笔记'))
    }
    res.json(renderResult(null))
})

module.exports = router;