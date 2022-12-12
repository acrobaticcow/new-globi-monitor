//layout util
export class LayoutUtil {
  static createGLContainer(parent_div_id, expand_callback, audio_callback) {
    let parent_div = document.getElementById(parent_div_id);
    //buttons at top left
    let button_div = document.createElement("div");
    button_div.setAttribute("id", parent_div_id + "_control_div");
    button_div.style.backgroundColor = "cyan";
    button_div.style.position = "absolute";
    button_div.style.display = "none";
    button_div.style.top = 0;
    button_div.style.left = 0;
    button_div.style.zIndex = "30";
    // add maximize button
    let expand_button = document.createElement("button");
    expand_button.setAttribute("id", parent_div_id + "-max-button");
    expand_button.className = "expand-class";
    expand_button.onclick = function () {
      expand_callback(parent_div_id + "-max-button");
    };
    button_div.appendChild(expand_button);
    // add audio button
    let audio_button = document.createElement("button");
    audio_button.setAttribute("id", parent_div_id + "-audio-button");
    audio_button.classList.add("audio");
    audio_button.classList.add("audio-off");
    audio_button.onclick = function () {
      let audio_elements = document.getElementsByClassName("audio");
      for (var i = 0; i < audio_elements.length; i++) {
        if (
          audio_elements.item(i).getAttribute("id") !== this.getAttribute("id")
        ) {
          audio_elements.item(i).classList.remove("audio-on");
          audio_elements.item(i).classList.add("audio-off");
        }
      }
      this.classList.toggle("audio-off");
      this.classList.toggle("audio-on");
      audio_callback(parent_div_id, this.classList.contains("audio-on"));
    };
    button_div.appendChild(audio_button);
    parent_div.appendChild(button_div);
  }

  static getElementRec(element) {
    let rec = { x: 0, y: 0, width: 0, height: 0 };

    let computedStyle = getComputedStyle(element);
    rec.width = element.clientWidth;
    rec.width -= parseFloat(computedStyle.paddingLeft);
    rec.width -= parseFloat(computedStyle.paddingRight);
    rec.height = element.clientHeight;
    rec.height -= parseFloat(computedStyle.paddingTop);
    rec.height -= parseFloat(computedStyle.paddingBottom);
    let boundingRect = element.getBoundingClientRect();
    rec.x = boundingRect.left;
    rec.x += parseFloat(computedStyle.paddingLeft);
    rec.x += parseFloat(computedStyle.borderLeft);
    rec.y = boundingRect.top;
    rec.y += parseFloat(computedStyle.paddingTop);
    rec.y += parseFloat(computedStyle.borderTop);

    return rec;
  }

  // make a div draggable
  static enableDrag(div) {
    var isDown = false;
    var offset = [0, 0];
    var mousePosition;

    div.addEventListener(
      "mousedown",
      function (e) {
        isDown = true;
        div.style.cursor = "move";
        offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
      },
      true
    );

    document.addEventListener(
      "mouseup",
      function () {
        isDown = false;
      },
      true
    );

    document.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
          div.style.left = mousePosition.x + offset[0] + "px";
          div.style.top = mousePosition.y + offset[1] + "px";
        }
      },
      true
    );
  }
}

// general
class Util {
  static hex_2_rgb(hex_val) {
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

  static scaleValue(val, minVal, maxVal) {
    return (2 * (val - minVal)) / (maxVal - minVal) - 1;
  }

  static findClosestPoint(xLoc, width, numPoints) {
    let distance = width / numPoints;
    for (let i = 0; i < numPoints - 1; ++i) {
      const x1 = i * distance;
      const x2 = x1 + distance;
      if (x2 >= xLoc && x1 <= xLoc) {
        const choseLeftPoint = x2 - xLoc > xLoc - x1;
        if (choseLeftPoint) {
          return i;
        } else {
          return i + 1;
        }
      }
    }
  }

  static genGrid(width, height, xPoints) {
    let res = [];
    const baseSize = width / xPoints;
    // rows generation
    let startRow = 0;
    let numRows = 0;
    while (startRow <= height) {
      res.push(0); //x
      res.push(startRow); //y
      res.push(width);
      res.push(startRow);
      startRow += baseSize;
      numRows += 1;
    }

    // columns generation
    let startColumn = 0;
    let numCols = 0;
    while (startColumn <= width) {
      res.push(startColumn);
      res.push(0);
      res.push(startColumn);
      res.push(height);
      startColumn += baseSize;
      numCols += 1;
    }
    return [res, numRows, numCols];
  }
}

//Sound
export class BeepWrapper {
  audio;

