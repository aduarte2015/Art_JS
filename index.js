const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  // Generate a color palette
  const palette = random.pick(palettes);

  // Create an array to hold our shapes
  const shapes = [];

  // Generate random shapes
  const numShapes = 100;
  for (let i = 0; i < numShapes; i++) {
    // Randomly choose a shape type (circle, rectangle, or triangle)
    const shapeType = random.pick(['circle', 'rectangle', 'triangle']);

    // Randomize position
    const x = random.range(0, width);
    const y = random.range(0, height);

    // Randomize size
    const size = random.range(10, 200);

    // Randomize color
    const fill = random.pick(palette);

    // Add the shape to the array
    shapes.push({ x, y, size, fill, type: shapeType });
  }

  // Return the render function
  return ({ context, width, height, time }) => {
    // Clear the canvas
    context.clearRect(0, 0, width, height);

    // Draw shapes
    shapes.forEach((shape) => {
      context.beginPath();

      switch (shape.type) {
        case 'circle':
          context.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
          break;
        case 'rectangle':
          context.rect(
            shape.x - shape.size / 2,
            shape.y - shape.size / 2,
            shape.size,
            shape.size
          );
          break;
        case 'triangle':
          context.moveTo(shape.x, shape.y - shape.size / 2);
          context.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
          context.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
          context.closePath();
          break;
      }

      context.fillStyle = shape.fill;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
