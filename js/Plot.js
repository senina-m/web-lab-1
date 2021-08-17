const WIDTH = 500; //todo: рассчитывать изходя из размера страницы и css правил для данного элемента
const HEIGHT = 500;
const X_CENTER = 0;
const Y_CENTER = 0;
const BACKGROUND_COLOR = '#fff';
let CANVAS = null;
const AXES_COLOR = '#000'
const AREA_COLOR = '#1ff';
let scale = 0.017;

let clearedAt = 0;
let lastElementNum = 0;
const DEFAULT_R = 2;

drawPlot = (pointsArray) => {


    if (pointsArray === undefined) {
        CANVAS = SVG()
            .addTo('#plot')
            .size(WIDTH, HEIGHT)
            .viewbox(0, 0, WIDTH, HEIGHT);
        initPlot();
    } else {
        drawPlotWithPoints(pointsArray);
    }
}

initPlot = () => {
    console.log('Init plot!');
    CANVAS.rect(WIDTH, HEIGHT).fill(BACKGROUND_COLOR);
    console.log("R value while init:" + DEFAULT_R);
    drawArea(DEFAULT_R);
    drawAxes();
    drawAxesScaleLabels(DEFAULT_R);
}

drawPlotWithPoints = (pointsArray) => {
    console.log('Ready to draw plot!')
    lastElementNum = pointsArray.length - 1;

    CANVAS.rect(WIDTH, HEIGHT).fill(BACKGROUND_COLOR);

    scale = countScale(pointsArray);
    let lastPoint = pointsArray[pointsArray.length - 1];
    const r = lastPoint.r;
    console.log('R = ' + r);
    drawArea(r);

    drawAxes();
    drawAxesScaleLabels(r);

    for (i = clearedAt; i <= lastElementNum; i++){
        let point = pointsArray[i];
        drawPoint(point.x, point.y, point.result, 5);
    }
    drawPoint(lastPoint.x, lastPoint.y, lastPoint.result, 10);
    drawRValue(r);
}

clearPlot = () => {
    clearedAt = lastElementNum;
    initPlot();
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
    const scaleNum = 200; //todo: find better value
    console.log(JSON.stringify(pointsArray));
    let max = Math.abs(pointsArray[0].x);
    let newScale;
    pointsArray.forEach(point => {
        newScale = max =
            (Math.abs(point.x) > max || (Math.abs(point.y) > max)) ?
                Math.max(Math.abs(point.x), (Math.abs(point.y))) / scaleNum :
                scale;
    });
    console.log('scale = ' + newScale)
    return newScale;
}

drawAxes = () => {
    //todo: причесать метод, вынести дублирующийся код
    const arrowSize = 10
    //axis x
    CANVAS.line(0, (HEIGHT / 2), WIDTH, (HEIGHT / 2)).stroke({width: 2, color: AXES_COLOR});
    //axis arrow
    const triangleX = (WIDTH - arrowSize) + ',' + (HEIGHT / 2 - arrowSize / 2) + ' ' +
        (WIDTH - arrowSize) + ',' + (HEIGHT / 2 + arrowSize / 2) + ' ' +
        (WIDTH) + ',' + (HEIGHT / 2)
    console.log('x arrow coordinates ' + triangleX)
    CANVAS.polygon(triangleX).fill(AXES_COLOR)
    CANVAS.text('x').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(WIDTH - 2 * arrowSize, HEIGHT / 2 - 2 * arrowSize)

    //axis y
    CANVAS.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 2, color: AXES_COLOR});
    //axis arrow
    const triangleY = (WIDTH / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
        (WIDTH / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
        (WIDTH / 2) + ',' + (0);
    console.log('y arrow coordinates ' + triangleY)
    CANVAS.polygon(triangleY).fill(AXES_COLOR)
    CANVAS.text('y').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(WIDTH / 2 - 1.5 * arrowSize, 1.7 * arrowSize)
}

function drawScaleLabel(xStart, xStop, yStart, yStop, labelX, labelY, label) {
    // console.log('Label stroke input coordinates for ' + label + ': ' + xStart + ' ' + yStart + ' ' + xStop + ' ' + yStop)
    // console.log('Label stroke coordinates ' + label + ': ' + convertX(xStart) + ' ' + convertY(yStart) + ' ' + convertX(xStop) + ' ' + convertY(yStop) + '\n');
    CANVAS.line(convertX(xStart), convertY(yStart), convertX(xStop), convertY(yStop))
        .stroke({width: 2, color: AXES_COLOR});
    CANVAS.text(label).font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(convertX(labelX), convertY(labelY));
}

drawRValue = (r) => {
    CANVAS.text('R = ' + r).font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(WIDTH - 50, HEIGHT - 50);
}

drawAxesScaleLabels = (r) => { //todo: высчитывать координаты аккуратнее
    console.log('Start drawing axes labels')
    const hatchLen = 0.1;
    console.log("R value while drawing labels: " + r);
    //x axis labels
    drawScaleLabel(-r, -r, hatchLen, -hatchLen, -r, -2 * hatchLen, "-R");
    drawScaleLabel(-r / 2, -r / 2, hatchLen, -hatchLen, -r / 2, -2 * hatchLen, "-R/2");
    drawScaleLabel(r / 2, r / 2, hatchLen, -hatchLen, r / 2, -2 * hatchLen, "R/2");
    drawScaleLabel(r, r, hatchLen, -hatchLen, r, -2 * hatchLen, "R");

    //y axis labels
    drawScaleLabel( hatchLen, -hatchLen, -r, -r, -4 * hatchLen, -r, "-R");
    drawScaleLabel( hatchLen, -hatchLen, -r / 2, -r / 2, -4 * hatchLen, -r / 2, "-R/2");
    drawScaleLabel( hatchLen, -hatchLen, r / 2, r / 2, -4 * hatchLen, r / 2, "R/2");
    drawScaleLabel( hatchLen, -hatchLen, r, r, -4 * hatchLen, r, "R");
}


drawArea = (r) => {
    //here diameter needed
    CANVAS.circle(r / scale).fill(AREA_COLOR).move(convertX(-r / 2), convertY(r / 2))
    const fillUnusedCircle = (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r / 2)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r / 2)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(-r / 2)) + ' ' +
        (convertX(0)) + ',' + (convertY(-r / 2))

    CANVAS.polygon(fillUnusedCircle).fill(BACKGROUND_COLOR)
    const area = (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r / 2)) + ',' + (convertY(0)) + ' ' +
        (convertX(0)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(0)) + ' ' +
        (convertX(r / 2)) + ',' + (convertY(-r)) + ' ' +
        (convertX(0)) + ',' + (convertY(-r))
    console.log('area coordinates ' + area)
    CANVAS.polygon(area).fill(AREA_COLOR)
}

countPointLocation = (coords) => {
    let x = coords[0]
    let y = coords[1]
    let r = coords[2]
    return !!((x <= 0 && y <= 0 && (x ^ 2 + y ^ 2 <= (r / 2) ^ 2))
        || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r)
        || (x + r / 2 >= y && y >= 0 && x >= 0));
}

drawPoint = (x, y, result, pointScale) => {
    let color = result === 'true' ? '#0f0' : '#f00';
    CANVAS.circle(pointScale).fill(color).move(convertX(x), convertY(y))
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
