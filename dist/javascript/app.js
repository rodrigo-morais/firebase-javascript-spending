define(['exports', 'javascript/config'], function (exports, _javascriptConfig) {
    'use strict';

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

    var _config = _interopRequire(_javascriptConfig);

    var spending = new Firebase(_config.url);

    $('#send').on('click', function (event) {
        event.preventDefault();

        var spent = spending.child('spending');
        var form = $('#spending');

        spent.push({
            date: form.find('#dateSpending').val(),
            item: form.find('#item').val(),
            value: form.find('#value').val()
        });

        form[0].reset();
    });

    spending.on('value', function (snapshot) {
        var spending = snapshot.val().spending;
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
});
//# sourceMappingURL=app.js.map