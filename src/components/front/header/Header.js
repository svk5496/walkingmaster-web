import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import WHeader from "./WHeader";

const SHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
`;

function Header() {
  const isPc = useMediaQuery({
    query: "(min-width:1201px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:541px) and (max-width:1200px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:540px)",
  });

  return (
    <div>
      {isPc ? (
        <SHeader>
          <WHeader></WHeader>
        </SHeader>
      ) : isTablet ? (
        <div>tablet</div>
      ) : (
        <div>phone</div>
      )}
    </div>
  );
}
export default Header;
