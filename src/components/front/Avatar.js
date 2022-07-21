import styled from "styled-components";

const Savatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.div`
  max-width: 100%;
`;

function Avatar({ url } = "") {
  return <Savatar>{url !== "" ? <Img src={url}></Img> : null}</Savatar>;
}

export default Avatar;
