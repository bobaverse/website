'use client';
import { Bodies, Body, Composite, Engine, Events, IEventCollision, Render, Runner, World } from 'matter-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/components/store/arcade'
import { random } from 'utils/random'

import { LinesType, MultiplierValues } from '@/interfaces/plinko'
import config from './config'
import {
  getMultiplierByLinesQnt,
  getMultiplierSound
} from './multipliers'

interface MultiplierHistoryProps {
  multiplierHistory: number[]
}
export function MultiplierHistory({
                                    multiplierHistory
                                  }: MultiplierHistoryProps) {
  return (
    <div className="absolute right-4 top-40 flex w-16 flex-col gap-1 overflow-hidden rounded-md bg-background md:top-60">
      {multiplierHistory.map((multiplier, index) => {
        if (index > 3 || !multiplier) return null
        return (
          <span
            key={`${multiplier}${index}${Math.random()}`}
            className="flex items-center justify-center bg-purpleDark p-1 font-bold text-text"
          >
            {multiplier}x
          </span>
        )
      })}
    </div>
  )
}

function PlinkoGameBody() {
  return <div id="plinko" />
}

export function Game() {
  // #region States
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [engine, setEngine] = useState(Engine.create({}))
  const inGameBallsCount = useGameStore(state => state.gamesRunning)
  const incrementInGameBallsCount = useGameStore(
    state => state.incrementGamesRunning
  )
  const decrementInGameBallsCount = useGameStore(
    state => state.decrementGamesRunning
  )
  const [results, setResults] = useState<{[ball: string]: number}>({});
  const [ballCount, setBallCount] = useState<number>(0)
  //const [lastMultipliers, setLastMultipliers] = useState<number[]>([])
  //const {
  //  pins: pinsConfig,
  //  ball: ballConfig,
  //  engine: engineConfig,
  //  world: worldConfig
  //} = config
//
  //const worldWidth: number = worldConfig.width
//
  //const worldHeight: number = worldConfig.height
  //// #endregion
//
  //useEffect(() => {
  //  if (!canvasRef.current || !boxRef.current) {
  //    return;
  //  }
  //  const engine = Engine.create({});
  //  engine.gravity.y = engineConfig.engineGravity
  //  const render = Render.create({
  //    element: boxRef.current,
  //    canvas: canvasRef.current,
  //    bounds: {
  //      max: {
  //        y: worldHeight,
  //        x: worldWidth
  //      },
  //      min: {
  //        y: 0,
  //        x: 0
  //      }
  //    },
  //    options: {
  //      background: "#686868",
  //      hasBounds: true,
  //      width: worldWidth,
  //      height: worldHeight,
  //      wireframes: false
  //    },
  //    engine
  //  })
  //  const runner = Runner.create()
  //  Runner.run(runner, engine)
  //  Render.run(render)
  //  return () => {
  //    World.clear(engine.world, true)
  //    Engine.clear(engine)
  //    render.canvas.remove()
  //    render.textures = {}
  //  }
  //}, [lines])
//
  //const pins: Body[] = []
//
  //for (let l = 0; l < lines; l++) {
  //  const linePins = pinsConfig.startPins + l
  //  const lineWidth = linePins * config.pins.gap
  //  for (let i = 0; i < linePins; i++) {
  //    const pinX =
  //      worldWidth / 2 -
  //      lineWidth / 2 +
  //      i * config.pins.gap +
  //      config.pins.gap / 2
//
  //    const pinY =
  //      worldWidth / lines + l * config.pins.gap + config.pins.gap
//
  //    const pin = Bodies.circle(pinX, pinY, config.pins.size, {
  //      label: `pin-${i}`,
  //      render: {
  //        fillStyle: '#F5DCFF'
  //      },
  //      isStatic: true
  //    })
  //    pins.push(pin)
  //  }
  //}
//
  //function addInGameBall() {
  //  if (inGameBallsCount > 15) return
  //  incrementInGameBallsCount()
  //}
//
  //function removeInGameBall() {
  //  decrementInGameBallsCount()
  //}
//
  //const addBall = useCallback(
  //  (ballValue: number) => {
  //    addInGameBall()
  //    const ballSound = new Audio("/sounds/ball.wav")
  //    ballSound.volume = 0.2
  //    ballSound.currentTime = 0
  //    ballSound.play()
//
  //    const minBallX =
  //      worldWidth / 2 - config.pins.size * 3 + config.pins.gap
  //    const maxBallX =
  //      worldWidth / 2 -
  //      config.pins.size * 3 -
  //      config.pins.gap +
  //      config.pins.gap / 2
//
  //    const ballX = random(minBallX, maxBallX)
  //    const ballColor = ballValue <= 0 ? "#FFF" : "#E234d2"
  //    const ball = Bodies.circle(ballX, 20, ballConfig.ballSize, {
  //      restitution: 1,
  //      friction: 0.6,
  //      label: `ball-${ballValue}`,
  //      id: new Date().getTime(),
  //      frictionAir: 0.05,
  //      collisionFilter: {
  //        group: -1
  //      },
  //      render: {
  //        fillStyle: ballColor
  //      },
  //      isStatic: false
  //    })
  //    Composite.add(engine.world, ball)
  //  },
  //  [lines]
  //)
//
  //const leftWall = Bodies.rectangle(
  //  worldWidth / 3 - config.pins.size * config.pins.gap - config.pins.gap,
  //  worldWidth / 2 - config.pins.size,
  //  worldWidth * 2,
  //  40,
  //  {
  //    angle: 90,
  //    render: {
  //      visible: false
  //    },
  //    isStatic: true
  //  }
  //)
  //const rightWall = Bodies.rectangle(
  //  worldWidth -
  //  config.pins.size * config.pins.gap -
  //  config.pins.gap -
  //  config.pins.gap / 2,
  //  worldWidth / 2 - config.pins.size,
  //  worldWidth * 2,
  //  40,
  //  {
  //    angle: -90,
  //    render: {
  //      visible: false
  //    },
  //    isStatic: true
  //  }
  //)
  //const floor = Bodies.rectangle(0, worldWidth + 10, worldWidth * 10, 40, {
  //  label: 'block-1',
  //  render: {
  //    visible: false
  //  },
  //  isStatic: true
  //})
//
  //const multipliers = getMultiplierByLinesQnt(lines)
//
  //const multipliersBodies: Body[] = []
//
  //let lastMultiplierX: number =
  //  worldWidth / 2 - (config.pins.gap / 2) * lines - config.pins.gap
//
  //multipliers.forEach(multiplier => {
  //  const blockSize = 20 // height and width
  //  const multiplierBody = Bodies.rectangle(
  //    lastMultiplierX + 20,
  //    worldWidth / lines + lines * config.pins.gap + config.pins.gap,
  //    blockSize,
  //    blockSize,
  //    {
  //      label: multiplier.label,
  //      isStatic: true,
  //      render: {
  //        sprite: {
  //          xScale: 1,
  //          yScale: 1,
  //          texture: multiplier.img
  //        }
  //      }
  //    }
  //  )
  //  lastMultiplierX = multiplierBody.position.x
  //  multipliersBodies.push(multiplierBody)
  //})
//
  //Composite.add(engine.world, [
  //  ...pins,
  //  ...multipliersBodies,
  //  leftWall,
  //  rightWall,
  //  floor
  //])
//
  //function bet(betValue: number) {
  //  addBall(betValue)
  //}
//
  //async function onCollideWithMultiplier(ball: Body, multiplier: Body) {
  //  ball.collisionFilter.group = 2
  //  World.remove(engine.world, ball)
  //  removeInGameBall()
  //  const ballValue = ball.label.split('-')[1]
  //  const multiplierValue = +multiplier.label.split('-')[1] as MultiplierValues
//
  //  const multiplierSong = new Audio(getMultiplierSound(multiplierValue))
  //  multiplierSong.currentTime = 0
  //  multiplierSong.volume = 0.2
  //  multiplierSong.play()
  //  setLastMultipliers(prev => [multiplierValue, prev[0], prev[1], prev[2]])
//
  //  if (+ballValue <= 0) return
//
  //  const newBalance = +ballValue * multiplierValue
  //  // await incrementCurrentBalance(newBalance)
  //}
  //async function onBodyCollision(event: IEventCollision<Engine>) {
  //  const pairs = event.pairs
  //  for (const pair of pairs) {
  //    const { bodyA, bodyB } = pair
  //    if (bodyB.label.includes('ball') && bodyA.label.includes('block'))
  //      await onCollideWithMultiplier(bodyB, bodyA)
  //  }
  //}
//
  //Events.on(engine, 'collisionActive', onBodyCollision)

  const addBall = useCallback(
    () => {
      const id = ballCount + 1;
      setBallCount(id);
      const ballSound = new Audio("/sounds/ball.wav")
      ballSound.volume = 0.2
      ballSound.currentTime = 0
      ballSound.play()

      const minBallX = 50
      const maxBallX = config.world.width - 50

      const ballX = random(minBallX, maxBallX)
      const ballColor = id <= 0 ? "#FFF" : "#E234d2"
      const ball = Bodies.circle(ballX, 20, config.ball.size, {
        restitution: 1,
        friction: 0.6,
        label: `ball-${id}`,
        id: new Date().getTime(),
        frictionAir: 0.05,
        collisionFilter: {
          group: -1
        },
        render: {
          fillStyle: ballColor
        },
        isStatic: false
      })
      Composite.add(engine.world, ball)
    },
    [ballCount]
  )

  useEffect(() => {
    if (!canvasRef.current || !boxRef.current) {
      return;
    }


    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      bounds: {
        max: {
          y: config.world.height,
          x: config.world.width
        },
        min: {
          y: 0,
          x: 0
        }
      },
      options: {
        width: config.world.width,
        height: config.world.height,
        background: '#686868',
        wireframes: false
      }
    });

    const leftWall = Bodies.rectangle(
      0,
      config.world.height / 2,
      config.world.height,
      10,
      {
        angle: 1.5708,
        render: {
          fillStyle: '#FFFFFF',
          visible: true
        },
        isStatic: true
      }
    )
    const rightWall = Bodies.rectangle(
      config.world.width,
      config.world.height / 2,
      config.world.height,
      10,
      {
        angle: 1.5708,
        render: {
          fillStyle: '#FFFFFF',
          visible: true
        },
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
        render: {
          fillStyle: '#ffffff',
          visible: true
        },
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
          render: {
            fillStyle: '#ffffff',
          },
          isStatic: true
        }
      )
      bins.push(bin)
    }

    Composite.add(engine.world, [
      ...bins,
      ...pins,
      leftWall,
      rightWall,
      floor,
    ]);

    Runner.run(engine);
    Render.run(render);
  }, []);
  const bucketValues = [1, 3, 5, 7, 9, 7, 5, 3, 1];

  async function onBodyCollision(event: IEventCollision<Engine>) {
    const pairs = event.pairs
    for (const pair of pairs) {
      const { bodyA, bodyB: ball } = pair
      if (ball.label.includes('ball') && bodyA.label.includes('floor')) {
        if (!(ball.label in results)) {
          const binWidth = config.world.width / config.bins.count;
          const finalBin = Math.floor(ball.position.x / binWidth);
          const value = bucketValues[finalBin];
          setResults({...results, [ball.label]: value })
        }

      }
    }
  }
  console.log(results)
  Events.on(engine, "collisionStart", onBodyCollision);
  return (
    <div className="flex flex-col justify-center justify-center gap-4">
      <div ref={boxRef} className="relative w-[650px] h-[750px]">
        <canvas ref={canvasRef} className="absolute left-0 top-0" />
        <div className="absolute top-[700px] w-full z-20 flex pointer-events-none">
          {bucketValues.map((v, i) => (
            <div key={i} className="w-[72px] text-center">
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => addBall()}
        className="hidden rounded-md bg-purple py-2 font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary disabled:bg-gray-500 md:visible md:block"
      >
        Play
      </button>
      <span>Score: {Object.values(results).reduce((o, a) => {
        o+=a;
        return o;
      }, 0)}</span>
    </div>
  )
}