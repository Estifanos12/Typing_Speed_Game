import { useContext } from "react";

import { BiTimer } from "react-icons/bi";

import { ThemeContext } from "../context/ThemeContext";
import { Theme } from "../types";

type TimeCategoryProps = {
  level: number;
  time: number;
  setTime: (value: number) => void;
  setLocalStorage: (key: string, value: number | Theme) => void;
  restart: () => void;
  increaseLevel: () => void;
  decreaseLevel: () => void;
};

const TimeCategory = ({
  level,
  time,
  setTime,
  restart,
  setLocalStorage,
  increaseLevel,
  decreaseLevel,
}: TimeCategoryProps) => {
  const { systemTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center gap-3">
      <BiTimer className="text-3xl" />
      <div
        className="rounded-xlg flex gap-4 pl-2 pr-2"
        style={{
          backgroundColor: systemTheme.background.secondary,
        }}
      >
        <button
          className={`category ${
            level === 30 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            decreaseLevel();
            restart();
          }}
          style={{
            color: level === 30 ? systemTheme.text.secondary : "",
          }}
        >
          Easy
        </button>
        <span
          className={`category ${
            time === 15000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(15000);
            setLocalStorage("time", 15000);
            restart();
          }}
          style={{
            color: time === 15000 ? systemTheme.text.secondary : "",
          }}
        >
          15s
        </span>
        <span
          className={`category ${
            time === 30000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(30000);
            setLocalStorage("time", 30000);
            restart();
          }}
          style={{
            color: time === 30000 ? systemTheme.text.secondary : "",
          }}
        >
          30s
        </span>
        <span
          className={`category ${
            time === 60000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(60000);
            setLocalStorage("time", 60000);
            restart();
          }}
          style={{
            color: time === 60000 ? systemTheme.text.secondary : "",
          }}
        >
          60s
        </span>
        <span
          className={`category ${
            time === 120000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(120000);
            setLocalStorage("time", 120000);
            restart();
          }}
          style={{
            color: time === 120000 ? systemTheme.text.secondary : "",
          }}
        >
          120s
        </span>
        <button
          className={`category ${
            level === 50 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            increaseLevel();
            restart();
          }}
          style={{
            color: level === 50 ? systemTheme.text.secondary : "",
          }}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default TimeCategory;
