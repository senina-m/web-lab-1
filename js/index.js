submitData = function (event) {
    event.preventDefault();
    const form = document.getElementsByClassName('form');

    console.log('form: ' + form)
    try {
        console.log('Start processing form')
        try {
            let pointsArray = sendData(validateForm(), "http://localhost:63342/web-lab-1/php/main.php"); //todo: rename method sendData
        } catch (err) {
            printFormError(err)
        }
        // todo: validate data from server (?)
        drawTable(pointsArray);
        drawPlot(pointsArray);
    } catch (err) {
        //todo: here could be an exception that data wasn't sent properly
    }
}