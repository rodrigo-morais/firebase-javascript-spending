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

spending.orderByChild("date").equalTo(today).on("child_added", (snapshot) => {
    let spent = snapshot.val();

    addDailySpent(spent);
    sumTotal(spent.value);
    
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});