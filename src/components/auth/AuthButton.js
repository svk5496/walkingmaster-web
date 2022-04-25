import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../screens/routes";

const AuthButton = styled.input`
  border: none;
  border-radius: 3px;

  margin-top: 12px;
  background-color: ${(props) => props.theme.secondary};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

export default AuthButton;
