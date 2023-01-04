let gl, vBuffer, program, pointLoc, colorLoc, pointParamLoc;
let scanBarLength = 0.18;
let scanBarPos, rectData;
let drawHandler;
let drawingBuf = [],
    view_elements = {};
// for use with requestAnimationFrame
let prevTimeFr,
    duration = 5000;
export let indicators_data = {};

const visualContext = [
    {
        type: "ecg",
        color: "00FF00",
        WINDOW_POINTS: 1250,
        src: [0],
    },
    {
        type: "spo2",
        color: "FFFF00",
        WINDOW_POINTS: 250,
        src: [0],
    },
    {
        type: "resp",
        color: "00FFFF",
        WINDOW_POINTS: 250,
        src: [0],
    },
];
let v_shader_src = `  
            uniform vec3 pointParam;
            uniform vec3 rgb;            
            attribute vec2 point;
            varying mediump vec4 f_color;   
            
            void main(void) { 
                float x, y = 2. * (point[0] - pointParam[1]) / (pointParam[0] - pointParam[1]) - 1.;
                gl_PointSize = 5.5;                   
                if (point[1] <= pointParam[2]) {                    
                    x = 2. * point[1] / (pointParam[2] - 1.) - 1.;                    
                    f_color = vec4(rgb, 1.);                
                }
                else {
                    if (point[1] > pointParam[2] + 3.5)  {
                        x = point[1] - pointParam[2] - 5.;                        
                        f_color = vec4(1., 1., 1., 1.);
                    }
                    else {
                        x = point[1] - pointParam[2] - 2.;                                               
                        f_color = vec4(0., 0., 0., 1.);
                    }
                }
                gl_Position = vec4(x, y, 0., 1.);  
            }`;
var f_shader_src = `  
            precision mediump float;
            varying mediump vec4 f_color;
            void main(void) {     
                float d = distance(gl_PointCoord, vec2(.5, .5));
                if(d < .5) { 
                    gl_FragColor = f_color; 
                }
                else { 
                    discard; 
                }          
            }`;

function createShader(gl, shader_type, shader_src) {
    if (
        !(shader_type === gl.VERTEX_SHADER) &&
        !(shader_type === gl.FRAGMENT_SHADER)
    ) {
        console.log("Shader type:", shader_type, " not supported");
        return false;
    }
    var shader = gl.createShader(shader_type);
    gl.shaderSource(shader, shader_src);
    gl.compileShader(shader);
    var compileOk = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compileOk) {
        console.error("Error in creating shader\n", shader_src);
        console.log(gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}
function createProgram(gl) {
    let vertShader = createShader(gl, gl.VERTEX_SHADER, v_shader_src);
    let fragShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        f_shader_src
    );
    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    var linkOk = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linkOk) {
        console.error("glLinkProgram:");
        return false;
    }
    return program;
}
function scaleValue(
    value,
    sourceRangeMin,
    sourceRangeMax,
    targetRangeMin,
    targetRangeMax
) {
    var targetRange = targetRangeMax - targetRangeMin;
    var sourceRange = sourceRangeMax - sourceRangeMin;
    return (
        ((value - sourceRangeMin) * targetRange) / sourceRange +
        targetRangeMin
    );
}
function hex_2_rgb(hex_val) {
    if (hex_val.length !== 6) {
        throw "Only six-digit hex colors are allowed.";
    }
    var aRgbHex = hex_val.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16) / 255,
        parseInt(aRgbHex[1], 16) / 255,
        parseInt(aRgbHex[2], 16) / 255,
    ];
    return aRgb;
}
class ViewElement {
    id;
    rect;
    drawingData = [];
    WINDOW_POINTS;
    ended = false;
    STEP = 5;
    scanBarPos = 0;
    minVal;
    maxVal;
    rgb;
    currentPoint;

