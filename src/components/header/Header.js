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
import { isLoggedInVar, logUserOut } from "../../apollo";
import useUser from "../../hooks/useUser";
import routes from "../../screens/routes";
import StepWearLayout from "./StepWearLayout";

const SHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const BottomMenuContainer = styled.div`
  display: flex;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: flex-end;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
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

const MainMenu = styled(Menu)`
  font-size: ${(props) => props.theme.fs_subTitle2};
  font-weight: 800;
  height: 100%;
`;

const SubMenu1 = styled(Menu)`
  padding: 0px 0px;
  font-size: ${(props) => props.theme.fs_body5};
  font-weight: ${(props) => props.theme.fw_bold};
  text-underline-offset: 1em;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  const [stepWearBar, setStepWearBar] = useState(false);
  const showStepWearBar = () => setStepWearBar(!stepWearBar);

  return (
    <SHeader>
      <HeaderContainer>
        <Wrapper>
          <Link to="/">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
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
                  <SubMenu1>
                    <span onClick={() => showStepWearBar()}>STEP-WEAR</span>
                  </SubMenu1>
                </Link>
                <Link to="#">
                  <SubMenu1>
                    <span>SHOES</span>
                  </SubMenu1>
                </Link>
                <Link to="#">
                  <SubMenu1>
                    <span>FOOT-WEAR</span>
                  </SubMenu1>
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
        {stepWearBar ? <StepWearLayout></StepWearLayout> : ""}
      </HeaderContainer>
    </SHeader>
  );
}
export default Header;
