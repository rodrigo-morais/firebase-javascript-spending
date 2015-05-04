import config from 'javascript/config';

let spending = new Firebase(config.url),
    today = moment().format('YYYY-MM-DD'),
    totalDay = 0;

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

spending.orderByChild("date").equalTo(today).on("child_added", (snapshot) => {
    let spent = snapshot.val();
    let daily = $('#daily');

    let li = '<li>';
    li = li + '<span class="label">Date:</span><span class="value">' + spent.date + '</span>';
    li = li + '<span class="label">Item:</span><span class="value">' + spent.item + '</span>';
    li = li + '<span class="label">Value:</span><span class="value"> $' + Math.round(parseFloat(spent.value)).toFixed(2) + '</span>';
    li = li + '</li>';

    daily.append(li);

    totalDay = totalDay + parseFloat(spent.value);
    $('.total').find('span').text('$' + Math.round(totalDay).toFixed(2));
    
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});