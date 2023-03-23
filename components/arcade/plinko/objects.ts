// noinspection JSSuspiciousNameCombination
import { Bodies, Body } from "matter-js";
import config from "@/components/arcade/plinko/config";
import { random } from "@/utils/random";

export const makeBoardBodies = () => {
  const fillStyle = '#FFF'
  // noinspection JSSuspiciousNameCombination
  const leftWall = Bodies.rectangle(
    0,
    config.world.height / 2,
    config.world.height,
    10,
    {
      angle: 1.5708,
      render: {
        fillStyle: '#FFFFFF',
      },
      isStatic: true
    }
  )

// noinspection JSSuspiciousNameCombination
  const rightWall = Bodies.rectangle(
    config.world.width,
    config.world.height / 2,
    config.world.height,
    10,
    {
      angle: 1.5708,
      render: { fillStyle },
      isStatic: true
    }
  )

  const floor = Bodies.rectangle(
    0,
    config.world.height - 2,
    config.world.width * 10,
    10,
    {
      label: 'floor',
      render: { fillStyle },
      isStatic: true
    }
  )

  const pins: Body[] = []
  for (let l = 0; l < config.pins.lines; l++) {
    const even = l % 2 == 0;
    const ppl = even ? config.pins.max : config.pins.min;
    const lineWidth = ppl * config.pins.gap;
    for (let i = 0; i < ppl; i++) {
      const pinX = config.world.width / 2 - lineWidth / 2 + i * config.pins.gap + config.pins.gap / 2;
      const pinY = config.world.width / config.pins.lines + l * config.pins.gap
      const pin = Bodies.circle(pinX, pinY, config.pins.size, {
        label: `pin-${i}`,
        render: {
          fillStyle: '#F5DCFF'
        },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  const bins: Body[] = []
  for (let i = 0; i < config.bins.count; i++) {
    const width = config.world.width / config.bins.count;
    const bin = Bodies.rectangle(
      width * i,
      config.world.height - 20,
      80,
      5,
      {
        label: `bin-${i}`,
        angle: 1.5708,
        render: { fillStyle },
        isStatic: true
      }
    )
    bins.push(bin)
  }

  const leftWallTriangles: Body[] = []
  for (let i = 0; i < config.pins.lines; i++) {
    if (i % 2 == 0) {
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
        render: { fillStyle },
      }
    )
    leftWallTriangles.push(triangle)
  }

  const rightWallTriangles: Body[] = []
  for (let i = 0; i < config.pins.lines; i++) {
    if (i % 2 == 0) {
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
        render: { fillStyle },
      }
    )
    rightWallTriangles.push(triangle)
  }

  return [...bins, ...pins, ...leftWallTriangles, ...rightWallTriangles, leftWall, rightWall, floor]
}

export const makeBall = (id: number) => {
  const minBallX = 50
  const maxBallX = config.world.width - 50

  const ballX = random(minBallX, maxBallX)
  const ballColor = id == 19 ? "#be7901" : "#E234d2"
  return Bodies.circle(ballX, 20, config.ball.size, {
    restitution: 1,
    friction: 0.5,
    label: `ball-${id}`,
    id: new Date().getTime(),
    collisionFilter: {
      group: -1
    },
    render: {
      fillStyle: ballColor
    },
    isStatic: false
  })
}