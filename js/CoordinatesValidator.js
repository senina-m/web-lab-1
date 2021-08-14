    validateForm = () => {
        console.log('Start validating')
        let coordinates = this.getValues();
        this.removeErrors();
        if(!this.checkValues(coordinates)){
            throw new Error("Entered coordinates are incorrect!"); //todo: create my oun exception
        }
        return coordinates;

    }

    printError = (errorLogName, errorClass, errorMessage, element) => {
        console.log(errorLogName);
        const error = document.createElement('div');
        error.className = errorClass;
        error.innerHTML = errorMessage;
        element.parentElement.insertBefore(error, element);
    }

    checkValues = (coordinates) => {
        let anyErrors = 0;

        if (printErrorIfBlank(coordinates.y, 'y') || printErrorIfBlank(coordinates.r, 'r')) {
            anyErrors++;
        }

        if (coordinates.y > 3 || coordinates.y < -5 || isNaN(Number(coordinates.y))) {
            this.printError('y is out of range', 'y error', 'Has to be number from -5 to 3', coordinates.y);
            anyErrors++;
        }
        if (coordinates.r > 5 || coordinates.r < 2 || isNaN(Number(coordinates.r))) {
            this.printError('r is out of range', 'r error', 'Has to be number from 2 to 5', coordinates.r);
            anyErrors++;
        }
        return anyErrors === 0;
    }

    printErrorIfBlank = (field, fieldName) =>{
        console.log('Field value:' + field)
        if (field === '') {
            this.printError(fieldName + ' field is blank', 'blankField error', 'Cannot be blank', field);
            return false;
        }
    }

    getValues = () => {
        console.log('Received values:');
        let x = document.getElementById('x');
        let y = document.getElementById('y');
        let r = document.getElementById('r');
        console.log('x: ', x.value);
        console.log('y: ', y.value);
        console.log('r: ', r.value);
        return {x:x.value, y:y.value, r:r.value};
    }

    removeErrors = () => {
        const errors = document.querySelectorAll('.error'); //todo: search in form only
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    }

    printFormError = (err) =>{
        const submitButton = document.getElementById('submitButton'); //todo: search in form only
        printError('Form error: ' + err.message, 'network error', err.message, submitButton);
    }