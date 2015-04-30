import config from 'javascript/config';

let spending = new Firebase(config.url);

$('#send').on('click',() => {
    let spent = spending.child('spent');
    let form = $('#spending');

    pent.push({
        date: form.find('#dateSpending').val(),
        item: form.find('#item').val(),
        value: form.find('#value').val()
    });

    form.reset();
});

spending.on("value", (snapshot) => {
    let spending = snapshot.val().spent;
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});