  constructor() {
    this.audio = new Audio(
      "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
    );
    this.audio.muted = true;
  }

  play() {
    return this.audio.play();
  }

  resetAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.muted = false;
    this.audio.volume = 0.5;
  }
}

//WebGl
class GLWrapper {
  gl;
  program;
  numPointsLoc;
  pointLoc;
  vBuffer;

  static v_shader_src = `
        uniform float numPoints; 
        uniform float maxVal;
        uniform float minVal;   
        attribute vec2 point;   
        uniform vec3 rgb;
        varying mediump vec4 f_color;   
            
        void main(void) {
            if (point[1] <= numPoints) {
                float y = 2.0 * (point[0] - minVal) / (maxVal - minVal) - 1.0;
                float x = 2.0 * point[1] / (numPoints-1.0) - 1.0; 
                gl_Position = vec4(x, y, 0.0, 1.0); 
                f_color = vec4(rgb, 0.0);
                
            }
            else {
                if (point[1] > numPoints + 2.5)  {
                    float x = point[1] - numPoints - 4.0; 
                    float y = 2.0 * (point[0] - minVal) / (maxVal - minVal) - 1.0;
                    gl_PointSize = 4.2;
                    gl_Position = vec4(x, y, 0.0, 1.0);
                    f_color = vec4(1.0, 1.0, 1.0, 1.);
                }
                else {
                    float x = point[1] - numPoints - 1.1; 
                    gl_Position = vec4(x, point[0], 0.0, 1.0); 
                    f_color = vec4(0.0, 0.0, 0.0, 0.1);
                }
            } 
        }`;

  static f_shader_src = `   
        varying mediump vec4 f_color;

        void main(void) {
            gl_FragColor = f_color;               
        }`;

  static createShader(gl, shader_type, shader_src) {
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

  static createProgram(gl) {
    let vertShader = GLWrapper.createShader(
      gl,
      gl.VERTEX_SHADER,
      GLWrapper.v_shader_src
    );
    let fragShader = GLWrapper.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      GLWrapper.f_shader_src
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

  constructor(gl, rgb) {
    this.gl = gl;
    // vertex buffers
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.program = GLWrapper.createProgram(gl);
    if (!this.program) {
      console.log("Error creating program");
      return false;
    }
    gl.useProgram(this.program);
    this.maxValLoc = gl.getUniformLocation(this.program, "maxVal");
    this.minValLoc = gl.getUniformLocation(this.program, "minVal");
    this.numPointsLoc = gl.getUniformLocation(this.program, "numPoints");
    this.pointLoc = gl.getAttribLocation(this.program, "point");
    this.color = this.gl.getUniformLocation(this.program, "rgb");
    this.gl.uniform3fv(this.color, rgb);
    gl.vertexAttribPointer(this.pointLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.pointLoc);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  setUniform(uniform, val) {
    this.gl.uniform1f(uniform, val);
  }

  draw(data, scanBarPos, scanBarLength, cursorX, cursorY) {
    let lengthNorm = scanBarLength / this.gl.drawingBufferWidth;
    this.gl.useProgram(this.program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBuffer);
    this.gl.vertexAttribPointer(this.pointLoc, 2, this.gl.FLOAT, false, 0, 0);
    // Enable the attribute
    this.gl.enableVertexAttribArray(this.pointLoc);
    let rectData = [
      -1,
      scanBarPos,
      1,
      scanBarPos,
      1,
      scanBarPos + lengthNorm,
      -1,
      scanBarPos,
      1,
      scanBarPos + lengthNorm,
      -1,
      scanBarPos + lengthNorm,
    ];
    let indexArr = Array.from(Array(data.length).keys());
    let drawingData = data.reduce(function (arr, v, i) {
      return arr.concat(v, indexArr[i]);
    }, []);
    drawingData = drawingData.concat(rectData);
    drawingData = drawingData.concat([cursorY, cursorX]);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(drawingData),
      this.gl.STATIC_DRAW
    );
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, data.length);
    this.gl.drawArrays(this.gl.TRIANGLES, data.length, 6);
    this.gl.drawArrays(this.gl.POINT, data.length + 6, 1);
  }
}

export class IndicatorRenderer {
  gl;
  context;
  scanBarPos = 0;
  drawingData = [];
  dataSrc;
  minVal;
  maxVal;
  containerId;
  // for playing sound
  soundInterval = 1000;
  soundPlayer;
  soundHandler;
  //for zoom functionality
  mousedown = false;
  canvasX;
  canvasY;
  mouseX = 0;
  mouseY = 0;
  startX = 0;
  startY = 0;
  windowWidth; // for calculating point index
  zoomFn;

