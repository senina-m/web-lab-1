    const WIDTH = 500; //todo: рассчитывать изходя из размера страницы и css правил для данного элемента
    const HEIGHT = 500;
    const X_CENTER = 0;
    const Y_CENTER = 0;
    const SCALE = 0.017;

    drawPlot = (pointsArray) => {
        let coordinates = getCoordinates();
        SVG.on(document, 'DOMContentLoaded', function (){
            let canvas = SVG().addTo('#plot').size(WIDTH, HEIGHT);
            canvas.viewbox(0, 0, WIDTH, HEIGHT);
            let backgroundColor = '#000';
            canvas.rect(WIDTH, HEIGHT).fill(backgroundColor);
            drawAxes(canvas);
            drawArea(canvas, coordinates, backgroundColor);
            drawPoint(canvas, coordinates);
        });
    }

    //todo: сделать так чтобы методы из этого файла были "приватные" -- либо переименовать, чтобы не путались

    convertX = (x) => {
        console.log('convert x: \n width/2 + x/scale ==> ' + WIDTH + '/' + 2 + ' + ' + x + '/' + SCALE + ' - ' + X_CENTER + ' =\n'
            + (WIDTH / 2 + x / SCALE - X_CENTER));
        return (WIDTH / 2 + x / SCALE - X_CENTER);
    }

    convertY = (y) => {
        return (HEIGHT / 2 - y / SCALE + Y_CENTER)
    }

    drawAxes = (canvas) => {
        const color = '#ff1'
        const arrowSize = 10
        const xAxes = canvas.line(0, (HEIGHT / 2), WIDTH, (HEIGHT / 2))
        xAxes.stroke({width: 2, color: color})
        const triangleX = (WIDTH - arrowSize) + ',' + (HEIGHT / 2 - arrowSize / 2) + ' ' +
            (WIDTH - arrowSize) + ',' + (HEIGHT / 2 + arrowSize / 2) + ' ' +
            (WIDTH) + ',' + (HEIGHT / 2)
        console.log('x arrow coordinates ' + triangleX)
        canvas.polygon(triangleX).fill(color)
        canvas.text('x').font({
            size: 16,
            family: 'Menlo, sans-serif',
            anchor: 'end',
            fill: color
        }).move(WIDTH - 2 * arrowSize, HEIGHT / 2 - 2 * arrowSize)

        const yAxes = canvas.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT)
        yAxes.stroke({width: 2, color: color})
        const triangleY = (WIDTH / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
            (WIDTH / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
            (WIDTH / 2) + ',' + (0);
        console.log('y arrow coordinates ' + triangleY)
        canvas.polygon(triangleY).fill(color)
        canvas.text('y').font({
            size: 16,
            family: 'Menlo, sans-serif',
            anchor: 'end',
            fill: color
        }).move(WIDTH / 2 - 1.5 * arrowSize, 1.7 * arrowSize)
    }

    drawArea = (canvas, coords, backgroundColor) => {
        let r = coords[2]
        const color = '#1ff'
        //here diameter needed
        canvas.circle(r / SCALE).fill(color).move(convertX(-r / 2), convertY(r / 2))
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
        canvas.polygon(area).fill(color)
    }

    countPointLocation = (coords) => {
        let x = coords[0]
        let y = coords[1]
        let r = coords[2]
        return !!((x <= 0 && y <= 0 && (x ^ 2 + y ^ 2 <= (r / 2) ^ 2))
            || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r)
            || (x + r / 2 >= y && y >= 0 && x >= 0));
    }

    drawPoint = (canvas, coords) => {
        let point_scale = 5
        let x = coords[0]
        let y = coords[1]

        let color
        if (countPointLocation(coords)) {
            color = '#0f0'
        } else {
            color = '#f00'
        }
        canvas.circle(point_scale).fill(color).move(convertX(x), convertY(y))
        console.log('x:' + x + ', y:' + y)
        console.log('scale ' + point_scale + ', x:' + convertX(x) + ', y:' + convertY(y))
    }

    getCoordinates = () => {
        let x = parseInt(document.getElementById('x').value)
        let y = parseFloat(document.getElementById('y').value)
        let r = parseFloat(document.getElementById('r').value)
        console.log(x + ', ' + y + ', ' + r)
        return [x, y, r]
    }