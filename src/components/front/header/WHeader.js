import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faDoorOpen,
  faHeart,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../../../apollo";
import useUser from "../../../hooks/useUser";
import routes from "../../../screens/routes";
import DeferredLayout from "./HeaderLayouts/DefferedLayout";
import ShoeLayout from "./HeaderLayouts/ShoeLayout";
import StepWearLayout from "./HeaderLayouts/StepWearLayout";

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TopMenuContainer = styled.div`
  display: flex;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 38px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const BottomMenuContainer = styled.div`
  display: flex;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-left: 12px;
  cursor: pointer;
  span {
    margin-left: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainMenu = styled.span`
  font-size: ${(props) => props.theme.fs_subTitle2};
  margin-left: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: 800;
  height: 100%;
`;

const SubMenu1 = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: ${(props) => props.theme.fs_body5};
  font-weight: ${(props) => props.theme.fw_bold};
`;

const SubMenu2 = styled(SubMenu1)`
  font-size: ${(props) => props.theme.fs_body5};
  font-weight: ${(props) => props.theme.fw_regular};
`;

const Divider = styled.span`
  padding-left: 20px;
`;

function WHeader() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  const [stepWearBar, setStepWearBar] = useState(false);
  const [shoeBar, setShoeBar] = useState(false);
  const [deferredBar, setDeferedBar] = useState(false);

  const showStepWearBar = () => setStepWearBar(!stepWearBar);

  function mouseInInsole() {
    setStepWearBar(!stepWearBar);
  }
  function mouseOutInsole() {
    setStepWearBar(!stepWearBar);
  }
  function mouseInShoe() {
    setShoeBar(!shoeBar);
  }
  function mouseOutShoe() {
    setShoeBar(!shoeBar);
  }
  function mouseInDeferred() {
    setDeferedBar(!deferredBar);
  }
  function mouseOutDeferred() {
    setDeferedBar(!deferredBar);
  }

  return (
    <HeaderContainer>
      <Wrapper>
        <Link to="/">
          <LogoContainer>
            <Logo src="https://gi.esmplus.com/kishop1121/web/shared/logo_short.png"></Logo>
          </LogoContainer>
        </Link>
        <HeaderMenuContainer>
          <TopMenuContainer>
            <MenuContainer>
              <Link to="#">
                <MainMenu>
                  <span>My Foot</span>
                </MainMenu>
              </Link>
            </MenuContainer>
            <MenuContainer>
              <Link to="#">
                <SubMenu1
                  onMouseEnter={mouseInInsole}
                  onMouseLeave={mouseOutInsole}
                >
                  <span>깔창</span>
                  {stepWearBar ? <StepWearLayout></StepWearLayout> : ""}
                </SubMenu1>
              </Link>
              <Link to="#">
                <SubMenu1
                  onMouseEnter={mouseInShoe}
                  onMouseLeave={mouseOutShoe}
                >
                  <span>신발</span>
                  {shoeBar ? <ShoeLayout></ShoeLayout> : ""}
                </SubMenu1>
              </Link>
              <Link to="#">
                <SubMenu1
                  onMouseEnter={mouseInDeferred}
                  onMouseLeave={mouseOutDeferred}
                >
                  <span>체험</span>
                  {deferredBar ? <DeferredLayout></DeferredLayout> : ""}
                </SubMenu1>
              </Link>
            </MenuContainer>
            <MenuContainer>
              <Divider>|</Divider>
            </MenuContainer>
            <MenuContainer>
              <Link to="#">
                <SubMenu2>
                  <span>랭킹</span>
                </SubMenu2>
              </Link>
              <Link to="#">
                <SubMenu2>
                  <span>이벤트</span>
                </SubMenu2>
              </Link>
            </MenuContainer>
          </TopMenuContainer>
          <BottomMenuContainer>
            <MenuContainer>
              <Link to={`/mypage/${data?.me?.id}`}>
                <Menu>
                  <FontAwesomeIcon icon={faUser} />
                  <span>My page</span>
                </Menu>
              </Link>
              <Link to={routes.myHeart}>
                <Menu>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>My Heart</span>
                </Menu>
              </Link>
              <Link to={routes.cart}>
                <Menu>
                  <FontAwesomeIcon icon={faShoppingBag} />
                  <span>Shopping Bag</span>
                </Menu>
              </Link>
              {isLoggedIn ? (
                <Link to={routes.home}>
                  <Menu>
                    <FontAwesomeIcon icon={faDoorOpen} />
                    <span onClick={() => logUserOut()}>Log out</span>
                  </Menu>
                </Link>
              ) : (
                <Link to={routes.login}>
                  <Menu>
                    <FontAwesomeIcon icon={faDoorOpen} size="md" />
                    <span>Log in</span>
                  </Menu>
                </Link>
              )}
            </MenuContainer>
          </BottomMenuContainer>
        </HeaderMenuContainer>
      </Wrapper>
    </HeaderContainer>
  );
}
export default WHeader;
