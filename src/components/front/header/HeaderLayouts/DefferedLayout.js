import styled from "styled-components";

const SHeader = styled.header`
  margin-top: 60px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: block;
  background-color: ${(props) => props.theme.bgColor};
  position: absolute;
  top: 0px;
  left: 0px;
`;

const Wrapper = styled.div`
  max-width: 1600px;
  height: 280px;
  padding: 0 20px;
  width: 100%;
  padding-top: 40px;
  display: flex;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 700px;
  height: 100%;
  display: flex;
  padding: 10px 20px;
`;

const MenuContainer = styled.div`
  width: 160px;
  height: 100%;
  display: flex;
  padding: 0px 14px;
  flex-direction: column;
  h1 {
    font-size: ${(props) => props.theme.fs_body3};
    font-weight: ${(props) => props.theme.fw_medium};
    color: ${(props) => props.theme.fontDarkGray};
    cursor: default;
    height: 20px;
  }
  p {
    font-size: ${(props) => props.theme.fs_body5};
    cursor: default;
    color: ${(props) => props.theme.fontGray};
    margin-top: 14px;
    height: 30px;
  }
  span {
    font-size: ${(props) => props.theme.fs_body5};
    cursor: pointer;
    margin-top: 14px;
    text-decoration: none;
  }
`;

const RightBox = styled.div`
  width: 500px;
  height: 100%;
  padding: 10px 20px;
`;

const EventBox = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  padding: 0px 14px;
  flex-direction: column;
  h1 {
    font-size: ${(props) => props.theme.fs_body3};
    font-weight: ${(props) => props.theme.fw_medium};
    color: ${(props) => props.theme.fontDarkGray};
    cursor: default;
    height: 20px;
  }
  div {
    width: 260px;
    height: 170px;
    margin-top: 14px;
    cursor: pointer;
    border-radius: 20px;
    background-color: ${(props) => props.theme.primary};
  }
`;

function DeferredLayout() {
  return (
    <SHeader>
      <Wrapper>
        <LeftBox>
          <MenuContainer>
            <h1>MulKung</h1>
            <p>언제나 어디서나 오직 편안함</p>
            <span>물컹 오리지날</span>
          </MenuContainer>
          <MenuContainer>
            <h1>HoneyComb</h1>
            <p>30,000명의 선택!</p>
            <span>벌집깔창1</span>
          </MenuContainer>
        </LeftBox>
        <RightBox>
          <EventBox>
            <h1>Get Started</h1>
            <div></div>
          </EventBox>
        </RightBox>
      </Wrapper>
    </SHeader>
  );
}

export default DeferredLayout;
