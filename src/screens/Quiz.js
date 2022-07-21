import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import React, { Children, useEffect } from "react";
import { element } from "prop-types";
import { isLoggedInVar, logUserOut } from "../apollo";
import useUser from "../hooks/useUser";

const SEEQUESTION_QUERY = gql`
  query seeQuestion($order: Int!) {
    seeQuestion(order: $order) {
      order
      isQ
      isMultipleChoice
      quiz
      hint
      keyName
      isBlink
      isAnswerPic
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

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 1200px;
  width: 100%;
`;

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

const WQuizPicButton = styled.div`
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
  cursor: pointer;
  span {
    padding: 8px 0px;
  }
`;

const WQuizWoPicButton = styled.div`
  width: 240px;
  height: 60px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 14px 20px;
  box-shadow: 4px 0px 15px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  cursor: pointer;
  span {
    padding: 20px 0px;
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
  padding-top: 70px;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Comment1 = styled.span`
  font-size: ${(props) => props.theme.fs_subTitle2};
  animation: fadein 3s;
  opacity: 0;
  animation-fill-mode: forwards;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Comment2 = styled(Comment1)`
  animation-delay: 1s;
`;
const Comment3 = styled(Comment1)`
  animation-delay: 2s;
`;
const Comment4 = styled(Comment1)`
  animation-delay: 3s;
`;
const HiddenText = styled.span`
  color: ${(props) => props.theme.bgColorLight};
`;

