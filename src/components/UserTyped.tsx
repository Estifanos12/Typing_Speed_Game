import { useMemo } from "react";
import styled from "styled-components";

import { useThemeContext } from "../hooks/useTheme";
import Character from "./Character";

type UserTypedProps = {
  charTyped: string;
  check: (index: number) => boolean;
  word: string;
};

const StyledDiv = styled.div`
  &:last-child {
    &::after {
      background-color: ${({ theme }) => theme.text.secondary};
    }
  }
`;

const UserTyped = ({ check, charTyped, word }: UserTypedProps) => {
  const characters = useMemo(() => {
    return charTyped.split("");
  }, [charTyped]);

  const { systemTheme } = useThemeContext();

  return (
    <StyledDiv
      className="md:character absolute left-0 top-0 z-10 break-all font-mono text-xl lg:text-2xl"
      theme={systemTheme}
    >
      {characters.map((_, index) => {
        return (
          <Character
            key={index}
            character={word.charAt(index)}
            state={check(index)}
          />
        );
      })}
    </StyledDiv>
  );
};

export default UserTyped;
