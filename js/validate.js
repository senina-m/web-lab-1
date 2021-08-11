submitData = function (){

    const form = document.querySelector('.formWithValidation');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        try {
            const validator = new CoordinatesValidator();
            const connector = new Connector();
            alert("i'm here!");
            let pointsArray = connector.sendData(validator.validateForm()); //todo: rename method sendData
            //todo: validate data from server (?)
            drawTable(pointsArray);
            const plot = new Plot();
            plot.draw(pointsArray);
        } catch (err) {
            //todo: here could be an exception that data wasn't sent properly
        }
    })
}