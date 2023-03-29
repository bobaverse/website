// noinspection JSSuspiciousNameCombination
import { Bodies, Body } from "matter-js";
import config from "@/components/arcade/plinko/config";
import { random } from "@/utils/random";

export const makeBoardBodies = () => {
  const fillStyle = '#FFF'
  const visible = false;
  // noinspection JSSuspiciousNameCombination
  const leftWall = Bodies.rectangle(
    3,
    config.world.height / 2,
    config.world.height,
    20,
    {
      angle: 1.5708,
      render: { fillStyle, visible },
      isStatic: true
    }
  )

// noinspection JSSuspiciousNameCombination
  const rightWall = Bodies.rectangle(
    config.world.width - 3,
    config.world.height / 2,
    config.world.height,
    20,
    {
      angle: 1.5708,
      render: { fillStyle, visible },
      isStatic: true
    }
  )

  const floor = Bodies.rectangle(
    0,
    config.world.height - 6,
    config.world.width * 10,
    20,
    {
      label: 'floor',
      render: { fillStyle, visible },
      isStatic: true
    }
  )

  const pins: Body[] = []
  for (let l = 0; l < config.pins.lines; l++) {
    const even = l % 2 == 0;
    const ppl = even ? config.pins.min : config.pins.max;
    const lineWidth = ppl * config.pins.gap;
    for (let i = 0; i < ppl; i++) {
      const pinX = config.world.width / 2 - lineWidth / 2 + i * config.pins.gap + config.pins.gap / 2;
      const pinY = config.world.width / config.pins.lines + l * config.pins.gap
      const pin = Bodies.circle(pinX, pinY, config.pins.size, {
        label: `pin-${i}`,
        render: { fillStyle, visible },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  const leftBins: Body[] = []
  for (let i = 0; i < config.bins.count; i++) {
    const width = (config.world.width  - 30) / config.bins.count;
    const bin = Bodies.rectangle(
      width * i  + 20,
      config.world.height - 33,
      80,
      1,
      {
        label: `bin-${i}`,
        angle: 1.44,
        render: { fillStyle, visible },
        isStatic: true
      }
    )
    leftBins.push(bin)
  }

  const rightBins: Body[] = []
  for (let i = 0; i < config.bins.count; i++) {
    const width = (config.world.width  - 30) / config.bins.count;
    const bin = Bodies.rectangle(
      width * i  + 78,
      config.world.height - 33,
      80,
      1,
      {
        label: `bin-${i}`,
        angle: 1.72,
        render: { fillStyle, visible },
        isStatic: true
      }
    )
    rightBins.push(bin)
  }

  const leftWallTriangles: Body[] = []
  for (let i = 0; i < config.pins.lines; i++) {
    if (i % 2 == 1) {
      continue;
    }
    const triangle = Bodies.polygon(
      15,
      config.world.width / config.pins.lines + i * config.pins.gap,
      3,
      25,
      {
        angle: 3.14159,
        label: `wall-triangle-left-${i}`,
        isStatic: true,
        render: { fillStyle, visible },
      }
    )
    leftWallTriangles.push(triangle)
  }

  const rightWallTriangles: Body[] = []
  for (let i = 0; i < config.pins.lines; i++) {
    if (i % 2 == 1) {
      continue;
    }
    const triangle = Bodies.polygon(
      config.world.width - 15,
      config.world.width / config.pins.lines + i * config.pins.gap,
      3,
      25,
      {
        label: `wall-triangle-right-${i}`,
        isStatic: true,
        render: { fillStyle, visible },
      }
    )
    rightWallTriangles.push(triangle)
  }

  return [
    ...pins,
    ...leftBins,
    ...rightBins,
    ...leftWallTriangles,
    ...rightWallTriangles,
    leftWall,
    rightWall,
    floor
  ]
}

export const makeBall = (id: number) => {
  const minBallX = 50
  const maxBallX = config.world.width - 50

  const ballX = random(minBallX, maxBallX)
  const ballScale = 0.014

  const ballColorMap = ['Green', 'Pink', 'Purple', 'Red']
  return Bodies.circle(ballX, 20, config.ball.size, {
    restitution: 1,
    friction: 0.5,
    frictionAir: 0.05,
    label: `ball-${id}`,
    id: new Date().getTime(),
    render: {
      sprite: {
        texture: `/arcade/plinko/${id == 19 ? ballColorMap[3] : ballColorMap[Math.floor(random(0, 3))]}Ball.png`,
        xScale: ballScale,
        yScale: ballScale
      }
    },
    isStatic: false
  })
}