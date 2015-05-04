import config from 'javascript/config';

let spending = new Firebase(config.url),
    today = moment().format('YYYY-MM-DD');

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

    /*for (var spent in spending) {*/
        let li = '<li>';
        li = li + '<span class="label">Date:</span><span class="value">' + spent.date + '</span>';
        li = li + '<span class="label">Item:</span><span class="value">' + spent.item + '</span>';
        li = li + '<span class="label">Value:</span><span class="value">' + spent.value + '</span>';
        li = li + '</li>';

        daily.append(li);
    /*}*/
    
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});