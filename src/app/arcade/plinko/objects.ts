// noinspection JSSuspiciousNameCombination
import { Bodies, Body } from "matter-js";
import config from "@/app/arcade/plinko/config";
import { random } from "@/utils/random";

export const makeBoardBodies = (worldWidth: number, worldHeight: number) => {
  const fillStyle = '#FFF'
  const visible = false;
  // noinspection JSSuspiciousNameCombination
  const leftWall = Bodies.rectangle(
    worldWidth * 0.01,
    worldHeight / 2,
    worldHeight,
    worldWidth * 0.02,
    {
      angle: 1.5708,
      render: { fillStyle, visible },
      isStatic: true
    }
  )

// noinspection JSSuspiciousNameCombination
  const rightWall = Bodies.rectangle(
    worldWidth - (worldWidth * 0.01),
    worldHeight / 2,
    worldHeight,
    worldWidth * 0.02,
    {
      angle: 4.71239,
      render: { fillStyle, visible },
      isStatic: true
    }
  )

  const floor = Bodies.rectangle(
    worldWidth / 2,
    worldHeight - (worldHeight * 0.02 / 2),
    worldWidth,
    worldHeight * 0.02,
    {
      label: 'floor',
      render: { fillStyle, visible },
      isStatic: true
    }
  )

  const pins: Body[] = []
  const pinGap = config.pins.gap * worldWidth / 650;
  for (let l = 0; l < config.pins.lines; l++) {
    const even = l % 2 === 0;
    const ppl = even ? config.pins.min : config.pins.max;
    const lineWidth = ppl * pinGap;
    for (let i = 0; i < ppl; i++) {
      // noinspection OverlyComplexArithmeticExpressionJS
      const pinX = worldWidth / 2 - lineWidth / 2 + i * pinGap + pinGap / 2;
      const pinY = worldWidth / config.pins.lines + l * pinGap
      const pin = Bodies.circle(pinX, pinY, config.pins.size * worldWidth / 650, {
        label: `pin-${i}`,
        render: { fillStyle, visible },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  const leftBins: Body[] = []
  for (let i = 0; i < config.bins.count; i++) {
    const bin = Bodies.rectangle(
      (worldWidth * 0.1066) * i + (worldWidth * 0.03),
      worldHeight - (worldHeight * 0.0975 / 2),
      worldHeight * 0.095,
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
    const bin = Bodies.rectangle(
      (worldWidth * 0.1066) * i + (worldWidth * 0.1166),
      worldHeight - (worldHeight * 0.0975 / 2),
      worldHeight * 0.095,
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
  for (let i = 0; i < config.pins.lines - 2; i++) {
    if (i % 2 === 0) {
      const triangle = Bodies.polygon(
        worldWidth * 0.025,
        worldWidth / config.pins.lines + i * pinGap,
        3,
        worldWidth * 0.04,
        {
          angle: 3.14159,
          label: `wall-triangle-left-${i}`,
          isStatic: true,
          render: { fillStyle, visible },
        }
      )
      leftWallTriangles.push(triangle)
    }
  }

  const rightWallTriangles: Body[] = []
  for (let i = 0; i < config.pins.lines - 2; i++) {
    if (i % 2 === 0) {
      const triangle = Bodies.polygon(
        worldWidth - (worldWidth * 0.025),
        worldWidth / config.pins.lines + i * pinGap,
        3,
        worldWidth * 0.04,
        {
          label: `wall-triangle-right-${i}`,
          isStatic: true,
          render: { fillStyle, visible },
        }
      )
      rightWallTriangles.push(triangle)
    }

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

export const makeBall = (id: number, worldWidth: number, ballLocation: number) => {
  const safeZone = worldWidth - (worldWidth * 0.05);
  let ballX = ballLocation * safeZone / 200 + (worldWidth * 0.025)
  // Invert every other ball;
  if (id % 2 === 0) {
    ballX = worldWidth - ballX;
  }
  const ballColorMap = ['Green', 'Pink', 'Purple', 'Red']
  return Bodies.circle(ballX, 20, config.ball.size, {
    restitution: 1,
    friction: 0.5,
    frictionAir: 0.05,
    label: `ball-${id}`,
    id: new Date().getTime(),
    render: {
      sprite: {
        texture: `/arcade/plinko/${id === 19 ? ballColorMap[3] : ballColorMap[Math.floor(random(0, 3))]}Ball.png`,
        xScale: 0.014 * worldWidth / 650,
        yScale: 0.014 * worldWidth / 650
      }
    },
    isStatic: false
  })
}

export const ballImagesMap = {
  green: '/arcade/plinko/GreenBall.png',
  pink: '/arcade/plinko/PinkBall.png',
  purple: '/arcade/plinko/PurpleBall.png',
  red: '/arcade/plinko/RedBall.png',
}
