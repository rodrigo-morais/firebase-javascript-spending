define(['exports', 'javascript/config'], function (exports, _javascriptConfig) {
    'use strict';

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

    var _config = _interopRequire(_javascriptConfig);

    var spending = new Firebase(_config.url),
        today = moment().format('YYYY-MM-DD'),
        totalDay = 0;

    $('#send').on('click', function (event) {
        event.preventDefault();

        var form = $('#spending');

        spending.push({
            date: form.find('#dateSpending').val(),
            item: form.find('#item').val(),
            value: form.find('#value').val()
        });

        form[0].reset();
    });

    spending.orderByChild('date').equalTo(today).on('child_added', function (snapshot) {
        var spent = snapshot.val();
        var daily = $('#daily');

        var li = '<li>';
        li = li + '<span class="label">Date:</span><span class="value">' + spent.date + '</span>';
        li = li + '<span class="label">Item:</span><span class="value">' + spent.item + '</span>';
        li = li + '<span class="label">Value:</span><span class="value"> $' + parseFloat(spent.value).toFixed(2) + '</span>';
        li = li + '</li>';

        daily.append(li);

        totalDay = totalDay + parseFloat(spent.value);
        $('.total').find('span').text('$' + totalDay.toFixed(2));
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
});
//# sourceMappingURL=app.js.map