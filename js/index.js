processData = function (event) {
    event.preventDefault();
    const form = document.getElementsByClassName('form');
    console.log('form: ' + form)
    console.log('Start processing form')
    let coordinates = validateForm();
    if (coordinates != null){
        submitData(coordinates, "https://se.ifmo.ru/~s312986/web-lab-1/php/main.php").then(pointsArray => {
            drawPlot(pointsArray);
            drawTable(pointsArray);
        }).catch(err => console.log(err));
    }else{
        console.log('data validation error');
    }
}