    constructor(id, rect) {
        this.id = id;
        this.rect = rect;
    }
    updateDrawBuffer() {
        let points = indicators_data[this.id].splice(0, this.STEP);
        if (points.length > 0) {
            if (
                this.drawingData.length <=
                this.WINDOW_POINTS - this.STEP
            ) {
                this.drawingData = this.drawingData.concat(points);
                this.scanBarPos =
                    (this.scanBarPos + points.length) %
                    this.WINDOW_POINTS;
            } else {
                for (let p of points) {
                    this.drawingData[this.scanBarPos] = p;
                    this.scanBarPos =
                        (this.scanBarPos + 1) % this.WINDOW_POINTS;
                }
            }
            this.currentPoint = points[points.length - 1];
        } else {
            this.ended = true;
        }
    }
}
export function init(parentDiv, ROWS, COLS) {
    let offsetLeft = 0;
    let offsetTop = parentDiv.offsetTop;
    let baseWidth = Math.round(parentDiv.clientWidth / COLS);
    let baseHeight = Math.round(parentDiv.clientHeight / ROWS);

    // TODO: add divs in the for loop for adding control buttons such as maximize, sound
    for (var i = 0; i < ROWS; i++) {
        let top = offsetTop + i * baseHeight;
        for (var j = 0; j < COLS; j++) {
            let left = offsetLeft + j * baseWidth;
            let rect = {
                left: left,
                top: top,
                width: baseWidth,
                height: baseHeight,
            };
            // data source
            let idx =
                Math.round(Math.random() * 10) % visualContext.length;
            indicators_data["grid-" + i + "-" + j] = [].concat(
                visualContext[idx].src
            );
            let viewElem = new ViewElement(
                "grid-" + i + "-" + j,
                rect
            );
            viewElem.WINDOW_POINTS = visualContext[idx].WINDOW_POINTS;
            viewElem.rgb = hex_2_rgb(visualContext[idx].color);
            // let maxVal = visualContext[idx].src.reduce(
            //     (a, b) => Math.max(a, b),
            //     -Infinity
            // );
            // let minVal = visualContext[idx].src.reduce(
            //     (a, b) => Math.min(a, b),
            //     Infinity
            // );
            let minVal, maxVal;
            switch (i) {
                case 1:
                    minVal = -5;
                    maxVal = 105;
                    break;
                default:
                    minVal = -5;
                    maxVal = 255;
            }
            viewElem.minVal = minVal - 50;
            viewElem.maxVal = maxVal + 50;
            view_elements["grid-" + i + "-" + j] = viewElem;
        }
    }

    // gl
    gl = document
        .getElementById("canvas")
        .getContext("webgl", { antialias: false });
    if (gl) {
        console.log("WebGL context initialized!");
    }
    gl.enable(gl.SCISSOR_TEST);
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    //program
    program = createProgram(gl);
    pointLoc = gl.getAttribLocation(program, "point");
    colorLoc = gl.getUniformLocation(program, "rgb");
    pointParamLoc = gl.getUniformLocation(program, "pointParam");
    gl.useProgram(program);
    gl.vertexAttribPointer(pointLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(pointLoc);
    gl.clearColor(0, 0, 0, 1.0);
}
function isFinished() {
    let res = true;
    Object.keys(view_elements).forEach(function (key) {
        res = res && view_elements[key].ended;
    });
    return res;
}
function cleanup() {
    console.log("Cleaning up resources");
}
export function draw() {
    for (const key in view_elements) {
        let current = view_elements[key];
        gl.scissor(
            current.rect.left,
            current.rect.top,
            current.rect.width,
            current.rect.height
        );
        gl.viewport(
            current.rect.left,
            current.rect.top,
            current.rect.width,
            current.rect.height
        );
        gl.clear(gl.COLOR_BUFFER_BIT);
        current.updateDrawBuffer();
        // draw this element
        gl.uniform3f(
            pointParamLoc,
            current.maxVal,
            current.minVal,
            current.WINDOW_POINTS
        );
        gl.uniform3fv(colorLoc, current.rgb);
        drawingBuf = current.drawingData.reduce(function (arr, v, i) {
            return arr.concat(
                v,
                Array.from(Array(current.drawingData.length).keys())[
                    i
                ]
            );
        }, []);
        scanBarPos =
            scaleValue(
                current.scanBarPos,
                0,
                current.WINDOW_POINTS,
                -1,
                1
            ) +
            current.WINDOW_POINTS +
            2;
        rectData = [
            current.minVal,
            scanBarPos,
            current.maxVal,
            scanBarPos,
            current.maxVal,
            scanBarPos + scanBarLength,
            current.minVal,
            scanBarPos,
            current.maxVal,
            scanBarPos + scanBarLength,
            current.minVal,
            scanBarPos + scanBarLength,
        ];
        drawingBuf = drawingBuf
            .concat(rectData)
            .concat([current.currentPoint, scanBarPos + 3]);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(drawingBuf),
            gl.DYNAMIC_DRAW
        );
        gl.drawArrays(gl.LINE_STRIP, 0, current.drawingData.length);
        gl.drawArrays(gl.TRIANGLES, current.drawingData.length, 6);
        gl.drawArrays(gl.POINTS, current.drawingData.length + 6, 1);
        // console.log(current);
    }
    if (!isFinished()) {
        drawHandler = setTimeout(function () {
            draw();
        }, 100);
        // drawHandler = requestAnimationFrame((timestamp) => {
        //     if (!prevTimeFr) prevTimeFr = timestamp;
        //     const elapsed = timestamp - prevTimeFr;
        //     for (const key in view_elements) {
        //         const current = view_elements[key];
        //         const fpsInterval = Math.floor(
        //             duration / current.WINDOW_POINTS
        //         );
        //         if (elapsed >= fpsInterval) {
        //             prevTimeFr = timestamp - (elapsed % fpsInterval);
        //             current.STEP = Math.floor(
        //                 (elapsed *
        //                     (current.drawingData.length >=
        //                     current.WINDOW_POINTS
        //                         ? current.drawingData.length
        //                         : current.WINDOW_POINTS)) /
        //                     duration
        //             );
        //         } else {
        //             current.STEP = 0;
        //         }
        //     }
        //     draw();
        // });
    } else {
        console.log("Finished drawing");
        cancelAnimationFrame(drawHandler);
        cleanup();
    }
}
// function main() {
//     init(4, 5);
//     draw();
// }
