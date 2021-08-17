submitData = function (event) {
    event.preventDefault();
    const form = document.getElementsByClassName('form');
    console.log('form: ' + form)
    // todo: validate data from server (?)
    console.log('Start processing form')
    let coordinates = validateForm();
    if (coordinates != null){
        sendData(coordinates, "http://localhost:63342/web-lab-1/php/main.php").then(pointsArray => { //todo: rename method sendData
            drawPlot(pointsArray);
            drawTable(pointsArray);
            // }).catch(err => printError(err, 'net connection error', err, document.getElementById('submitButton')));
        }).catch(err => console.log(err));
    }else{
        console.log('data validation error');
        // printError(err, 'data validation error', err, document.getElementById('submitButton'));
    }
    //todo: here could be an exception that data wasn't sent properly
}