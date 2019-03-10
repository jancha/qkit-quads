
let border = 10;
let quadCells = 10;
let quadRows = 10;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let quadWidth = (wWidth - 2 * border)/quadCells;
let quadHeight = (wHeight - 2 * border)/quadRows;

qKit.init({
  width: wWidth - border * 2,
  height: wHeight - border * 2,
  border: {
    width: border,
    color: 'red',
    radius: 0
  }
});

let quads = [];
for (let i = 0; i < quadCells; i++){
    for (let j = 0; j < quadRows; j++){
        let quad = qKit.draw.quad();
        quad.x = i*quadWidth;
        quad.y = j*quadHeight;
        quad.width = quadWidth;
        quad.height = quadHeight;
        quad.color = "red";
        quad.extension.red = 0;
        quad.extension.green = 0;
        quad.extension.blue = 0;
        quad.isOutline = false;
        quads.push(quad);
    }
}

let changeScale = 2
let diffX = -1/changeScale;
let breakPoint = Math.round(quadWidth * changeScale);
let diffY = quadHeight/quadWidth * diffX;
let counter = 0;

qKit.update(() => {
    // rotation 
    if (!(++counter % breakPoint)){
        diffX *= -1;
        diffY *= -1;
    }
    for (let i = 0; i < quads.length; i++){
        let quad = quads[i];
        quad.angle++;
        quad.width += diffX;
        quad.height += diffY;
        quad.x -= diffX/2;
        quad.y -= diffY/2;
    }
    // sin color wave for the red channel
    for (let i = 0; i < quadCells; i++){
        let red = Math.sin((counter)/2/Math.PI/2+Math.PI*2/quadCells*i);
        for (let j = 0; j < quadRows; j++){
            quads[i+j*quadRows].extension.red = red;
        }
    }
    // sin color wave for the green channel
    for (let i = 0; i < quadRows; i++){
        let green = Math.sin((counter)/2/Math.PI/2+Math.PI*2/quadRows*i);
        for (let j = 0; j < quadCells; j++){
            quads[i*quadRows+j].extension.green = green;
        }
    }
    for (let i = 0; i < quads.length; i++){
        let quad = quads[i];
        quad.color = "rgba(" + Math.round(quad.extension.red * 255) + "," + Math.round(quad.extension.green * 255) + ",0,1)";
    }
});

