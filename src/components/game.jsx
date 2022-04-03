import { motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

import "../App.css";

import femaleIdle from "../assets/img/female_idle.svg";
import female_paper from "../assets/img/female_paper.svg";
import female_rock from "../assets/img/female_rock.svg";
import female_scissors from "../assets/img/female_scissors.svg";
import male_paper from "../assets/img/male_paper.svg";
import male_rock from "../assets/img/male_rock.svg";
import male_scissors from "../assets/img/male_scissors.svg";
import maleIdle from "../assets/img/male_idle.svg";
import rock_icon from "../assets/img/rock_icon.svg";
import paper_icon from "../assets/img/paper_icon.svg";
import scissors_icon from "../assets/img/scissors_icon.svg";
import random_icon from "../assets/img/random_icon.svg";
import restart from "../assets/img/restart.svg";
import result_cpu from "../assets/img/result_cpu.svg";
import result_user from "../assets/img/result_user.svg";
import user_hp_avatar from "../assets/img/user_hp_avatar.svg";
import cpu_hp_avatar from "../assets/img/cpu_hp_avatar.svg";
import rock_sound from "../assets/sound/rock.mp3";
import paper_sound from "../assets/sound/slap.mp3";
import scissors_sound from "../assets/sound/scissors.mp3";
import start_sound from "../assets/sound/start.mp3";
import confetti_sound from "../assets/sound/confetti.mp3";
import lose_sound from "../assets/sound/lose.mp3";

const Game = () => {
  const [userChoice, setUserChoice] = useState(maleIdle);
  const [computerChoice, setComputerChoice] = useState(femaleIdle);
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [maleImg, setMaleImg] = useState(maleIdle);
  const [femaleImg, setFemaleImg] = useState(femaleIdle);

  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [splash, setSplash] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  let rock_sfx = new Audio(rock_sound);
  let paper_sfx = new Audio(paper_sound);
  let scissors_sfx = new Audio(scissors_sound);
  let start_sfx = new Audio(start_sound);
  let confetti_sfx = new Audio(confetti_sound);
  let lose_sfx = new Audio(lose_sound);

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
    if (value === "scissors") {
      setMaleImg(male_scissors);
      if (randomChoice === "rock") {
        rock_sfx.play();
      } else if (randomChoice === "paper") {
        scissors_sfx.play();
      }
    } else if (value === "rock") {
      setMaleImg(male_rock);
      if (randomChoice === "paper") {
        paper_sfx.play();
      } else if (randomChoice === "scissors") {
        rock_sfx.play();
      }
    } else {
      setMaleImg(male_paper);
      if (randomChoice === "scissors") {
        scissors_sfx.play();
      } else if (randomChoice === "rock") {
        paper_sfx.play();
      }
    }
    console.log("choice user: " + value);
  };

  const randomClick = () => {
    const randomClick = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(randomClick);
    generateComputerChoice();
    if (randomClick === "scissors") {
      setMaleImg(male_scissors);
      if (randomChoice === "rock") {
        rock_sfx.play();
      } else if (randomChoice === "paper") {
        scissors_sfx.play();
      }
    } else if (randomClick === "rock") {
      setMaleImg(male_rock);
      if (randomChoice === "paper") {
        paper_sfx.play();
      } else if (randomChoice === "scissors") {
        rock_sfx.play();
      }
    } else {
      setMaleImg(male_paper);
      if (randomChoice === "scissors") {
        scissors_sfx.play();
      } else if (randomChoice === "rock") {
        paper_sfx.play();
      }
    }
    console.log("random user: " + randomClick);
  };

  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  const generateComputerChoice = () => {
    setComputerChoice(randomChoice);
    console.log("cpu " + randomChoice);
    if (randomChoice === "scissors") {
      setFemaleImg(female_scissors);
    } else if (randomChoice === "rock") {
      setFemaleImg(female_rock);
    } else {
      setFemaleImg(female_paper);
    }
  };
  const handleReset = () => {
    start_sfx.play();
    setGameOver(false);
    setUserPoints(0);
    setComputerPoints(0);
    setMaleImg(maleIdle);
    setFemaleImg(femaleIdle);
  };

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (userPoints <= 4 && computerPoints <= 4) {
      if (
        comboMoves === "scissorspaper" ||
        comboMoves === "rockscissors" ||
        comboMoves === "paperrock"
      ) {
        const updatedUserPoints = userPoints + 1;
        setUserPoints(updatedUserPoints);

        if (updatedUserPoints === 5) {
          setResult("You Win");
          const gameOff = true;
          setTimeout(() => {
            setGameOver(gameOff);
            confetti_sfx.play();
          }, 1000);
        }
      }

      if (
        comboMoves === "paperscissors" ||
        comboMoves === "scissorsrock" ||
        comboMoves === "rockpaper"
      ) {
        // computerPoints.current += 1
        const updatedComputerPoints = computerPoints + 1;
        setComputerPoints(updatedComputerPoints);

        if (updatedComputerPoints === 5) {
          setResult("You Lose");
          const gameOff = true;
          setTimeout(() => {
            setGameOver(gameOff);
            lose_sfx.play();
          }, 1000);
        }
      }
    }
  }, [computerChoice, userChoice]);
  return (
    <>
      {splash && (
        <div className="App">
          {!gameOver && (
            <>
              <div className="game">
                <div className="top">
                  <motion.img
                    key={computerChoice}
                    src={femaleImg}
                    alt=""
                    transition={{
                      ease: "easeOut",
                      duration: 0.5,
                    }}
                    initial={{ y: -200 }}
                    animate={{ y: -50 }}
                  />{" "}
                </div>
                <div className="bottom">
                  <motion.img
                    src={maleImg}
                    key={userChoice}
                    alt=""
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    initial={{ y: 200 }}
                    animate={{ y: 50 }}
                  />
                </div>
                <div className="ui">
                  <div className="ui-box">
                    <img
                      src={rock_icon}
                      alt=""
                      className="rock_icon"
                      onClick={() => handleClick(choices[0])}
                    />
                    <img
                      src={paper_icon}
                      alt=""
                      className="paper_icon"
                      onClick={() => handleClick(choices[1])}
                    />
                    <img
                      src={scissors_icon}
                      alt=""
                      className="scissors_icon"
                      onClick={() => handleClick(choices[2])}
                    />
                    <img
                      src={random_icon}
                      alt=""
                      className="random_icon"
                      onClick={() => randomClick()}
                    />
                  </div>
                </div>
              </div>
              <div className="score">
                {gameOver && <p>{result}</p>}
                <div className="hp-box-user">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp"
                      value={5 - computerPoints}
                      max="5"
                    ></progress>
                    <motion.img
                      src={user_hp_avatar}
                      className="user_hp_avatar"
                      alt=""
                      key={computerPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="hp-box-cpu">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp cpu"
                      value={5 - userPoints}
                      max="5"
                    ></progress>
                    <motion.img
                      src={cpu_hp_avatar}
                      className="cpu_hp_avatar"
                      alt=""
                      key={userPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {gameOver && (
            <motion.div
              className="result"
              animate={{ scale: 1.3 }}
              transition={{
                duration: 0.5,
              }}
            >
              {result === "You Win" && <ConfettiExplosion />}
              <motion.img
                src={result === "You Lose" ? result_user : result_cpu}
                alt=""
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                }}
                transition={{ duration: 1 }}
              />
              <p className="result-msg">{result}</p>
              <p className="result-score">
                {computerPoints} - {userPoints}
              </p>
              <motion.img
                src={restart}
                alt=""
                onClick={handleReset}
                animate={{ scale: [1, 1.2, 1.2, 1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          )}
        </div>
      )}
      {!splash && (
        <motion.div
          className="splash"
          initial={{ y: 1000 }}
          transition={{ duration: 1 }}
          animate={{ y: 0 }}
        >
          <motion.button
            onClick={() => {
              setSplash(true);
              start_sfx.play();
            }}
            animate={{
              rotate: [0, 0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1 }}
          >
            Start The Game!!
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default Game;
