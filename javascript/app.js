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

spending.on("value", (snapshot) => {
    let spending = snapshot.val().spending;
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});