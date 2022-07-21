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
import { BsBagCheck, BsBoxSeam } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${(props) => props.theme.secondary};
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

const LogoBox = styled.div`
  height: 50px;
  width: 100%;
  margin: 10px 0px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
  padding: 0px 20px;
  span {
    font-size: 16px;
    color: white;
    padding: 15px 20px;
  }
  &:hover {
    transform: scale(1.04);
    transition: ease-in-out 0.1s;
    span {
      color: ${(props) => props.theme.primary};
    }
  }
  &.active {
    background-color: ${(props) => props.theme.bgColorDark};
  }
  :focus {
    span {
      color: ${(props) => props.theme.primary};
    }
  }
  border-radius: 10px;
`;

const ActiveMenu = styled(Menu)`
  background-color: ${(props) => props.theme.bgColorDark};
`;

function AdminHeader() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <HeaderContainer>
      <Wrapper>
        <Link to={routes.admin}>
          <LogoBox>
            <img src="https://gi.esmplus.com/kishop1121/web/shared/logo_long.png"></img>
          </LogoBox>
        </Link>
        <MenuContainer>
          <Link to={routes.admin}>
            <Menu>
              <MdDashboard color="white" size="18"></MdDashboard>
              <span>대시보드</span>
            </Menu>
          </Link>
          <Link to={routes.adminUser}>
            <Menu>
              <AiOutlineUser color="white" size="18"></AiOutlineUser>
              <span>사용자</span>
            </Menu>
          </Link>
          <Link to={routes.adminProduct}>
            <Menu>
              <BsBoxSeam color="white" size="18"></BsBoxSeam>

              <span>상품관리</span>
            </Menu>
          </Link>
          <Link to={routes.adminOrderNew}>
            <Menu>
              <BsBagCheck color="white" size="18" />
              <span>주문관리</span>
            </Menu>
          </Link>
          <Link to="#">
            <Menu>
              <BsBagCheck color="white" size="18" />
              <span>리뷰관리</span>
            </Menu>
          </Link>
          <Link to={routes.admin}>
            <Menu>
              <FontAwesomeIcon color="white" icon={faDoorOpen} />
              <span onClick={() => logUserOut()}>로그아웃</span>
            </Menu>
          </Link>
        </MenuContainer>
      </Wrapper>
    </HeaderContainer>
  );
}
export default AdminHeader;
