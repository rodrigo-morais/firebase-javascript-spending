import config from 'javascript/config';

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

let addValueToMonth = (spent) => {
    let year = new Date(spent.date).getFullYear(),
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
            value: parseFloat(spent.value)
        };

        months.push(month);
    }

};

spending.orderByChild("date").equalTo(today).on("child_added", (snapshot) => {
    let spent = snapshot.val();

    addDailySpent(spent);
    sumTotal(spent.value);
    
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});

spending.orderByChild("date").on("child_added", (snapshot) => {
    let spent = snapshot.val();

    addValueToMonth(spent);
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});