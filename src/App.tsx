import { useDetectDevice } from "./hooks/useDetectDevice";
import { useSystem } from "./hooks/useSystem";
import { useThemeContext } from "./hooks/useTheme";

import AboutPage from "./components/About";
import Countdown from "./components/Countdown";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ModalComponent from "./components/Modal";
import ModalContent from "./components/ModalContent";
import TimeCategory from "./components/TimeCategory";
import UserTyped from "./components/UserTyped";
import WordContainer from "./components/WordContainer";
import WordWrapper from "./components/WordWrapper";
import MobileNotSupported from "./components/MobileNotSupported";
import Wordschange from "./components/Restart";

function App() {
  const { systemTheme } = useThemeContext();

  const {
    level,
    charTyped,
    countdown,
    word,
    wordContainerFocused,
    modalIsOpen,
    aboutModal,
    history,
    time,
    results,
    resetCountdown,
    setLocalStorageValue,
    setWordContainerFocused,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setTime,
    changeParagraph,
    increaseLevel,
    decreaseLevel,
  } = useSystem();
  const isMobile = useDetectDevice();

  return (
    <div
      className="h-screen w-full overflow-y-auto"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <main
        className=" mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"
        style={{}}
      >
        {isMobile ? (
          <MobileNotSupported />
        ) : (
          <>
            <Header
              restart={restartTest}
              openAboutModal={openModal}
              closeAboutModal={closeModal}
            />
            <TimeCategory
              level={level}
              time={time}
              setLocalStorage={setLocalStorageValue}
              setTime={setTime}
              restart={restartTest}
              increaseLevel={increaseLevel}
              decreaseLevel={decreaseLevel}
            />
            <Countdown countdown={countdown} reset={resetCountdown} />
            <WordWrapper
              focused={wordContainerFocused}
              setFocused={setWordContainerFocused}
            >
              <WordContainer word={word} />
              <UserTyped
                word={word}
                check={checkCharacter}
                charTyped={charTyped}
              />
            </WordWrapper>
            <Wordschange restart={restartTest} changeWords={changeParagraph} />
            <Footer />
            <ModalComponent
              type="result"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            >
              <ModalContent
                totalTime={time}
                results={results}
                history={history}
              />
            </ModalComponent>
            <ModalComponent
              type="about"
              isOpen={aboutModal}
              onRequestClose={closeModal}
            >
              <AboutPage />
            </ModalComponent>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
