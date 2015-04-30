import config from 'javascript/config';

let spending = new Firebase(config.url);

$('#send').on('click',(event) => {
    event.preventDefault();

    let spent = spending.child('spending');
    let form = $('#spending');

    spent.push({
        date: form.find('#dateSpending').val(),
        item: form.find('#item').val(),
        value: form.find('#value').val()
    });

    form[0].reset();
});

spending.on("child_added", (snapshot) => {
    let spending = snapshot.val();
    let daily = $('#daily');

    for (var spent in spending) {
        let li = '<li>';
        li = li + '<span class="label">Date:</span><span class="value">' + spending[spent].date + '</span>';
        li = li + '<span class="label">Item:</span><span class="value">' + spending[spent].item + '</span>';
        li = li + '<span class="label">Value:</span><span class="value">' + spending[spent].value + '</span>';
        li = li + '</li>';

        daily.append(li);
    }
    
},
(errorObject) => {
    console.log("The read failed: " + errorObject.code);
});