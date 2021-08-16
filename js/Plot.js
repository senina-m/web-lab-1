const WIDTH = 500; //todo: рассчитывать изходя из размера страницы и css правил для данного элемента
const HEIGHT = 500;
const X_CENTER = 0;
const Y_CENTER = 0;
const R = 2;
let scale = 0.017;

drawPlot = (pointsArray) => {
    console.log('Ready to draw plot!')
    document.getElementById('plot_block').style.visibility = "visible";
    // document.getElementById('plot_image').remove();
    const canvas = SVG()
        .addTo('#plot')
        .size(WIDTH, HEIGHT)
        .viewbox(0, 0, WIDTH, HEIGHT);
    const backgroundColor = '#fff';
    const axesColor = '#000'
    const areaColor = '#1ff';
    canvas.rect(WIDTH, HEIGHT).fill(backgroundColor);
    scale = countScale(pointsArray);
    let lastPoint = pointsArray[pointsArray.length - 1];
    const r = lastPoint.r;
    console.log('R = ' + r);
    drawArea(canvas, r, backgroundColor, areaColor);

    drawAxes(canvas, axesColor);
    drawAxesScaleLabels(canvas, r, axesColor);

    pointsArray.forEach(point => drawPoint(canvas, point.x, point.y, point.result, 5));
    drawPoint(canvas, lastPoint.x, lastPoint.y, lastPoint.result, 10);
}

//todo: сделать так чтобы методы из этого файла были "приватные" -- либо переименовать, чтобы не путались

convertX = (x) => {
    // console.log('convert x: \n width/2 + x/scale ==> ' + WIDTH + '/' + 2 + ' + ' + x + '/' + scale + ' - ' + X_CENTER + ' =\n'
    //     + (WIDTH / 2 + x / scale - X_CENTER));
    return (WIDTH / 2 + x / scale - X_CENTER);
}

convertY = (y) => {
    return (HEIGHT / 2 - y / scale + Y_CENTER)
}

countScale = (pointsArray) => {
    const scaleNum = 50; //todo: find better value
    console.log(JSON.stringify(pointsArray));
    let max = Math.abs(pointsArray[0].x);
    let newScale;
    pointsArray.forEach(point => {
        newScale = max =
            (Math.abs(point.x) > max || (Math.abs(point.y) > max)) ?
                Math.max(point.x, point.y) / scaleNum :
                scale;
    });
    console.log('scale = ' + newScale)
    return newScale;
}

drawAxes = (canvas, axesColor) => {
    //todo: причесать метод, вынести дублирующийся код
    const arrowSize = 10
    //axis x
    canvas.line(0, (HEIGHT / 2), WIDTH, (HEIGHT / 2)).stroke({width: 2, color: axesColor});
    //axis arrow
    const triangleX = (WIDTH - arrowSize) + ',' + (HEIGHT / 2 - arrowSize / 2) + ' ' +
        (WIDTH - arrowSize) + ',' + (HEIGHT / 2 + arrowSize / 2) + ' ' +
        (WIDTH) + ',' + (HEIGHT / 2)
    console.log('x arrow coordinates ' + triangleX)
    canvas.polygon(triangleX).fill(axesColor)
    canvas.text('x').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: axesColor
    }).move(WIDTH - 2 * arrowSize, HEIGHT / 2 - 2 * arrowSize)

    //axis y
    canvas.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 2, color: axesColor});
    //axis arrow
    const triangleY = (WIDTH / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
        (WIDTH / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
        (WIDTH / 2) + ',' + (0);
    console.log('y arrow coordinates ' + triangleY)
    canvas.polygon(triangleY).fill(axesColor)
    canvas.text('y').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: axesColor
    }).move(WIDTH / 2 - 1.5 * arrowSize, 1.7 * arrowSize)
}

function drawScaleLabel(canvas, axesColor, xStart, xStop, yStart, yStop, labelX, labelY, label) {
    // console.log('Label stroke input coordinates for ' + label + ': ' + xStart + ' ' + yStart + ' ' + xStop + ' ' + yStop)
    // console.log('Label stroke coordinates ' + label + ': ' + convertX(xStart) + ' ' + convertY(yStart) + ' ' + convertX(xStop) + ' ' + convertY(yStop) + '\n');
    canvas.line(convertX(xStart), convertY(yStart), convertX(xStop), convertY(yStop))
        .stroke({width: 2, color: axesColor});
    canvas.text(label).font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: axesColor
    }).move(convertX(labelX), convertY(labelY));
}

drawAxesScaleLabels = (canvas, r, axesColor) => { //todo: высчитывать координаты аккуратнее
    console.log('Start drawing axes labels')
    const hatchLen = 0.1;
    //x axis labels
    drawScaleLabel(canvas, axesColor, -r, -r, hatchLen, -hatchLen, -r, -2 * hatchLen, "-2R");
    drawScaleLabel(canvas, axesColor, -r / 2, -r / 2, hatchLen, -hatchLen, -r / 2, -2 * hatchLen, "-R");
    drawScaleLabel(canvas, axesColor, r / 2, r / 2, hatchLen, -hatchLen, r / 2, -2 * hatchLen, "R");
    drawScaleLabel(canvas, axesColor, r, r, hatchLen, -hatchLen, r, -2 * hatchLen, "2R");

    //y axis labels
    drawScaleLabel(canvas, axesColor, hatchLen, -hatchLen, -r, -r, -4 * hatchLen, -r, "-2R");
    drawScaleLabel(canvas, axesColor, hatchLen, -hatchLen, -r / 2, -r / 2, -4 * hatchLen, -r / 2, "-R");
    drawScaleLabel(canvas, axesColor, hatchLen, -hatchLen, r / 2, r / 2, -4 * hatchLen, r / 2, "R");
    drawScaleLabel(canvas, axesColor, hatchLen, -hatchLen, r, r, -4 * hatchLen, r, "2R");
}


drawArea = (canvas, r, backgroundColor, areaColor) => {
    //here diameter needed
    canvas.circle(r / scale).fill(areaColor).move(convertX(-r / 2), convertY(r / 2))
    const fillUnusedCircle = (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r / 2)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r / 2)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(-r / 2)) + ' ' +
        (convertX(0)) + ',' + (convertY(-r / 2))

    canvas.polygon(fillUnusedCircle).fill(backgroundColor)
    const area = (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r / 2)) + ',' + (convertY(0)) + ' ' +
        (convertX(0)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(0)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(-r)) + ' ' +
        (convertX(0)) + ',' + (convertY(-r))
    console.log('area coordinates ' + area)
    canvas.polygon(area).fill(areaColor)
}

countPointLocation = (coords) => {
    let x = coords[0]
    let y = coords[1]
    let r = coords[2]
    return !!((x <= 0 && y <= 0 && (x ^ 2 + y ^ 2 <= (r / 2) ^ 2))
        || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r)
        || (x + r / 2 >= y && y >= 0 && x >= 0));
}

drawPoint = (canvas, x, y, result, pointScale) => {
    let color = result === 'true' ? '#0f0' : '#f00';
    canvas.circle(pointScale).fill(color).move(convertX(x), convertY(y))
    // console.log('x:' + x + ', y:' + y)
    // console.log('scale ' + pointScale + ', x:' + convertX(x) + ', y:' + convertY(y))
}

getCoordinates = () => {
    let x = parseInt(document.getElementById('x').value)
    let y = parseFloat(document.getElementById('y').value)
    let r = parseFloat(document.getElementById('r').value)
    console.log(x + ', ' + y + ', ' + r)
    return [x, y, r]
}
