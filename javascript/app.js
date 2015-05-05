﻿import config from 'javascript/config';

let spending = new Firebase(config.url),
    today = moment().format('YYYY-MM-DD'),
    totalDay = 0,
    months = [];

$('#send').on('click',(event) => {
    event.preventDefault();

    let form = $('#spending');

    spending.push({
        date: form.find('#dateSpending').val(),
        item: form.find('#item').val(),
        value: form.find('#value').val()
    });

    form[0].reset();
});

$('document').ready(() => {
    $("#daily").mCustomScrollbar();
});

let addDailySpent = (spent) => {
    let daily = $('#daily').find('ul'),
        li = '<li>';

    li = li + '<span class="label">Date:</span><span class="value">' + spent.date + '</span>';
    li = li + '<span class="label">Item:</span><span class="value">' + spent.item + '</span>';
    li = li + '<span class="label">Value:</span><span class="value"> $' + parseFloat(spent.value).toFixed(2) + '</span>';
    li = li + '</li>';

    daily.append(li);
};

let sumTotal = (value) => {
    totalDay = totalDay + parseFloat(value);
    $('.total').find('span').text('$' + totalDay.toFixed(2));
};

let addValueToMonth = (spendings) => {
    for(let key in spendings){
        let spent = spendings[key],
            year = new Date(spent.date).getFullYear(),
            numbMonth = new Date(spent.date).getMonth() + 1,
            month = months.filter((_month) => {
                return _month.year === year && _month.month === numbMonth;
            });

        if(month.length > 0){
            month[0].value = month[0].value + parseFloat(spent.value);
        }
        else{
            month = {
                year: year,
                month: numbMonth,
                monthName: moment(new Date(spent.date)).format('MMMM'),
                value: parseFloat(spent.value)
            };

            months.push(month);
        }
    }
};

let showMonths = () => {
    let total = 0,
        numMonths = months.length,
        average = 0;

    months.forEach(function(_month){
        let monthsUl = $('.months'),
            li = '<li>';

        li = li + '<span class="label">Month:</span><span class="value">' + _month.monthName + ' / ' + _month.year + '</span>';
        li = li + '<span class="label">Total:</span><span class="value"> $' + _month.value + '</span>';
        li = li + '<span class="label">Average:</span><span class="value"> $' + _month.value + '</span>';
        li = li + '</li>';

        monthsUl.append(li);

        total = total + _month.value;
    });

    average = total / numMonths;

    $('.per-month').find('.total').find('#total').text(total.toFixed(2));
    $('.per-month').find('.total').find('#average').text(average.toFixed(2));
}

spending.orderByChild("date").equalTo(today).on("child_added", (snapshot) => {
    let spent = snapshot.val();

    addDailySpent(spent);
    sumTotal(spent.value);
    
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});

spending.orderByChild("date").on("value", (snapshot) => {
    let spendings = snapshot.val();

    addValueToMonth(spendings);
    showMonths();
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});