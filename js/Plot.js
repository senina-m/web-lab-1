class Plot {
    width = 500; //todo: рассчитывать изходя из размера страницы и css правил для данного элемента
    height = 500;
    xCenter = 0;
    yCenter = 0;
    scale = 0.017;

    draw(pointsArray) {
        let coordinates = this.getCoordinates();
        const plotClass = this;
        SVG.on(document, 'DOMContentLoaded', function (){
            let canvas = SVG().addTo('#plot').size(plotClass.width, plotClass.height);
            canvas.viewbox(0, 0, plotClass.width, plotClass.height);
            let backgroundColor = '#000';
            canvas.rect(plotClass.width, plotClass.height).fill(backgroundColor);
            plotClass.drawAxes(canvas);
            plotClass.drawArea(canvas, coordinates, backgroundColor);
            plotClass.drawPoint(canvas, coordinates);
        });
    }


    convertX(x) {
        console.log('convert x: \n width/2 + x/scale ==> ' + this.width + '/' + 2 + ' + ' + x + '/' + this.scale + ' - ' + this.xCenter + ' =\n'
            + (this.width / 2 + x / this.scale - this.xCenter));
        return (this.width / 2 + x / this.scale - this.xCenter);
    }

    convertY(y) {
        return (this.height / 2 - y / this.scale + this.yCenter)
    }

    drawAxes(canvas) {
        const color = '#ff1'
        const arrowSize = 10
        const xAxes = canvas.line(0, (this.height / 2), this.width, (this.height / 2))
        xAxes.stroke({width: 2, color: color})
        const triangleX = (this.width - arrowSize) + ',' + (this.height / 2 - arrowSize / 2) + ' ' +
            (this.width - arrowSize) + ',' + (this.height / 2 + arrowSize / 2) + ' ' +
            (this.width) + ',' + (this.height / 2)
        console.log('x arrow coordinates ' + triangleX)
        canvas.polygon(triangleX).fill(color)
        canvas.text('x').font({
            size: 16,
            family: 'Menlo, sans-serif',
            anchor: 'end',
            fill: color
        }).move(this.width - 2 * arrowSize, this.height / 2 - 2 * arrowSize)

        const yAxes = canvas.line(this.width / 2, 0, this.width / 2, this.height)
        yAxes.stroke({width: 2, color: color})
        const triangleY = (this.width / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
            (this.width / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
            (this.width / 2) + ',' + (0);
        console.log('y arrow coordinates ' + triangleY)
        canvas.polygon(triangleY).fill(color)
        canvas.text('y').font({
            size: 16,
            family: 'Menlo, sans-serif',
            anchor: 'end',
            fill: color
        }).move(this.width / 2 - 1.5 * arrowSize, 1.7 * arrowSize)
    }

    drawArea(canvas, coords, backgroundColor) {
        let r = coords[2]
        const color = '#1ff'
        //here diameter needed
        canvas.circle(r / this.scale).fill(color).move(this.convertX(-r / 2), this.convertY(r / 2))
        const fillUnusedCircle = (this.convertX(0)) + ',' + (this.convertY(0)) + ' ' +
            (this.convertX(-r / 2)) + ',' + (this.convertY(0)) + ' ' +
            (this.convertX(-r / 2)) + ',' + (this.convertY(r / 2)) + ' ' +
            (this.convertX(r / 2)) + ',' + (this.convertY(r / 2)) + ' ' +
            (this.convertX(r / 2)) + ',' + (this.convertY(-r / 2)) + ' ' +
            (this.convertX(0)) + ',' + (this.convertY(-r / 2))

        canvas.polygon(fillUnusedCircle).fill(backgroundColor)
        const area = (this.convertX(0)) + ',' + (this.convertY(0)) + ' ' +
            (this.convertX(-r / 2)) + ',' + (this.convertY(0)) + ' ' +
            (this.convertX(0)) + ',' + (this.convertY(r / 2)) + ' ' +
            (this.convertX(0)) + ',' + (this.convertY(0)) + ' ' +
            (this.convertX(r / 2)) + ',' + (this.convertY(0)) + ' ' +
            (this.convertX(r / 2)) + ',' + (this.convertY(-r)) + ' ' +
            (this.convertX(0)) + ',' + (this.convertY(-r))
        console.log('area coordinates ' + area)
        canvas.polygon(area).fill(color)
    }

    countPointLocation(coords) {
        let x = coords[0]
        let y = coords[1]
        let r = coords[2]
        return !!((x <= 0 && y <= 0 && (x ^ 2 + y ^ 2 <= (r / 2) ^ 2))
            || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r)
            || (x + r / 2 >= y && y >= 0 && x >= 0));
    }

    drawPoint(canvas, coords) {
        let point_scale = 5
        let x = coords[0]
        let y = coords[1]

        let color
        if (this.countPointLocation(coords)) {
            color = '#0f0'
        } else {
            color = '#f00'
        }
        canvas.circle(point_scale).fill(color).move(this.convertX(x), this.convertY(y))
        console.log('x:' + x + ', y:' + y)
        console.log('scale ' + point_scale + ', x:' + this.convertX(x) + ', y:' + this.convertY(y))
    }

    getCoordinates() {
        let x = parseInt(document.getElementById('x').value)
        let y = parseFloat(document.getElementById('y').value)
        let r = parseFloat(document.getElementById('r').value)
        console.log(x + ', ' + y + ', ' + r)
        return [x, y, r]
    }

}