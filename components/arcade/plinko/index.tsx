'use client';
import { BobaVerseArcadeABI } from "@/assets/abi/BobaVerseArcade";
import PlinkoBoard from '@/assets/arcade/plinko/PlinkoBoard.png';
import PlinkoCups from '@/assets/arcade/plinko/PlinkoCups.png';
import { ballImagesMap, makeBall, makeBoardBodies } from "@/components/arcade/plinko/objects";
import PlinkoHighScore from "@/components/arcade/plinko/plinkoHighScore";
import Button from "@/components/buttons/Button";
import { useArcadeStore } from '@/components/store/arcade'
import { GameState } from "@/components/store/types";
import { ArcadeAddressMap } from "@/utils/blockchain/addresses";
import { BigNumber, utils } from "ethers";
import { Body, Composite, Engine, Events, IEventCollision, Render, Runner } from 'matter-js'
import Image from "next/image";
import { Loading, Notify } from "notiflix";
import { useEffect, useRef, useState } from 'react'
import { random } from 'utils/random'
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite, useWaitForTransaction
} from "wagmi";

import config from './config';

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
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);
  
  const [balls, setBalls] = useState<Body[]>([]);
  const [bucketValues, setBucketValues] = useState<number[]>([1, 3, 5, 7, 9, 7, 5, 3, 1])
  const results = useArcadeStore(state => state.results);
  const addResult = useArcadeStore(state => state.addResult);
  const clearResults = useArcadeStore(state => state.clearResults);
  const gameState = useArcadeStore(state => state.state);
  const setGameState = useArcadeStore(state => state.setState);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [finalScore, setFinalScore] = useState<number>(0);
  const [engine] = useState(Engine.create());

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
        setFinalScore(0);
        setBucketValues([1, 3, 5, 7, 9, 7, 5, 3, 1]);
        setGameState(GameState.Ready)
    }
  }

  useEffect(() => {
    if (gameState === GameState.Started && Object.keys(results).length === 19) {
      setGameState(GameState.SureUp);
      return;
    }
    if (gameState === GameState.Finalizing && Object.keys(results).length === 20) {
      setGameState(GameState.Finished);
      return;
    }
    if (gameState === GameState.Finished) {
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
    if (gameState === GameState.Finalizing && Object.keys(results).length === 19) {
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
    if (!boxRef.current) {
      return;
    }
    for (let i = 0; i < count; i++) {
      const ball = makeBall(count === 1 ? 19 : i, boxRef.current.clientWidth)
      setBalls([...balls, ball])
      Composite.add(engine.world, ball)
      await sleep(100)
    }
  }

  const onResize = () => {
    if (!canvasRef.current || !boxRef.current) {
      return;
    }

    engine.gravity.y = config.engine.gravity * boxRef.current.clientWidth / 650;
    Composite.clear(engine.world, false);
    Composite.add(engine.world, makeBoardBodies(boxRef.current.clientWidth, boxRef.current.clientHeight));
  }

  useEffect(() => {
    if (!canvasRef.current || !boxRef.current) {
      return;
    }

    window.addEventListener('resize', onResize);

    console.log(boxRef.current.clientWidth, boxRef.current.clientHeight)
    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      bounds: {
        max: {
          y: boxRef.current.clientHeight,
          x: boxRef.current.clientWidth
        },
        min: {
          y: 0,
          x: 0
        }
      },
      options: {
        width: boxRef.current.clientWidth,
        height: boxRef.current.clientHeight,
        background: 'transparent',
        wireframes: false,
        hasBounds: true,
      }
    });

    Composite.add(engine.world, makeBoardBodies(boxRef.current.clientWidth, boxRef.current.clientHeight));

    Runner.run(engine);
    Render.run(render);
    engine.gravity.y = config.engine.gravity * boxRef.current.clientWidth / 650;
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [engine]);

  useEffect(() => {
    if (!canvasRef.current || !boxRef.current) {
      return;
    }
    console.log(boxRef?.current?.clientWidth, boxRef?.current?.clientHeight)
    Composite.add(engine.world, makeBoardBodies(boxRef.current.clientWidth, boxRef.current.clientHeight));
  }, [boxRef.current]);

  const onBodyCollisionStart = async (event: IEventCollision<Engine>) => {
    const pairs = event.pairs
    for (const pair of pairs) {
      if (!boxRef.current) {
        return;
      }
      const { bodyA, bodyB: ball } = pair
      if (ball.label.includes('ball') && bodyA.label.includes('floor')) {
        if (!(ball.label in results)) {
          const binWidth = boxRef.current.clientWidth / config.bins.count;
          const finalBin = Math.floor(ball.position.x / binWidth);
          const value = bucketValues[finalBin];
          addResult(ball.label, value)
          setTimeout(() => Composite.remove(engine.world, ball), 1500)
        }
      }
    }
  }

  const {
    config: preparePlayConfig,
    isError: isPreparePlayError,
    error: preparePlayError
  } = usePrepareContractWrite({
    address: ArcadeAddressMap[chain?.id || 0],
    abi: BobaVerseArcadeABI,
    functionName: 'playPlinko',
    chainId: chain?.id,
    overrides: {
      value: utils.parseEther('0.01')
    }
  })

  const {
    data: writePlayData,
    write: writePlay,
  } = useContractWrite({
    ...preparePlayConfig,
    request: {
      ...preparePlayConfig.request,
      // Not ideal, but the current suggested way to fix the HC gas limit too low issue
      gasLimit: preparePlayConfig.request ? preparePlayConfig.request.gasLimit.mul(120).div(100) : BigNumber.from(0)
    },
    onSuccess: (tx) => {
      Loading.change("Waiting for 1 confirmation...");
      Notify.success(`TX: ${tx.hash.substring(0, 6)}...${tx.hash.substring(tx.hash.length - 4)}`);
    },
    onError: (error) => {
      Loading.remove();
      Notify.failure(`${error.message}`);
    }
  })

  useWaitForTransaction({
    hash: writePlayData?.hash,
    chainId: chain?.id,
    onError: (error) => {
      Loading.remove();
      if (error.message.startsWith('missing revert data')) {
        Notify.failure(`Hybrid Compute gas limit too low`);
      } else {
        Notify.failure(`${error.message}`);
      }
    }
  })
  useContractEvent({
    address: ArcadeAddressMap[chain?.id || 0],
    abi: BobaVerseArcadeABI,
    eventName: 'PlinkoResult',
    chainId: chain?.id,
    listener: (sender, ballLocations, score) => {
      if (sender === address) {
        setFinalScore(score.toNumber());
        Loading.remove();
        onPlay();
      }
    }
  })

  const onPrePlay = async () => {
    if (writePlay) {
      Loading.hourglass("Waiting for wallet response...");
      writePlay()
    }
  }


  Events.on(engine, "collisionStart", onBodyCollisionStart);
  return (
    <div className="flex flex-col justify-center gap-y-2">
      <div ref={boxRef} className="relative w-full h-full">
        <div id="ball-image-preload" className="absolute top-0 left-0 -z-10">
          {Object.entries(ballImagesMap).map(([key, image]) => (
            <Image key={key} src={image} alt={key} width={32} height={32} />
          ))}
        </div>
        <Image src={PlinkoBoard} alt="plinkoBoard" height={window.innerHeight * 0.8} />
        <Image src={PlinkoCups} alt="plinkoCups" height={2000} className="absolute top-0 z-10 opacity-20" />
        <canvas id="plinkoCanvas" ref={canvasRef} className="absolute left-0 top-0" />
        <div
          className={
            "absolute bottom-cupNumbers w-full z-20 flex justify-center pointer-events-none text-cups text-cupsWide px-cupNumbers"
          }
        >
          {bucketValues.map((v, i) => (
            <div key={i} className="text-center bottom-cupNumbers w-full">
              <span className="w-full">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-black font-bold flex justify-between">
        <span>Current Score: {score()}</span>
        <PlinkoHighScore />
      </div>
      <Button
        onClick={gameState === GameState.Ready ? onPrePlay : onPlay}
        className="font-bold disabled:bg-gray-500 text-black"
        disabled={gameState === GameState.Ready ? (isPreparePlayError || !address) : gameState === GameState.Started || gameState === GameState.Finalizing}
      >
        {isPreparePlayError ? preparePlayError?.message : address ? buttonText[gameState] : 'Not Logged In'}
      </Button>
    </div>
  )
}

export default Game;