drawPlot = function (pointsArray) {
    const width = 500, height = 500
    const xCenter = 0, yCenter = 0
    const scale = 0.017


    SVG.on(document, 'DOMContentLoaded', function () {
        let canvas = SVG().addTo('#plot').size(width, height)
        canvas.viewbox(0, 0, width, height)
        let backgroundColor = '#000'
        canvas.rect(width, height).fill(backgroundColor)
        drawAxes(canvas)
        let coordinates = getCoordinates()
        drawArea(canvas, coordinates, backgroundColor)
        drawPoint(canvas, coordinates)
    })

    convertX = function (x) {
        console.log('convert x: \n width/2 + x/scale ==> ' + width + '/' + 2 + ' + ' + x + '/' + scale + ' - ' + xCenter + ' =\n'
            + (width / 2 + x / scale - xCenter))
        return (width / 2 + x / scale - xCenter)
    }

    convertY = function (y) {
        return (height / 2 - y / scale + yCenter)
    }

    drawAxes = function (canvas) {
        const color = '#ff1'
        const arrowSize = 10
        const xAxes = canvas.line(0, (height / 2), width, (height / 2))
        xAxes.stroke({width: 2, color: color})
        const triangleX = (width - arrowSize) + ',' + (height / 2 - arrowSize / 2) + ' ' +
            (width - arrowSize) + ',' + (height / 2 + arrowSize / 2) + ' ' +
            (width) + ',' + (height / 2)
        console.log('x arrow coordinates ' + triangleX)
        canvas.polygon(triangleX).fill(color)
        canvas.text('x').font({
            size: 16,
            family: 'Menlo, sans-serif',
            anchor: 'end',
            fill: color
        }).move(width - 2 * arrowSize, height / 2 - 2 * arrowSize)

        const yAxes = canvas.line(width / 2, 0, width / 2, height)
        yAxes.stroke({width: 2, color: color})
        const triangleY = (width / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
            (width / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
            (width / 2) + ',' + (0);
        console.log('y arrow coordinates ' + triangleY)
        canvas.polygon(triangleY).fill(color)
        canvas.text('y').font({
            size: 16,
            family: 'Menlo, sans-serif',
            anchor: 'end',
            fill: color
        }).move(width / 2 - 1.5 * arrowSize, 1.7 * arrowSize)
    }

    drawArea = function (canvas, coords, backgroundColor) {
        let r = coords[2]
        const color = '#1ff'
        //here diameter needed
        canvas.circle(r / scale).fill(color).move(convertX(-r / 2), convertY(r / 2))
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

    countPointLocation = function (coords) {
        let x = coords[0]
        let y = coords[1]
        let r = coords[2]
        return !!((x <= 0 && y <= 0 && (x ^ 2 + y ^ 2 <= (r / 2) ^ 2))
            || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r)
            || (x + r / 2 >= y && y >= 0 && x >= 0));
    }

    drawPoint = function (canvas, coords) {
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

    getCoordinates = function () {
        let x = parseInt(document.getElementById('x').value)
        let y = parseFloat(document.getElementById('y').value)
        let r = parseFloat(document.getElementById('r').value)
        console.log(x + ', ' + y + ', ' + r)
        return [x, y, r]
    }

}