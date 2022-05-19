import { isLoggedInvar } from "../apollo";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import React, { Children } from "react";

const SEEQUESTION_QUERY = gql`
  query seeQuestion($order: Int!) {
    seeQuestion(order: $order) {
      order
      isQ
      isMultipleChoice
      quiz
      hint
      isTwinkle
      picBefore
      picAfter
      comment1
      comment2
      comment3
      comment4
      answers {
        id
        answer
        explain
        picture
        keyValue
        skip
      }
    }
  }
`;

const QuizContainer = styled.div`
  padding-top: 30px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const WContentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const WQuestionText = styled.span`
  font-size: ${(props) => props.theme.fs_body1};
  margin-bottom: 20px;
`;

const WQuestionContainer = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

const WQuizButton = styled.div`
  width: 240px;
  height: 280px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 14px 20px;
  box-shadow: 4px 0px 15px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  span {
    padding: 8px 0px;
  }
`;

const WButtonImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  margin-bottom: 25px;
  border-radius: 15px 15px 0px 0px;
  pointer-events: none;
`;

const WCommentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: none;
`;

const WAnswerText = styled.span`
  font-size: ${(props) => props.theme.fs_body3};
  font-weight: ${(props) => props.theme.fw_bold};
  pointer-events: none;
`;

const WHintText = styled.span`
  font-size: ${(props) => props.theme.fs_body5};
  color: ${(props) => props.theme.fontGray};
  pointer-events: none;
`;

const WPictureBeforeContainer = styled.div`
  padding-top: 60px;
  width: 100%;
  height: 100%;
`;

const WPictureAfterContainer = styled.div`
  padding-top: 60px;
  width: 100%;
  height: 100%;
  display: none;
`;

const WPicture = styled.img`
  width: 600px;
  height: 450px;
  object-fit: contain;
  position: fixed;
  border-radius: 15px;
  box-shadow: 4px 0px 15px 0px rgba(0, 0, 0, 0.2);
  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }
  animation: blink-effect 2.5s linear infinite;
`;

const TContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ContinueContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContinueBt = styled.span`
  width: 200px;
  height: 50px;
  background-color: ${(props) => props.theme.bgGrayLight};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  cursor: default;
`;

function Quiz() {
  const isPc = useMediaQuery({
    query: "(min-width:1201px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:541px) and (max-width:1200px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:540px)",
  });

  const [page, setPage] = React.useState(1);

  const { loading, _, data } = useQuery(SEEQUESTION_QUERY, {
    variables: {
      order: page,
    },
  });
  console.log({ data });

  function hover(e) {
    console.log("mouseIn");
    e.target.parent.map(Children);
    e.target.style.opacity = "1";
  }
  function btClick(e) {
    console.log(e.target.parentElement);
    e.target.style.opacity = "0.5";
  }

  return (
    <div>
      {isPc ? (
        <QuizContainer>
          {loading ? null : (
            <WContentContainer>
              <WQuestionContainer>
                <WQuestionText>{data?.seeQuestion.quiz}</WQuestionText>
                <WButtonContainer>
                  {data?.seeQuestion.answers.map((answer) => (
                    <WQuizButton
                      key={answer.id}
                      onMouseEnter={hover}
                      onClick={btClick}
                    >
                      <WButtonImage src={answer.picture}></WButtonImage>
                      <WAnswerText>{answer.answer}</WAnswerText>
                      <WHintText>{answer.hint}</WHintText>
                    </WQuizButton>
                  ))}
                </WButtonContainer>
              </WQuestionContainer>
              <WCommentContainer>
                <span>여기에 코멘트</span>
              </WCommentContainer>
              <WPictureBeforeContainer>
                <WPicture src={data?.seeQuestion.picBefore}></WPicture>
              </WPictureBeforeContainer>
              <WPictureAfterContainer>
                <WPicture src={data?.seeQuestion.picAfter}></WPicture>
              </WPictureAfterContainer>
            </WContentContainer>
          )}

          <ContinueContainer>
            <ContinueBt>Continue</ContinueBt>
          </ContinueContainer>
        </QuizContainer>
      ) : isTablet ? (
        <TContentContainer>
          <span>tablet</span>
        </TContentContainer>
      ) : (
        <MContentContainer>
          <span>mobile</span>
        </MContentContainer>
      )}
    </div>
  );
}

export default Quiz;