const WHiddenText = styled.span`
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

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { userData } = useUser();
  useEffect(() => {
    const currentPg = localStorage.getItem("KEY_QUIZ_PAGE");
    if (currentPg > 1) {
      const cf = window.confirm(
        "이미 진행하신 이력이 있으시네요 ! 진행하던 페이지로 이동할까요?"
      );
      if (cf === true) {
        setPage(parseInt(currentPg));
      } else {
        setPage(1);
        localStorage.setItem("KEY_QUIZ_PAGE", 1);
      }
    }
  }, []);

  const [page, setPage] = React.useState(1);
  const [click, setClick] = React.useState(true);
  const [currentId, setCurrentId] = React.useState(0);
  const [skipPage, setSkipPage] = React.useState(0);
  const { loading, _, data } = useQuery(SEEQUESTION_QUERY, {
    variables: {
      order: page,
    },
  });
  console.log({ data });

  //마우스 들어갔을때
  function onMouseEnter(e) {
    if (!click) {
      const buttonArray = Array.from(e.target.parentElement.children);
      buttonArray.map((button) => (button.style.opacity = "0.5"));
      e.target.style.opacity = "1";
    } else {
      e.target.style.opacity = "1";
    }
  }

  //마우스 빠져나갔을때
  function onMouseLeave(e) {
    //클릭이 안되어있는 상태일때
    if (!click) {
      const buttonArray = Array.from(e.target.parentElement.children);
      buttonArray.map((button) => (button.style.opacity = "1"));
    }
    //클릭이 되어있다면
    else {
      if (e.target.id !== currentId) {
        e.target.style.opacity = "0.5";
      }
    }
  }

  function btClick(e) {
    const buttonArray = Array.from(e.target.parentElement.children);
    const keyName = e.target.children[0].innerText;
    const keyValue = e.target.children[1].innerText;
    buttonArray.map((button) => (button.style.opacity = "0.5"));
    e.target.style.opacity = "1";

    setCurrentId(e.target.id);
    if (e.target.id === currentId) {
      setClick(!click);
    } else {
      setClick(true);
    }
    localStorage.setItem(keyName, keyValue);
    setSkipPage(e.target.children[2].innerText);
  }

  if (click) {
    const continueBt = document.getElementById("continueBt");
    const beforePic = document.getElementById("beforePic");
    const afterPic = document.getElementById("afterPic");
    if (beforePic && afterPic && continueBt) {
      beforePic.style.display = "none";
      afterPic.style.display = "block";
      continueBt.style.backgroundColor = "#D3E357";
      continueBt.style.cursor = "pointer";
    }
  } else {
    const continueBt = document.getElementById("continueBt");
    const beforePic = document.getElementById("beforePic");
    const afterPic = document.getElementById("afterPic");
    //이미지가 로딩되는걸 기다려야함
    if (beforePic && afterPic && continueBt) {
      beforePic.style.display = "block";
      afterPic.style.display = "none";
      continueBt.style.backgroundColor = "#EEEEEE";
      continueBt.style.cursor = "default";
    }
  }

  //Not Question Page
  const picBefore = document.getElementById("picBefore");

  //설명 페이지에서는 깜빡거림 제거

  if (data?.seeQuestion.isBlink === false && picBefore) {
    picBefore.style.animation = "none";
  } else if (data?.seeQuestion.isBlink === true && picBefore) {
    picBefore.style.animation = "blink-effect 2.5s linear infinite";
  }

  const isQ = data?.seeQuestion.isQ;

  //여기부터 서베이에 전체적인 페이지 UX
  //1page에선 화살표가 안보이게
  const backBt = document.getElementById("backBt");
  if (page !== 1 && backBt) {
    backBt.style.visibility = "show";
  }

  const isAnswerPic = data?.seeQuestion.isAnswerPic;

  function backBtClick(e) {
    e.preventDefault();
    if (localStorage.getItem("KEY_PAIN_HAVE") === "false" && page === 8) {
      setPage(1);
      localStorage.setItem("KEY_QUIZ_PAGE", 1);
    } else if (
      localStorage.getItem("KEY_SYMPTOM_HAVE") === "false" &&
      page === 7
    ) {
      setPage(parseInt(page) - 2);
      localStorage.setItem("KEY_QUIZ_PAGE", 5);
    } else {
      setPage(parseInt(page) - 1);
      localStorage.setItem("KEY_QUIZ_PAGE", page - 1);
    }
  }

  const continueBt = document.getElementById("continueBt");

  function continueBtClick(e) {
    e.preventDefault();
    if (isQ) {
      if (!click) {
        alert("선택을 먼저 해주세요");
        continueBt.style.backgroundColor = "#EFEFEF";
        continueBt.style.cursor = "default";
      } else {
        continueBt.style.backgroundColor = "#D3E357";
        continueBt.style.cursor = "pointer";

        setPage(parseInt(page) + parseInt(skipPage));
        setClick(false);
        localStorage.setItem(
          "KEY_QUIZ_PAGE",
          parseInt(page) + parseInt(skipPage)
        );
      }
    } else {
      setPage(parseInt(page) + parseInt(skipPage));
      setClick(false);
      localStorage.setItem(
        "KEY_QUIZ_PAGE",
        parseInt(page) + parseInt(skipPage)
      );
    }
  }

  return (
    <div>
      {isPc ? (
        <div>
          <HeaderContainer>
            <FontAwesomeIcon
              onClick={backBtClick}
              cursor={"pointer"}
              icon={faArrowLeft}
              size="xl"
              id="backBt"
            />
            <span>Exit</span>
          </HeaderContainer>
          <Content>
            <QuizContainer>
              {loading ? null : (
                <WContentContainer>
                  {isQ ? (
                    <WQuestionContainer id="questionContainer">
                      <WQuestionText>{data?.seeQuestion.quiz}</WQuestionText>
                      {isAnswerPic ? (
                        // 질문지에 사진이 있는경우
                        <WButtonContainer>
                          {data?.seeQuestion.answers.map((answer) => (
                            <WQuizPicButton
                              key={answer.id}
                              id={answer.id}
                              onClick={btClick}
                              onMouseEnter={onMouseEnter}
                              onMouseLeave={onMouseLeave}
                            >
                              <WHiddenText>
                                {data.seeQuestion.keyName}
                              </WHiddenText>
                              <WHiddenText>{answer.keyValue}</WHiddenText>
                              <WHiddenText>{answer.skip}</WHiddenText>
                              <WButtonImage src={answer.picture}></WButtonImage>
                              <WAnswerText>{answer.answer}</WAnswerText>
                              <WHintText>{answer.hint}</WHintText>
                            </WQuizPicButton>
                          ))}
                        </WButtonContainer>
                      ) : (
                        //없는 경우
                        <WButtonContainer>
                          {data?.seeQuestion.answers.map((answer) => (
                            <WQuizWoPicButton
                              key={answer.id}
                              id={answer.id}
                              onClick={btClick}
                              onMouseEnter={onMouseEnter}
                              onMouseLeave={onMouseLeave}
                            >
                              <WHiddenText>{answer.keyName}</WHiddenText>
                              <WHiddenText>{answer.keyValue}</WHiddenText>
                              <WHiddenText>{answer.skip}</WHiddenText>
                              <WAnswerText>{answer.answer}</WAnswerText>
                              <WHintText>{answer.hint}</WHintText>
                            </WQuizWoPicButton>
                          ))}
                        </WButtonContainer>
                      )}
                    </WQuestionContainer>
                  ) : (
                    <WCommentContainer id="commentContainer">
                      <Comment1>{data?.seeQuestion.comment1}</Comment1>
                      <br></br>
                      <Comment2>{data?.seeQuestion.comment2}</Comment2>
                      <br></br>
                      <Comment3>{data?.seeQuestion.comment3}</Comment3>
                      <br></br>
                      <Comment4>{data?.seeQuestion.comment4}</Comment4>
                      <br></br>
                      <HiddenText>aa</HiddenText>
                    </WCommentContainer>
                  )}

                  <WPictureBeforeContainer id="beforePic">
                    <WPicture
                      id="picBefore"
                      src={data?.seeQuestion.picBefore}
                    ></WPicture>
                  </WPictureBeforeContainer>
                  <WPictureAfterContainer id="afterPic">
                    <WPicture src={data?.seeQuestion.picAfter}></WPicture>
                  </WPictureAfterContainer>
                </WContentContainer>
              )}

              <ContinueContainer>
                <ContinueBt onClick={continueBtClick} id="continueBt">
                  Continue
                </ContinueBt>
              </ContinueContainer>
            </QuizContainer>
          </Content>
        </div>
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
