//layout util
class LayoutUtil {
  static createGLContainer(parent_div_id, callback) {
    let parent_div = document.getElementById(parent_div_id);
    //button at top left
    let button_div = document.createElement("div");
    parent_div.addEventListener("mouseover", function handleMouseOver() {
      button_div.style.display = "block";
    });
    parent_div.addEventListener("mouseout", function handleMouseOver() {
      button_div.style.display = "none";
    });
    button_div.style.backgroundColor = "cyan";
    button_div.style.position = "absolute";
    button_div.style.display = "none";
    button_div.style.top = 0;
    button_div.style.left = 0;
    let button_elem = document.createElement("button");
    button_elem.setAttribute("id", parent_div_id + "-max-button");
    button_elem.innerHTML = "Expand";
    button_elem.onclick = function () {
      callback(parent_div_id + "-max-button");
    };
    button_div.appendChild(button_elem);
    parent_div.appendChild(button_div);
  }
}

// general
class Util {
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
                float x = point[1] - numPoints - 1.1; 
                gl_Position = vec4(x, point[0], 0.0, 1.0); 
                f_color = vec4(0.0, 0.0, 0.0, 0.1);
            } 
        }`;

  static f_shader_src = `   
        varying mediump vec4 f_color;

        void main(void) {
            gl_FragColor = f_color;               
        }`;

  static hex_2_rgb(hex_val) {
    if (hex_val.length != 6) {
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

  static createShader(gl, shader_type, shader_src) {
    if (
      !(shader_type == gl.VERTEX_SHADER) &&
      !(shader_type == gl.FRAGMENT_SHADER)
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
    let vertShader = Util.createShader(gl, gl.VERTEX_SHADER, Util.v_shader_src);
    let fragShader = Util.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      Util.f_shader_src
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
}

//WebGl
class GLWrapper {
  gl;
  program;
  numPointsLoc;
  pointLoc;
  vBuffer;

  constructor(gl, rgb) {
    this.gl = gl;
    // vertex buffers
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.program = Util.createProgram(gl);
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

  draw(data, scanBarPos, scanBarLength) {
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
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(drawingData),
      this.gl.STATIC_DRAW
    );
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, data.length);
    this.gl.drawArrays(this.gl.TRIANGLES, data.length, 6);
  }
}

export class IndicatorRenderer {
  gl;
  context;
  scanBarPos = 0;
  drawingData = [];
  //added on 28 Nov 2022
  dataSrc;

  constructor(parent, visualParam) {
    if (!parent) {
      throw "contained not found!";
    }
    this.context = visualParam;
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", divId + "_canvas");
    canvas.style.backgroundColor = "#" + this.context.color;
    //canvas.style.position = 'absolute';
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    parent.appendChild(canvas);
    this.gl = new GLWrapper(
      canvas.getContext("webgl", { alpha: false, antialias: false }),
      Util.hex_2_rgb(this.context.color)
    );
  }

  drawScene(data) {
    var self = this;
    var chunk = data.splice(0, this.context.STEP).reverse();
    this.drawingData = chunk.concat(this.drawingData);
    this.scanBarPos += self.context.STEP;
    if (this.scanBarPos >= this.context.WINDOW_POINTS) {
      this.scanBarPos = this.context.WINDOW_POINTS;
    }
    if (this.drawingData.length > this.context.WINDOW_POINTS) {
      let trunc_length = this.drawingData.length - this.context.WINDOW_POINTS;
      this.drawingData.splice(
        this.drawingData.length - trunc_length,
        trunc_length
      );
    }
    let barPos = this.scanBarPos > 1 ? this.scanBarPos - 1 : this.scanBarPos;
    let posNorm = Util.scaleValue(barPos, 0, this.context.WINDOW_POINTS);
    //console.log('real pos:', this.scanBarPos,', norm:', posNorm, this.drawingData);
    this.gl.draw(
      self.drawingData,
      posNorm + this.context.WINDOW_POINTS + 1.1,
      this.context.scanBarLength
    );
    if (this.scanBarPos >= this.context.WINDOW_POINTS) {
      this.scanBarPos = 0;
    }
    if (data.length > 0) {
      setTimeout(function () {
        self.drawScene(data);
      }, self.context.INTERVAL);
    }
  }

  render(data) {
    let maxVal = data.reduce((a, b) => Math.max(a, b), -Infinity);
    let minVal = data.reduce((a, b) => Math.min(a, b), Infinity);
    this.gl.setUniform(this.gl.maxValLoc, maxVal + 50);
    this.gl.setUniform(this.gl.minValLoc, minVal - 50);
    this.gl.setUniform(this.gl.numPointsLoc, this.context.WINDOW_POINTS);
    //loop to extract data and render it
    this.drawScene(data);
  }

  renderSrc() {
    if (this.dataSrc) {
      let maxVal = this.dataSrc.reduce((a, b) => Math.max(a, b), -Infinity);
      let minVal = this.dataSrc.reduce((a, b) => Math.min(a, b), Infinity);
      this.gl.setUniform(this.gl.maxValLoc, maxVal + 50);
      this.gl.setUniform(this.gl.minValLoc, minVal - 50);
      this.gl.setUniform(this.gl.numPointsLoc, this.context.WINDOW_POINTS);
      //loop to extract data and render it
      this.drawScene(this.dataSrc);
    }
  }
}
