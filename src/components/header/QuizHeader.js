import { useReactiveVar } from "@apollo/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../../apollo";
import useUser from "../../hooks/useUser";
import routes from "../../screens/routes";

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.bgColor};
`;

function QuizHeader() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <HeaderContainer>
      <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      <span>Exit</span>
    </HeaderContainer>
  );
}
export default QuizHeader;
