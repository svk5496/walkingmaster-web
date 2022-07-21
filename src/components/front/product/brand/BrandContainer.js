import { Link } from "react-router-dom";
import styled from "styled-components";

const SBrandContainer = styled.div`
  display: flex;
  height: 100px;
  padding-bottom: 10px;
`;

const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0px;
`;

const BrandText = styled.span`
  font-size: ${(props) => props.theme.fs_body3};
`;

const BrandPic = styled.img`
  max-width: 80px;
  min-width: 80px;
  margin-right: 16px;
`;

function BrandContainer({ data }) {
  return (
    <SBrandContainer>
      <BrandPic src={data?.seeDetail.brand.brandLogo}></BrandPic>
      <BrandInfo>
        <BrandText>{data?.seeDetail.brand.brandName}</BrandText>
        <span>{data?.seeDetail.brand.bio}</span>
        <span>Brand Home</span>
      </BrandInfo>
    </SBrandContainer>
  );
}

export default BrandContainer;
