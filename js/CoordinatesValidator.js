class CoordinatesValidator {
    validateForm() {
        let coordinates = this.getValues();
        this.removeErrors();
        if(!this.checkValues(coordinates)){
            throw new Error("Entered coordinates are incorrect!"); //todo: create my oun exception
        }
        return coordinates;

    }

    printError(errorName, errorClass, errorMessage, element) {
        console.log(errorName, element);
        const error = document.createElement('div');
        error.className = errorClass;
        error.innerHTML = errorMessage;
        element.parentElement.insertBefore(error, element);
    }

    checkValues(coordinates) {
        let anyErrors = 0;

        for (let field in coordinates) {
            if (!field.value) {
                this.printError('field is blank', 'blankField error', 'Cannot be blank', field);
                anyErrors++;
            }
        }

        if (coordinates.y.value > 3 || coordinates.y.value < -5 || isNaN(Number(coordinates.y.value))) {
            this.printError('y is out of range', 'y error', 'Has to be number from -5 to 3', coordinates.y);
            anyErrors++;
        }
        if (coordinates.r.value > 5 || coordinates.r.value < 2 || isNaN(Number(coordinates.r.value))) {
            this.printError('r is out of range', 'r error', 'Has to be number from 2 to 5', coordinates.r);
            anyErrors++;
        }
        return anyErrors === 0;
    }

    getValues() {
        console.log('clicked on validate');
        let x = document.getElementById('x');
        let y = document.getElementById('y');
        let r = document.getElementById('r');
        console.log('x: ', x.value);
        console.log('y: ', y.value);
        console.log('r: ', r.value);
        return {x, y, r};
    }

    removeErrors() {
        const errors = document.querySelectorAll('.error'); //todo: search in form only
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    }
}