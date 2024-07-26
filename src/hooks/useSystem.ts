import { useCallback, useState } from "react";

import { useCountdown } from "./useCountdown";
import { useKeyDown } from "./useKeyDown";
import { useLocalStorage } from "./useLocalStorage";
import { useModal } from "./useModal";
import { useWord } from "./useWord";

import {
  calculateAccuracy,
  calculateErrorPercentage,
  calculateWPM,
} from "../utils";

import type { Results } from "../types";
import type { HistoryType } from "../types";

export const useSystem = () => {
  const [results, setResults] = useState<Results>({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    error: 0,
  });
  const [history, setHistory] = useState<HistoryType>({
    wordHistory: "",
    typedHistory: "",
  });
  const [wordContainerFocused, setWordContainerFocused] = useState(false);
  const [level, setLevel] = useState<number>(30);
  const { word, updateWord, totalWord } = useWord(level);
  const { setLocalStorageValue, getLocalStorageValue } = useLocalStorage();
  const [time, setTime] = useState(() => getLocalStorageValue("time") || 15000);
  const { countdown, resetCountdown, startCountdown } = useCountdown(time);

  const {
    charTyped,
    typingState,
    cursorPosition,
    totalCharacterTyped,
    resetCharTyped,
    resetCursorPointer,
    setTotalCharacterTyped,
    setTypingState,
  } = useKeyDown(wordContainerFocused);
  const { modalIsOpen, aboutModal, openModal, closeModal } = useModal();

  const restartTest = useCallback(() => {
    resetCountdown();
    resetCursorPointer();
    resetCharTyped();
    setTypingState("idle");
    setTotalCharacterTyped("");
  }, [
    resetCountdown,
    resetCursorPointer,
    resetCharTyped,
    setTypingState,
    setTotalCharacterTyped,
  ]);

  const changeParagraph = () => {
    updateWord(true);
  };

  const increaseLevel = () => {
    updateWord();
    setLevel(50);
  };

  const decreaseLevel = () => {
    setLevel(30);
    updateWord();
  };

  const checkCharacter = useCallback(
    (index: number) => {
      if (charTyped[index] === word[index]) {
        return true;
      } else {
        return false;
      }
    },
    [charTyped, word]
  );

  if (word.length === charTyped.length) {
    updateWord();
    resetCharTyped();
    resetCursorPointer();
  }

  if (typingState === "start") {
    startCountdown();
    setTypingState("typing");
  }

  if (countdown === 0) {
    const { accuracy } = calculateAccuracy(totalWord, totalCharacterTyped);
    const { wpm, cpm } = calculateWPM(totalCharacterTyped, accuracy, time);
    const error = calculateErrorPercentage(accuracy);

    setResults({
      accuracy,
      wpm,
      cpm,
      error,
    });

    setHistory({
      wordHistory: totalWord,
      typedHistory: totalCharacterTyped,
    });

    openModal("result");
    restartTest();
  }

  return {
    level,
    charTyped,
    countdown,
    cursorPosition,
    modalIsOpen,
    aboutModal,
    results,
    time,
    history,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    setTime,
    resetCountdown,
    setLocalStorageValue,
    updateWord,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    changeParagraph,
    increaseLevel,
    decreaseLevel,
    setLevel,
  };
};
