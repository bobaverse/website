'use client';
import { Bodies, Body, Composite, Engine, Events, IEventCollision, Render, Runner, World } from 'matter-js'
import { useEffect, useRef, useState } from 'react'
import { useArcadeStore } from '@/components/store/arcade'
import { random } from 'utils/random'

import config from './config'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

enum GameState {
  Ready,
  Started,
  SureUp,
  Finalizing,
  Finished
}

const buttonText: Record<GameState, string> = {
  [GameState.Ready]: "Play",
  [GameState.Started]: "Waiting...",
  [GameState.SureUp]: "Mega Roll!",
  [GameState.Finalizing]: "Waiting...",
  [GameState.Finished]: "Reset",
}

const Game = () => {
  // #region States
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [engine, setEngine] = useState(Engine.create({}));
  const [balls, setBalls] = useState<Body[]>([]);
  const [bucketValues, setBucketValues] = useState<number[]>([1, 3, 5, 7, 9, 7, 5, 3, 1])
  const results = useArcadeStore(state => state.results);
  const addResult = useArcadeStore(state => state.addResult);
  const clearResults = useArcadeStore(state => state.clearResults);

  const [gameState, setGameState] = useState<GameState>(GameState.Ready);


  const finalScore = 169;

  const score = () => Object.values(results).reduce((o, a) => { o+=a; return o; }, 0)

  const onPlay = async () => {
    switch (gameState) {
      case GameState.Ready:
        setGameState(GameState.Started);
        await addBalls(19);
        break;
      case GameState.SureUp:
        setGameState(GameState.Finalizing);
        await addBalls(1);
        break;
      case GameState.Finished:

        clearResults();
        Composite.allBodies(engine.world).forEach((body) => {
          if (body.label.startsWith('ball')) {
            Composite.remove(engine.world, body);
          }
        });
        setBucketValues([1, 3, 5, 7, 9, 7, 5, 3, 1]);
        setGameState(GameState.Ready)
    }
  }

  useEffect(() => {
    if (gameState == GameState.Started && Object.keys(results).length == 19) {
      setGameState(GameState.SureUp);
      return;
    }
    if (gameState == GameState.Finalizing && Object.keys(results).length == 20) {
      setGameState(GameState.Finished);
      return;
    }
    if (gameState == GameState.Finished) {
      const tempScore = score() - results['ball-19'];
      const finalBall = finalScore - tempScore;
      if (results['ball-19'] !== finalBall) {
        setBucketValues(Array.from(Array(9).fill(finalBall)))
        addResult('ball-19', finalBall);
      }
    }
  }, [gameState, results])

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (gameState == GameState.Finalizing && Object.keys(results).length == 19) {
      interval = setInterval(() => {
        if (!('ball-19' in results)) {
          setBucketValues(Array.from(Array(9)).map(() => random(10, 100)))
        }
      }, 100)
    }
    return () => {
      clearInterval(interval)
    }
  }, [gameState, results]);

  const addBalls = async (count: number) => {
    for (let i = 0; i < count; i++) {
      const id = count === 1 ? 19 : i;
      const minBallX = 50
      const maxBallX = config.world.width - 50

      const ballX = random(minBallX, maxBallX)
      const ballColor = id == 19 ? "#be7901" : "#E234d2"
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
      setBalls([...balls, ball])
      Composite.add(engine.world, ball)
      await sleep(100)
    }
  }
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

  async function onBodyCollision(event: IEventCollision<Engine>) {
    const pairs = event.pairs
    for (const pair of pairs) {
      const { bodyA, bodyB: ball } = pair
      if (ball.label.includes('ball') && bodyA.label.includes('floor')) {
        if (!(ball.label in results)) {
          const binWidth = config.world.width / config.bins.count;
          const finalBin = Math.floor(ball.position.x / binWidth);
          const value = bucketValues[finalBin];
          addResult(ball.label, value)
        }

      }
    }
  }
  Events.on(engine, "collisionStart", onBodyCollision);
  return (
    <div className="flex flex-col justify-center justify-center gap-4">
      <div ref={boxRef} className="relative w-[650px] h-[750px]">
        <canvas ref={canvasRef} className="absolute left-0 top-0" />
        <div className="absolute top-[10px] left-[20px] z-20 pointer-events-none">
                <span>Score: {score()}</span>
        </div>
        <div className="absolute top-[700px] w-full z-20 flex pointer-events-none">
          {bucketValues.map((v, i) => (
            <div key={i} className="w-[72px] text-center">
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onPlay}
        className="hidden rounded-md bg-purple py-2 font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary disabled:bg-gray-500 md:visible md:block"
        disabled={gameState == GameState.Started || gameState == GameState.Finalizing}
      >
        {buttonText[gameState]}
      </button>

    </div>
  )
}

export default Game;