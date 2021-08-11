submitData = function (){

    const form = document.querySelector('.formWithValidation');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        try {
            let coordinates = validateForm();
            // form.submit();
            let pointsArray = sendData(coordinates); //todo: rename method sendData
            //todo: validate data from server (?)
            drawTable(pointsArray);
            drawPlot(pointsArray);
        } catch (err) {
            //todo: here could be an exception that data wasn't sent properly
        }
    })

    const validateForm = function () {
        let coordinates = getValues();
        removeErrors();
        if(!checkValues(coordinates)){
            throw new Error("Entered coordinates are incorrect!"); //todo: create my oun exception
        }
        return coordinates;

    }

    const printError = function (errorName, errorClass, errorMessage, element) {
        console.log(errorName, element);
        const error = document.createElement('div');
        error.className = errorClass;
        error.innerHTML = errorMessage;
        element.parentElement.insertBefore(error, element);
    }

    const checkValues = function (coordinates) {
        let anyErrors = 0;

        for (let field in coordinates) {
            if (!field.value) {
                printError('field is blank', 'blankField error', 'Cannot be blank', field);
                anyErrors++;
            }
        }

        if (coordinates.y.value > 3 || coordinates.y.value < -5 || isNaN(Number(coordinates.y.value))) {
            printError('y is out of range', 'y error', 'Has to be number from -5 to 3', coordinates.y);
            anyErrors++;
        }
        if (coordinates.r.value > 5 || coordinates.r.value < 2 || isNaN(Number(coordinates.r.value))) {
            printError('r is out of range', 'r error', 'Has to be number from 2 to 5', coordinates.r);
            anyErrors++;
        }
        return anyErrors === 0;
    }
    const getValues = function () {
        console.log('clicked on validate');
        let x = document.getElementById('x');
        let y = document.getElementById('y');
        let r = document.getElementById('r');
        console.log('x: ', x.value);
        console.log('y: ', y.value);
        console.log('r: ', r.value);
        return {x, y, r};
    }

    const removeErrors = function () {
        const errors = form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    }

    async function sendData(coordinates, url) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(coordinates)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Ошибка HTTP: " + response.status); //todo: create my oun exception
        }
    }
}