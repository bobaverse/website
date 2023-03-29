'use client';
import { Body, Composite, Engine, Events, IEventCollision, Render, Runner } from 'matter-js'
import { useEffect, useRef, useState } from 'react'
import { useArcadeStore } from '@/components/store/arcade'
import { random } from 'utils/random'

import config from './config'
import { GameState } from "@/components/store/types";
import { makeBall, makeBoardBodies } from "@/components/arcade/plinko/objects";
import PlinkoBoard from '@/assets/arcade/plinko/PlinkoBoard.png';
import PlinkoCups from '@/assets/arcade/plinko/PlinkoCups.png';
import Image from "next/image";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


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
  
  const [balls, setBalls] = useState<Body[]>([]);
  const [bucketValues, setBucketValues] = useState<number[]>([1, 3, 5, 7, 9, 7, 5, 3, 1])
  const results = useArcadeStore(state => state.results);
  const addResult = useArcadeStore(state => state.addResult);
  const clearResults = useArcadeStore(state => state.clearResults);
  const gameState = useArcadeStore(state => state.state);
  const setGameState = useArcadeStore(state => state.setState);
  
  const [engine] = useState(Engine.create());
  engine.gravity.y = config.engine.gravity;
  const finalScore = 169;

  const score = () => Object.values(results).reduce((o, a) => { o+=a; return o; }, 0)

  const onPlay = async () => {
    switch (gameState) {
      case GameState.Ready:
        setGameState(GameState.Started);
        await addBalls(19);
        break;
      case GameState.SureUp:
        Composite.allBodies(engine.world).forEach((body) => {
          if (body.label.startsWith('ball')) {
            Composite.remove(engine.world, body);
          }
        });
        setGameState(GameState.Finalizing);
        await addBalls(1);
        break;
      case GameState.Finished:
        Composite.allBodies(engine.world).forEach((body) => {
          if (body.label.startsWith('ball')) {
            Composite.remove(engine.world, body);
          }
        });
        clearResults();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, results])

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (gameState == GameState.Finalizing && Object.keys(results).length == 19) {
      interval = setInterval(() => {
        if (!('ball-19' in results)) {
          setBucketValues(Array.from(Array(9)).map(() => Math.floor(random(10, 100))))
        }
      }, 100)
    }
    return () => {
      clearInterval(interval)
    }
  }, [gameState, results]);

  const addBalls = async (count: number) => {
    for (let i = 0; i < count; i++) {
      const ball = makeBall(count === 1 ? 19 : i)
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
        background: 'transparent',
        wireframes: false
      }
    });

    Composite.add(engine.world, makeBoardBodies());

    Runner.run(engine);
    Render.run(render);
  }, [engine]);

  const onBodyCollisionStart = async (event: IEventCollision<Engine>) => {
    const pairs = event.pairs
    for (const pair of pairs) {
      const { bodyA, bodyB: ball } = pair
      if (ball.label.includes('ball') && bodyA.label.includes('floor')) {
        if (!(ball.label in results)) {
          const binWidth = config.world.width / config.bins.count;
          const finalBin = Math.floor(ball.position.x / binWidth);
          const value = bucketValues[finalBin];
          addResult(ball.label, value)
          setTimeout(() => Composite.remove(engine.world, ball), 1500)
        }
      }
    }
  }

  Events.on(engine, "collisionStart", onBodyCollisionStart);
  return (
    <div className="flex flex-col justify-center justify-center gap-4">
      <div ref={boxRef} className="relative w-[650px] h-[750px]">
        <Image src={PlinkoBoard} alt="plinkoBoard" width={config.world.width} />
        <Image src={PlinkoCups} alt="plinkoCups" width={config.world.width} className="absolute top-0 z-10" />
        <canvas id="plinkoCanvas" ref={canvasRef} className="absolute left-0 top-0" />
        <div className="absolute top-[10px] left-[20px] z-20 pointer-events-none">
          <span>Score: {score()}</span>
        </div>
        <div className="absolute top-[700px] w-full px-3 z-20 flex pointer-events-none">
          {bucketValues.map((v, i) => (
            <div key={i} className="w-[72px] text-center">
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onPlay}
        className="rounded-full bg-button py-2 font-extrabold disabled:bg-gray-500 text-black"
        disabled={gameState == GameState.Started || gameState == GameState.Finalizing}
      >
        {buttonText[gameState]}
      </button>

    </div>
  )
}

export default Game;