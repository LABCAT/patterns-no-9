import React, { useRef, useEffect } from "react";
import * as p5 from "p5";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {
      p.canvas = null;

      p.canvasWidth = window.innerWidth;

      p.canvasHeight = window.innerHeight;

      p.setup = () => {
        p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
        p.colorMode(p.HSB, 100, 100, 100, 1);
        p.background(0);
        p.frameRate(30);
        p.strokeWeight(p.height / 400);
      };

      p.xPos = p.canvasWidth / 2;

      p.yPos = p.canvasHeight / 2;

      p.shapeOptions = ["ellipse", "rect", "equilateral", "hexagon", "octagon"];

      p.draw = () => {
        p.translate(p.random(p.width), p.random(p.height));
        for (var i = 0; i < 16; i++) {
            let hue = p.random(100); 
            //let hue = p.map(i, 0, 15, 0, 100);;
            p.fill(hue, 100, 100, 0.2);
            p.stroke(hue, 100, 100);
            //p.rotate(p.PI / p.random([4, 8, 16, 32, 64]));
            p.rotate(p.PI /8);
            let shape = p.random(p.shapeOptions);
            p[shape](
                p.xPos - p.width / 2,
                p.yPos - p.height / 2,
                p.height / p.random(10, 40)
            );
        }

        p.xPos = p.xPos + p.height / p.random(10, 20);
        p.yPos = p.yPos + p.height / p.random(10, 20);
      };


      /*
       * function to draw an equilateral triangle with a set width
       * based on x, y co-oridinates that are the center of the triangle
       * @param {Number} x        - x-coordinate that is at the center of triangle
       * @param {Number} y      	- y-coordinate that is at the center of triangle
       * @param {Number} width    - radius of the hexagon
       */
      p.equilateral = (x, y, width) => {
        const x1 = x - width / 2;
        const y1 = y + width / 2;
        const x2 = x;
        const y2 = y - width / 2;
        const x3 = x + width / 2;
        const y3 = y + width / 2;
        p.triangle(x1, y1, x2, y2, x3, y3);
      };

      /*
       * function to draw a hexagon shape
       * adapted from: https://p5js.org/examples/form-regular-polygon.html
       * @param {Number} x        - x-coordinate of the hexagon
       * @param {Number} y      - y-coordinate of the hexagon
       * @param {Number} radius   - radius of the hexagon
       */
      p.hexagon = (x, y, radius) => {
        radius = radius / 2;
        p.angleMode(p.RADIANS);
        const angle = p.TWO_PI / 6;
        p.beginShape();
        for (var a = p.TWO_PI / 12; a < p.TWO_PI + p.TWO_PI / 12; a += angle) {
          let sx = x + p.cos(a) * radius;
          let sy = y + p.sin(a) * radius;
          p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
      };

      /*
       * function to draw a octagon shape
       * adapted from: https://p5js.org/examples/form-regular-polygon.html
       * @param {Number} x        - x-coordinate of the octagon
       * @param {Number} y      - y-coordinate of the octagon
       * @param {Number} radius   - radius of the octagon
       */
      p.octagon = (x, y, radius) => {
        radius = radius / 2;
        p.angleMode(p.RADIANS);
        const angle = p.TWO_PI / 8;
        p.beginShape();
        for (var a = p.TWO_PI / 16; a < p.TWO_PI + p.TWO_PI / 16; a += angle) {
          let sx = x + p.cos(a) * radius;
          let sy = y + p.sin(a) * radius;
          p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
      };

      p.updateCanvasDimensions = () => {
        p.canvasWidth = window.innerWidth;
        p.canvasHeight = window.innerHeight;
        p.createCanvas(p.canvasWidth, p.canvasHeight);
        p.redraw();
      };

      if (window.attachEvent) {
        window.attachEvent("onresize", function () {
          p.updateCanvasDimensions();
        });
      } else if (window.addEventListener) {
        window.addEventListener(
          "resize",
          function () {
            p.updateCanvasDimensions();
          },
          true
        );
      } else {
        //The browser does not support Javascript event binding
      }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
        </div>
    );
};

export default P5Sketch;
