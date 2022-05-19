import styled from "styled-components";
import QuizHeader from "./header/QuizHeader";

const ContentContainer = styled.div``;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 1200px;
  width: 100%;
`;

function QuizLayout({ children }) {
  return (
    <ContentContainer>
      <QuizHeader></QuizHeader>

      <Content>{children}</Content>
    </ContentContainer>
  );
}

export default QuizLayout;
