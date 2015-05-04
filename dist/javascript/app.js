define(['exports', 'javascript/config'], function (exports, _javascriptConfig) {
    'use strict';

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

    var _config = _interopRequire(_javascriptConfig);

    var spending = new Firebase(_config.url),
        today = moment().format('YYYY-MM-DD'),
        totalDay = 0,
        months = [];

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

    $('document').ready(function () {
        $('#daily').mCustomScrollbar();
    });

    var addDailySpent = function addDailySpent(spent) {
        var daily = $('#daily').find('ul'),
            li = '<li>';

        li = li + '<span class="label">Date:</span><span class="value">' + spent.date + '</span>';
        li = li + '<span class="label">Item:</span><span class="value">' + spent.item + '</span>';
        li = li + '<span class="label">Value:</span><span class="value"> $' + parseFloat(spent.value).toFixed(2) + '</span>';
        li = li + '</li>';

        daily.append(li);
    };

    var sumTotal = function sumTotal(value) {
        totalDay = totalDay + parseFloat(value);
        $('.total').find('span').text('$' + totalDay.toFixed(2));
    };

    var addValueToMonth = function addValueToMonth(spent) {
        var year = new Date(spent.date).getFullYear(),
            numbMonth = new Date(spent.date).getMonth() + 1,
            month = months.filter(function (_month) {
            return _month.year === year && _month.month === numbMonth;
        });

        if (month.length > 0) {
            month[0].value = month[0].value + parseFloat(spent.value);
        } else {
            month = {
                year: year,
                month: numbMonth,
                value: parseFloat(spent.value)
            };

            months.push(month);
        }
    };

    spending.orderByChild('date').equalTo(today).on('child_added', function (snapshot) {
        var spent = snapshot.val();

        addDailySpent(spent);
        sumTotal(spent.value);
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });

    spending.orderByChild('date').on('child_added', function (snapshot) {
        var spent = snapshot.val();

        addValueToMonth(spent);
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
});
//# sourceMappingURL=app.js.map