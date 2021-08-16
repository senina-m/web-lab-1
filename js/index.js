submitData = function (event) {
    event.preventDefault();
    const form = document.getElementsByClassName('form');
    console.log('form: ' + form)
    // todo: validate data from server (?)
    console.log('Start processing form')
    sendData(validateForm(), "http://localhost:63342/web-lab-1/php/main.php").then(pointsArray => { //todo: rename method sendData
        drawPlot(pointsArray);
        drawTable(pointsArray);
    }).catch(err => printError(err));
    //todo: here could be an exception that data wasn't sent properly
}