  constructor(parent, visualParam) {
    // let parent = document.getElementById(divId);
    // if (!parent) {
    //   throw "container not found!";
    // }
    const divId = parent.getAttribute("id");
    this.containerId = divId;
    this.context = visualParam;
    if (visualParam.soundInterval)
      this.soundInterval = visualParam.soundInterval;
    if (visualParam.soundPlayer) this.soundPlayer = visualParam.soundPlayer;
    var gl_canvas = document.createElement("canvas");
    // gl_canvas.setAttribute("id", divId + "_canvas");
    gl_canvas.style.backgroundColor = "#" + this.context.color;
    //canvas.style.position = 'absolute';
    // gl_canvas.style.width = '100%';
    // gl_canvas.style.height = '100%';
    gl_canvas.width = parent.offsetWidth;
    gl_canvas.height = parent.offsetHeight;
    gl_canvas.style.zIndex = "2";
    this.canvasX =
      gl_canvas.getBoundingClientRect().left +
      LayoutUtil.getElementRec(parent).x;
    this.canvasY =
      gl_canvas.getBoundingClientRect().top +
      LayoutUtil.getElementRec(parent).y;
    this.windowWidth = parent.offsetWidth;
    parent.appendChild(gl_canvas);

    // text canvas
    var text_canvas = document.createElement("canvas");
    text_canvas.setAttribute("id", divId + "text_canvas");
    text_canvas.style.position = "absolute";
    text_canvas.style.backgroundColor = "transparent";
    text_canvas.width = parent.offsetWidth;
    text_canvas.height = parent.offsetHeight;
    text_canvas.style.top = "0px";
    text_canvas.style.left = "0px";
    text_canvas.style.zIndex = "10";
    parent.appendChild(text_canvas);
    let ctx = text_canvas.getContext("2d");
    // add events handler
    text_canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.startX = parseInt(e.clientX - this.canvasX);
      this.startY = parseInt(e.clientY - this.canvasY);
      this.mousedown = true;
    });
    text_canvas.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.mouseX = parseInt(e.clientX - this.canvasX);
      this.mouseY = parseInt(e.clientY - this.canvasY);
      if (this.mousedown && this.mouseX - this.startX > 10) {
        ctx.clearRect(0, 0, text_canvas.width, text_canvas.height);

        let startIdx = Util.findClosestPoint(
          this.startX,
          this.windowWidth,
          this.context.WINDOW_POINTS
        );
        let endIdx = Util.findClosestPoint(
          this.mouseX,
          this.windowWidth,
          this.context.WINDOW_POINTS
        );
        let zoomData = this.drawingData.slice(startIdx, endIdx);
        this.zoomFn(
          zoomData,
          this.context.WINDOW_POINTS,
          this.minVal,
          this.maxVal,
          startIdx,
          endIdx
        );
        // console.log('canvas:','zoom x:', this.startX, ',y:', this.startY, 'end x:', this.mouseX, ',y:', this.mouseY, 'on canvas of size:', this.windowWidth, ',start closest:', startIdx, ', end closest:', endIdx);

        this.mousedown = false;
      }
      //this.resetMouseEvent();
    });
    text_canvas.addEventListener("mousemove", (e) => {
      e.preventDefault();
      this.mouseX = parseInt(e.clientX - this.canvasX);
      this.mouseY = parseInt(e.clientY - this.canvasY);
      var text_canvas = document.getElementById(divId + "text_canvas");
      if (this.mousedown) {
        // console.log(text_canvas.width,text_canvas.height);
        // var ctx = text_canvas.getContext('2d');
        ctx.clearRect(0, 0, text_canvas.width, text_canvas.height); //clear canvas
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.rect(
          this.startX,
          this.startY,
          this.mouseX - this.startX,
          this.mouseY - this.startY
        );
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
    // todo nhớ bật lại cái này
    // parent.addEventListener("mouseover", (e) => {
    //   e.preventDefault();
    //   let button_div = document.getElementById(divId + "_control_div");
    //   button_div.style.display = "block";
    // });
    // parent.addEventListener("mouseout", (e) => {
    //   e.preventDefault();
    //   let button_div = document.getElementById(divId + "_control_div");
    //   button_div.style.display = "none";
    // });
    this.gl = new GLWrapper(
      gl_canvas.getContext("webgl", { alpha: false, antialias: false }),
      Util.hex_2_rgb(this.context.color)
    );
  }

  resetMouseEvent() {
    this.mousedown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.startX = 0;
    this.startY = 0;
  }

  registerZoomFn(zoomFn) {
    this.zoomFn = zoomFn;
  }

  drawScene() {
    var self = this;
    let elem = this.dataSrc.splice(0, 1)[0];
    if (self.drawingData.length <= this.context.WINDOW_POINTS - 1) {
      self.drawingData.push(elem);
    } else {
      self.drawingData[this.scanBarPos] = elem;
    }
    this.scanBarPos = (this.scanBarPos + 1) % this.context.WINDOW_POINTS;
    let barPos = this.scanBarPos > 1 ? this.scanBarPos - 1 : this.scanBarPos;
    let posNorm = Util.scaleValue(barPos, 0, this.context.WINDOW_POINTS);
    this.gl.draw(
      self.drawingData,
      posNorm + this.context.WINDOW_POINTS + 1.1,
      this.context.scanBarLength,
      posNorm + this.context.WINDOW_POINTS + 4.0,
      elem
    );
    if (this.dataSrc.length > 0) {
      setTimeout(function () {
        self.drawScene();
      }, self.context.INTERVAL);
    } else {
      if (this.soundHandler) {
        clearInterval(this.soundHandler);
      }
    }
  }

  playAudio() {
    var self = this;
    if (this.soundPlayer) {
      this.soundHandler = setInterval(function () {
        self.soundPlayer.play();
      }, this.soundInterval);
    }
  }

  stopAudio() {
    if (this.soundHandler) clearInterval(this.soundHandler);
  }

  render() {
    if (!this.dataSrc) return;
    let maxVal = this.dataSrc.reduce((a, b) => Math.max(a, b), -Infinity);
    let minVal = this.dataSrc.reduce((a, b) => Math.min(a, b), Infinity);
    this.gl.setUniform(this.gl.maxValLoc, maxVal + 50);
    this.gl.setUniform(this.gl.minValLoc, minVal - 50);
    this.minVal = minVal - 50;
    this.maxVal = maxVal + 50;
    this.gl.setUniform(this.gl.numPointsLoc, this.context.WINDOW_POINTS);
    //loop to extract data and render it
    this.drawScene();
  }
}

// for handling zoom
class ZoomHandler {
  data;
  numPoints;
  minVal;
  maxVal;
  startIdx;
  endIdx;
  gl;
  width;
  height;
  mode = 1;

  vGridShaderSrc = `            
        attribute vec2 gridPoint;             
        uniform vec2 resolution;

        void main(void) {               
            float x = 2.0 * gridPoint[0] / resolution[0] - 1.0; 
            float y = 2.0 * gridPoint[1] / resolution[1] - 1.0;
            gl_Position = vec4(x, y, 0.0, 1.0);
            gl_PointSize = 10.0;
        }`;

  fGridShaderSrc = `  
        void main(void) {
            gl_FragColor = vec4(1.0, 0.2, 0.5, 0.6);               
        }`;

  v_shader_src = `
        uniform float numPoints; 
        uniform float maxVal;
        uniform float minVal;   
        attribute vec2 point;   
          
        void main(void) {           
            float y = 2.0 * (point[0] - minVal) / (maxVal - minVal) - 1.0;
            float x = 2.0 * point[1] / (numPoints-1.0) - 1.0; 
            gl_Position = vec4(x, y, 0.0, 1.0);  
            gl_PointSize = 4.0;          
        }`;

  f_shader_src = `  
        void main(void) {             
            gl_FragColor = vec4(0.0, 0.0,0.0,1.0);               
        }`;

  constructor(divId, data) {
    this.data = data;
    let parent = document.getElementById(divId);
    if (!parent) {
      throw "container not found!";
    }
    //create canvas
    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight - 80;
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "zoom-canvas");
    canvas.width = this.width;
    canvas.height = this.height - 20;
    parent.appendChild(canvas);
    // append
    this.gl = canvas.getContext("webgl");
    if (this.gl === null) {
      throw "Cannot initialize WebGL context";
    }
    let zoom_detail = document.createElement("div");
    zoom_detail.setAttribute("id", "zoom-detail");
    zoom_detail.style.width = this.width;
    zoom_detail.style.height = 80;
    zoom_detail.innerHTML = "<h3>Zoom details</h3>";
    parent.appendChild(zoom_detail);
  }

  render() {
    //console.log(this.data);
    this.gl.clearColor(211 / 255, 211 / 255, 211 / 255, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    // draw grid
    let gridPoints = Util.genGrid(this.width, this.height - 20, 50)[0];
    var vBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    // shaders
    var vGridShader = GLWrapper.createShader(
      this.gl,
      this.gl.VERTEX_SHADER,
      this.vGridShaderSrc
    );
    var fGridShader = GLWrapper.createShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      this.fGridShaderSrc
    );
    var gridProgram = this.gl.createProgram();
    this.gl.attachShader(gridProgram, vGridShader);
    this.gl.attachShader(gridProgram, fGridShader);
    this.gl.linkProgram(gridProgram);
    var linkOk = this.gl.getProgramParameter(gridProgram, this.gl.LINK_STATUS);
    if (!linkOk) {
      console.error("Link grid program:");
      return false;
    }
    this.gl.useProgram(gridProgram);
    // set uniform
    var resolutionLoc = this.gl.getUniformLocation(gridProgram, "resolution");
    this.gl.uniform2f(resolutionLoc, this.width, this.height - 20);
    //attribute
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(gridPoints),
      this.gl.STATIC_DRAW
    );
    var gridPointLoc = this.gl.getAttribLocation(gridProgram, "gridPoint");
    this.gl.vertexAttribPointer(gridPointLoc, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(gridPointLoc);
    this.gl.drawArrays(this.gl.LINES, 0, gridPoints.length / 2);
    //draw line
    var vChartShader = GLWrapper.createShader(
      this.gl,
      this.gl.VERTEX_SHADER,
      this.v_shader_src
    );
    var fChartShader = GLWrapper.createShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      this.f_shader_src
    );
    var chartProgram = this.gl.createProgram();
    this.gl.attachShader(chartProgram, vChartShader);
    this.gl.attachShader(chartProgram, fChartShader);
    this.gl.linkProgram(chartProgram);
    linkOk = this.gl.getProgramParameter(chartProgram, this.gl.LINK_STATUS);
    if (!linkOk) {
      console.error("Link chart program:");
      return false;
    }
    this.gl.useProgram(chartProgram);
    var maxValLoc = this.gl.getUniformLocation(chartProgram, "maxVal");
    var minValLoc = this.gl.getUniformLocation(chartProgram, "minVal");
    var numPointsLoc = this.gl.getUniformLocation(chartProgram, "numPoints");
    var pointLoc = this.gl.getAttribLocation(chartProgram, "point");

    if (this.mode == 0) {
      this.gl.uniform1f(numPointsLoc, this.numPoints);
      this.gl.uniform1f(maxValLoc, this.maxVal);
      this.gl.uniform1f(minValLoc, this.minVal);
    } else {
      this.gl.uniform1f(numPointsLoc, this.data.length);
      let maxVal = this.data.reduce((a, b) => Math.max(a, b), -Infinity);
      let minVal = this.data.reduce((a, b) => Math.min(a, b), Infinity);
      this.gl.uniform1f(maxValLoc, maxVal + 50);
      this.gl.uniform1f(minValLoc, minVal - 50);
    }
    this.gl.vertexAttribPointer(pointLoc, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(pointLoc);
    let indexArr = [];
    if (this.mode == 0) {
      for (var i = this.startIdx; i < this.endIdx; i++) {
        indexArr.push(i);
      }
    } else {
      for (var i = this.startIdx; i < this.endIdx; i++) {
        indexArr.push(i - this.startIdx);
      }
    }
    let drawingData = this.data.reduce(function (arr, v, i) {
      return arr.concat(v, indexArr[i]);
    }, []);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(drawingData),
      this.gl.STATIC_DRAW
    );
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.data.length);
    // this.gl.drawArrays(this.gl.POINT, 0, this.data.length/2);
  }

  cleanup() {
    console.log("Cleanup resources");
    this.gl.canvas.width = 1;
    this.gl.canvas.height = 1;
  }
}
