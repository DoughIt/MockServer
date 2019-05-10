const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
const adImages = ['photos/1449081/pexels-photo-1449081.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'photos/1166430/pexels-photo-1166430.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',

];

const categories = ['HOME', 'DISCOVER'];

random.extend({
    adImage: function () {
        return this.pick(adImages);
    },
    category: function () {
        return this.pick(categories);
    }
});
const getHome = function () {
    return Mock.mock({
        'errorCode': 0,
        'count': 6,
        'nextPageUrl': 'http://duo.darkyoung.cn:8888/api/ad/home?step=6',
        'itemList|6': [{
            'type': '广告',
            'data': {
                'id': '@id',
                'category': 'HOME',
                'title': '@ctitle(5, 12)',
                'detail': '@paragraph(2, 5)',
                'provider': {
                    'id': '@id',
                    'name': '多多房产',
                    'phoneNumber': '',
                    'desc': '@paragraph(1, 3)',
                    'relativeLink': '@url("http")'
                },
                'issueDate': '@date',
                'cover': {
                    'url': '@adImage'
                },
                'tagList|1-6': [{
                    'id': '@id',
                    'name': '@ctitle(2, 5)'
                }],
                'imgList|2-5': [{
                    'url': '@adImage'
                }]
            }
        }]
    });
};

const getDiscover = function () {
    return Mock.mock({
        'errorCode': 0,
        'count': 10,
        'nextPageUrl': 'http://duo.darkyoung.cn:8888/api/ad/discover?step=10&page=@int(1, 10)',
        'itemList|10': [{
            'type': '广告',
            'data': {
                'id': '@id',
                'category': 'DISCOVER',
                'title': '@ctitle(5, 12)',
                'detail': '@paragraph(2, 5)',
                'provider': {
                    'id': '@id',
                    'name': '多多房产',
                    'phoneNumber': '',
                    'desc': '@paragraph(1, 3)',
                    'relativeLink': '@url("http")'
                },
                'issueDate': '@date',
                'cover': {
                    'url': '@adImage'
                },
                'tagList|1-6': [{
                    'id': '@id',
                    'name': '@ctitle(2, 5)'
                }],
                'imgList|2-5': [{
                    'url': '@adImage'
                }]
            }
        }]
    });
};

const getAdInfo = function (id) {
    return Mock.mock({
        'errorCode': 0,
        'data': {
            'id': '@id',
            'category': '@category',
            'title': '@ctitle(5, 12)',
            'detail': '@paragraph(2, 5)',
            'provider': {
                'id': '@id',
                'name': '多多房产',
                'phoneNumber': '',
                'desc': '@paragraph(1, 3)',
                'relativeLink': '@url("http")'
            },
            'issueDate': '@date',
            'cover': {
                'url': '@adImage'
            },
            'tagList|1-6': [{
                'id': '@id',
                'name': '@ctitle(2, 5)'
            }],
            'imgList|2-5': [{
                'url': '@adImage'
            }]
        }
    });
};
router.get('/home', function (req, res, next) {
    res.json(getHome());
});

router.get('/discover', function (req, res, next) {
    res.json(getDiscover());
});

router.get('/:id', function (req, res, next) {
    const {
        id
    } = req.params;
    res.json(getAdInfo(id));
});

module.exports = router;