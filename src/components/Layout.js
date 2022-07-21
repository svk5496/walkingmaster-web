import styled from "styled-components";
import Header from "./front/header/Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 20px;
  max-width: 1200px;
  width: 100%;
`;

function Layout({ children }) {
  return (
    <>
      <Header></Header>

      <Content>{children}</Content>
    </>
  );
}

export default Layout;
