exports.index = function (request, response) {
    'use strict';
    var data = { title: 'Match Three' };
    response.render('index', data);
};
