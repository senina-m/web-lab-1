drawTable = function (pointsArray) {
    console.log('Start to draw table');
    // console.log(typeof pointsArray);

    let new_tbody = document.createElement('tbody');
    for (let i = 0; i < pointsArray.length; i++){
        let point = pointsArray[i];
        let row = new_tbody.insertRow(i);
        let properties = Object.keys(point);
        for (let property of properties) {
            let td = row.insertCell();
            if(property === "script_time"){
                td.innerHTML = parseFloat(point[property]).toFixed(7) + " ns";
            } else {
                td.innerHTML = point[property];
            }
        }
    }

    let old_tbody = document.getElementById('table_body')
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.id = 'table_body';
}