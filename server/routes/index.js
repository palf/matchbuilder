exports.index = function (request, response) {
    'use strict';
    var data = { title: 'Match Builder' };
    response.render('index', data);
};
