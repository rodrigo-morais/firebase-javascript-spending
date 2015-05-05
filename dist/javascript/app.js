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
                monthName: moment(new Date(spent.date)).format('MMMM'),
                value: parseFloat(spent.value)
            };

            months.push(month);
        }
    };

    var showMonths = function showMonths() {
        var total = 0,
            numMonths = months.length,
            average = 0;

        months.forEach(function (_month) {
            total = total + _month.value;
        });

        average = total / numMonths;

        $('.per-month').find('.total').find('#total').text(total.toFixed(2));
        $('.per-month').find('.total').find('#average').text(average.toFixed(2));
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
        showMonths();
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
});
//# sourceMappingURL=app.js.map