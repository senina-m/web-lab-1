submitData = function (){

    const form = document.querySelector('.formWithValidation');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        try {
            alert("i'm here!");
            let pointsArray = sendData(validateForm()); //todo: rename method sendData
            //todo: validate data from server (?)
            drawTable(pointsArray);
            drawPlot(pointsArray);
        } catch (err) {
            //todo: here could be an exception that data wasn't sent properly
        }
    })
}