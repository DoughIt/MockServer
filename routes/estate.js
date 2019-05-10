const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const random = Mock.Random;
const districts = ['静安区', '虹口区', '宝山区', '闸北区', '闵行区', '嘉定区', '浦东新区', '青浦区', '杨浦区', '松江区', '金山区', '奉贤区', '普陀区', '黄浦区', '崇明区', '徐汇区', '长宁区'];
const roads = ['蔡伦路', '博华路', '龙阳路', '芳华路', '高科路', '花木路', '陈春路', '张衡路', '海科路', '金科路', '高科中路', '碧波路', '中科路', '学林路', '康桥路'];
const communities = ['张江高科技园区'];
const buildings = ['高科苑四号楼'];
const newImages = ['photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/53350/seoul-skyscraper-building-architecture-53350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'photos/1534411/pexels-photo-1534411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/210683/pexels-photo-210683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
];
const otherImages = ['photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/259957/pexels-photo-259957.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/2098443/pexels-photo-2098443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];
random.extend({
    district: function () {
        return this.pick(districts);
    },
    road: function () {
        return this.pick(roads);
    },
    community: function () {
        return this.pick(communities);
    },
    building: function () {
        return this.pick(buildings);
    },
    newImage: function () {
        return this.pick(newImages);
    },
    otherImage: function () {
        return this.pick(otherImages);
    }
});
const getNewEstateInfo = function (id) {
    return Mock.mock({
        'errorCode': 0,
        'data': {
            'id': id,
            'category': '新房',
            'location': {
                'country': '中国',
                'city': '@city',
                'district': '@district',
                'road': '@road',
                'community': '@community',
                'building': '@building',
                'floor': '@int(0, 50)',
                'room': '@character@int(100, 110)'
            },
            'provider': {
                'id': '@id',
                'permission': '@int(0,1)',
                'name': '@cname',
                'company': '多多房产',
                'icon': '@image'
            },
            'cover': {
                'url': '@newImage'
            },
            'tagList|6': [{
                'id': '@id',
                'name': '@ctitle(2, 5)'
            }],
            'imgList|6': [{
                'url': '@newImage'
            }],
            'alias': '@building',
            'state': '在售',
            'start': '@date',
            'price': '@float(5000, 12000)',
            'floor': '@int(3, 50)',
            'floorList': '1,2,3,4',
            'houseType|5': [{
                'id': '@id',
                'area': '@float(60, 200)',
                'price': '@float(800, 2500)',
                'roomNumber': '@int(1, 10)',
                'hallNumber': '@int(0, 3)',
                'toiletNumber': '@int(0, 5)',
                'detail': '@paragraph(1, 4)'
            }]
        }
    });
};

const getSecondEstateInfo = function (id) {
    return Mock.mock({
        'errorCode': 0,
        'data': {
            'id': id,
            'category': '二手房',
            'location': {
                'country': '中国',
                'city': '@city',
                'district': '@district',
                'road': '@road',
                'community': '@community',
                'building': '@building',
                'floor': '@int(0, 50)',
                'room': '@character@int(100, 110)'
            },
            'provider': {
                'id': '@id',
                'permission': '@int(0,1)',
                'name': '@cname',
                'company': '多多房产',
                'icon': '@image'
            },
            'cover': {
                'url': '@otherImage'
            },
            'tagList|6': [{
                'id': '@id',
                'name': '@ctitle(2, 5)'
            }],
            'imgList|6': [{
                'url': '@otherImage'
            }],
            'houseType': {
                'id': '@id',
                'area': '@float(60, 200)',
                'price': '@float(800, 2500)',
                'roomNumber': '@int(1, 10)',
                'hallNumber': '@int(0, 3)',
                'toiletNumber': '@int(0, 5)',
                'detail': '@paragraph(1, 4)'
            }
        }
    });
}

const getRentEstateInfo = function (id) {
    return Mock.mock({
        'errorCode': 0,
        'data': {
            'id': id,
            'category': '租房',
            'location': {
                'country': '中国',
                'city': '@city',
                'district': '@district',
                'road': '@road',
                'community': '@community',
                'building': '@building',
                'floor': '@int(0, 50)',
                'room': '@character@int(100, 110)'
            },
            'provider': {
                'id': '@id',
                'permission': '@int(0,1)',
                'name': '@cname',
                'company': '多多房产',
                'icon': '@image'
            },
            'cover': {
                'url': '@otherImage'
            },
            'tagList|6': [{
                'id': '@id',
                'name': '@ctitle(2, 5)'
            }],
            'imgList|6': [{
                'url': '@otherImage'
            }],
            'houseType': {
                'id': '@id',
                'area': '@float(60, 200)',
                'price': '@float(800, 2500)',
                'roomNumber': '@int(1, 10)',
                'hallNumber': '@int(0, 3)',
                'toiletNumber': '@int(0, 5)',
                'detail': '@paragraph(1, 4)'
            }
        }
    });
}

const getNewRecommend = function () {
    return Mock.mock({
        'errorCode': 0,
        'count': 10,
        'nextPageUrl': 'http://duo.darkyoung.cn:8888/api/estate/new?recommend=true&step=10',
        'itemList|10': [{
            'type': '房源',
            'data': {
                'id': '@id',
                'category': '新房',
                'location': {
                    'country': '中国',
                    'city': '@city',
                    'district': '@district',
                    'road': '@road',
                    'community': '@community',
                    'building': '@building',
                    'floor': '@int(0, 50)',
                    'room': '@character@int(100, 110)'
                },
                'provider': {
                    'id': '@id',
                    'permission': '@int(0,1)',
                    'name': '@cname',
                    'company': '多多房产',
                    'icon': '@image'
                },
                'cover': {
                    'url': '@newImage'
                },
                'tagList|6': [{
                    'id': '@id',
                    'name': '@ctitle(2, 5)'
                }],
                'imgList|6': [{
                    'url': '@newImage'
                }],
                'alias': '@building',
                'state': '在售',
                'start': '@date',
                'price': '@float(5000, 12000)',
                'floor': '@int(3, 50)',
                'floorList': '1,2,3,4',
                'houseType|2-8': [{
                    'id': '@id',
                    'area': '@float(60, 200)',
                    'price': '@float(800, 2500)',
                    'roomNumber': '@int(1, 10)',
                    'hallNumber': '@int(0, 3)',
                    'toiletNumber': '@int(0, 5)',
                    'detail': '@paragraph(1, 4)'
                }]
            }
        }]
    });
}
const getSecondRecommend = function () {
    return Mock.mock({
        'errorCode': 0,
        'count': 10,
        'nextPageUrl': 'http://duo.darkyoung.cn:8888/api/estate/second?recommend=true&step=10',
        'itemList|10': [{
            'type': '房源',
            'data': {
                'id': '@id',
                'category': '二手房',
                'location': {
                    'country': '中国',
                    'city': '@city',
                    'district': '@district',
                    'road': '@road',
                    'community': '@community',
                    'building': '@building',
                    'floor': '@int(0, 50)',
                    'room': '@character@int(100, 110)'
                },
                'provider': {
                    'id': '@id',
                    'permission': '@int(0,1)',
                    'name': '@cname',
                    'company': '多多房产',
                    'icon': '@image'
                },
                'cover': {
                    'url': '@otherImage'
                },
                'tagList|6': [{
                    'id': '@id',
                    'name': '@ctitle(2, 5)'
                }],
                'imgList|6': [{
                    'url': '@otherImage'
                }],
                'houseType': {
                    'id': '@id',
                    'area': '@float(60, 200)',
                    'price': '@float(800, 2500)',
                    'roomNumber': '@int(1, 10)',
                    'hallNumber': '@int(0, 3)',
                    'toiletNumber': '@int(0, 5)',
                    'detail': '@paragraph(1, 4)'
                }
            }
        }]
    });
}
const getRentRecommend = function () {
    return Mock.mock({
        'errorCode': 0,
        'count': 10,
        'nextPageUrl': 'http://duo.darkyoung.cn:8888/api/estate/rent?recommend=true&step=10',
        'itemList|10': [{
            'type': '房源',
            'data': {
                'id': '@id',
                'category': '租房',
                'location': {
                    'country': '中国',
                    'city': '@city',
                    'district': '@district',
                    'road': '@road',
                    'community': '@community',
                    'building': '@building',
                    'floor': '@int(0, 50)',
                    'room': '@character@int(100, 110)'
                },
                'provider': {
                    'id': '@id',
                    'permission': '@int(0,1)',
                    'name': '@cname',
                    'company': '多多房产',
                    'icon': '@image'
                },
                'cover': {
                    'url': '@otherImage'
                },
                'tagList|6': [{
                    'id': '@id',
                    'name': '@ctitle(2, 5)'
                }],
                'imgList|6': [{
                    'url': '@otherImage'
                }],
                'houseType': {
                    'id': '@id',
                    'area': '@float(60, 200)',
                    'price': '@float(800, 2500)',
                    'roomNumber': '@int(1, 10)',
                    'hallNumber': '@int(0, 3)',
                    'toiletNumber': '@int(0, 5)',
                    'detail': '@paragraph(1, 4)'
                }
            }
        }]
    });
}
/* 获取新房详细信息，':'代表通配符 */
router.get('/new/:id', function (req, res, next) {
    const {
        id
    } = req.params;
    res.json(getNewEstateInfo(id));
});

router.get('/second/:id', function (req, res, next) {
    const {
        id
    } = req.params;
    res.json(getSecondEstateInfo(id));
});
router.get('/rent/:id', function (req, res, next) {
    const {
        id
    } = req.params;
    res.json(getRentEstateInfo(id));
});
router.get('/new', function (req, res, next) {
    res.json(getNewRecommend());
});
router.get('/second', function (req, res, next) {
    res.json(getSecondRecommend());
});
router.get('/rent', function (req, res, next) {
    res.json(getRentRecommend());
});
module.exports = router;