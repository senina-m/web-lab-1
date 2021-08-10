// const width = '100%', height = width + 0 //костыль,иначе ругается TODO
const width = 500, height = 500
const x_center = 0, y_center = 0
const scale = 0.08


SVG.on(document, 'DOMContentLoaded', function () {
    let canvas = SVG().addTo('#plot').size(width, height)
    canvas.viewbox(0, 0, width, height)
    let background_color = '#000'
    canvas.rect(width, height).fill(background_color)
    draw_axes(canvas)
    let coordinates = get_coordinates()
    draw_area(canvas, coordinates, background_color)
    draw_point(canvas, coordinates)
})

convert_x = function (x) {
    console.log('convert x: \n width/2 + x/scale ==> ' + width + '/' + 2 + ' + ' + x + '/' + scale + ' - ' + x_center + ' =\n'
        + (width / 2 + x / scale - x_center))
    return (width / 2 + x / scale - x_center)
}

convert_y = function (y) {
    return (height / 2 - y / scale + y_center)
}

draw_axes = function (canvas) {
    const color = '#ff1'
    const arrow_size = 10
    const x_axes = canvas.line(0, (height / 2), width, (height / 2))
    x_axes.stroke({width: 2, color: color})
    const triangle_x = (width - arrow_size) + ',' + (height / 2 - arrow_size / 2) + ' ' +
        (width - arrow_size) + ',' + (height / 2 + arrow_size / 2) + ' ' +
        (width) + ',' + (height / 2)
    console.log('x arrow coordinates ' + triangle_x)
    canvas.polygon(triangle_x).fill(color)
    canvas.text('x').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: color
    }).move(width - 2 * arrow_size, height / 2 - 2 * arrow_size)

    const y_axes = canvas.line(width / 2, 0, width / 2, height)
    y_axes.stroke({width: 2, color: color})
    const triangle_y = (width / 2 - arrow_size / 2) + ',' + (arrow_size) + ' ' +
        (width / 2 + arrow_size / 2) + ',' + (arrow_size) + ' ' +
        (width / 2) + ',' + (0);
    console.log('y arrow coordinates ' + triangle_y)
    canvas.polygon(triangle_y).fill(color)
    canvas.text('y').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: color
    }).move(width / 2 - 1.5 * arrow_size, 1.7 * arrow_size)
}

draw_area = function (canvas, coords, background_color) {
    let x = coords[0]
    let y = coords[1]
    let r = coords[2]
    const color = '#1ff'
    //here diameter needed
    canvas.circle(r / scale).fill(color).move(convert_x(-r / 2), convert_y(r / 2))
    const fill_unused_circle = (convert_x(0)) + ',' + (convert_y(0)) + ' ' +
        (convert_x(-r / 2)) + ',' + (convert_y(0)) + ' ' +
        (convert_x(-r / 2)) + ',' + (convert_y(r / 2)) + ' ' +
        (convert_x(r / 2)) + ',' + (convert_y(r / 2)) + ' ' +
        (convert_x(r / 2)) + ',' + (convert_y(-r / 2)) + ' ' +
        (convert_x(0)) + ',' + (convert_y(-r / 2))

    canvas.polygon(fill_unused_circle).fill(background_color)
    const area = (convert_x(0)) + ',' + (convert_y(0)) + ' ' +
        (convert_x(-r / 2)) + ',' + (convert_y(0)) + ' ' +
        (convert_x(0)) + ',' + (convert_y(r / 2)) + ' ' +
        (convert_x(0)) + ',' + (convert_y(0)) + ' ' +
        (convert_x(r / 2)) + ',' + (convert_y(0)) + ' ' +
        (convert_x(r / 2)) + ',' + (convert_y(-r)) + ' ' +
        (convert_x(0)) + ',' + (convert_y(-r))
    console.log('area coordinates ' + area)
    canvas.polygon(area).fill(color)
}

count_point_location = function (coords){
    let x = coords[0]
    let y = coords[1]
    let r = coords[2]
    return !!((x <= 0 && y <= 0 && (x ^ 2 + y ^ 2 <= (r / 2) ^ 2))
        || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r)
        || (x + r / 2 >= y && y >= 0 && x >= 0));
}

draw_point = function (canvas, coords) {
    let point_scale = 5
    let x = coords[0]
    let y = coords[1]

    let color
    if(count_point_location(coords)){
        color = '#0f0'
    }else {
        color = '#f00'
    }
    canvas.circle(point_scale).fill(color).move(convert_x(x), convert_y(y))
    console.log('x:' + x + ', y:' + y)
    console.log('scale ' + point_scale + ', x:' + convert_x(x) + ', y:' + convert_y(y))
}

get_coordinates = function () {
    let x = parseFloat(document.getElementById('x').value)
    let y = parseFloat(document.getElementById('y').value)
    let r = parseFloat(document.getElementById('r').value)
    console.log(x + ', ' + y + ', ' + r)
    return [x, y, r]
}
