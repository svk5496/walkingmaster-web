import {
  BorderBox,
  FlexBox,
  numberWithCommas,
  roundNumber,
} from "../../shared";
import styled from "styled-components";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SProductHeader = styled.div`
  max-width: 1200px;
  min-width: 900px;
  display: flex;
`;

const ThumbnailPic = styled.img`
  max-width: 560px;
  min-width: 420px;
`;

const ProductInfo = styled.div`
  max-width: 640px;
  min-width: 580px;
  padding: 0px 40px;
`;

const ProductTitle = styled.div`
  display: flex;
  border-top: 2px solid;
  padding: 20px 0px;
  justify-content: space-between;
  span {
    font-size: ${(props) => props.theme.fs_body3};
    font-weight: ${(props) => props.theme.fw_bold};
  }
`;

const IllustContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  align-items: center;
  cursor: pointer;
  span {
    font-size: ${(props) => props.theme.fs_body6};
    font-weight: ${(props) => props.theme.fw_light};
    padding-top: 4px;
  }
`;

const ToReview = styled.div`
  display: flex;
`;

const SeeReview = styled.div`
  margin-left: 10px;
  span {
    text-decoration: underline;
    cursor: pointer;
    font-size: ${(props) => props.theme.fs_body6};
  }
`;

const DisPriceContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

const PriceContainer = styled.div`
  padding-top: 20px;
`;

const OriginalPrice = styled.span`
  font-size: ${(props) => props.theme.fs_body3};
  font-weight: ${(props) => props.theme.fw_medium};
  color: ${(props) => props.theme.fontGray};
  margin-bottom: 10px;
`;

const FinalPrice = styled.div`
  span {
    font-size: ${(props) => props.theme.fs_body2};
    font-weight: ${(props) => props.theme.fw_bold};
    color: ${(props) => props.theme.fontColor};
  }
`;

const DiscountRate = styled.span`
  font-size: ${(props) => props.theme.fs_body2};
  font-weight: ${(props) => props.theme.fw_bold};
  color: ${(props) => props.theme.fontHighLight};
  margin-right: 10px;
`;

const ShippingInfo = styled.div`
  padding-top: 30px;
  padding-bottom: 16px;
  span {
    font-size: ${(props) => props.theme.fs_body4};
    font-weight: ${(props) => props.theme.fw_bold};
  }
`;

const ShippingDetail = styled.div`
  padding-top: 10px;
  display: flex;
  div {
    width: 70px;
  }
  span {
    font-size: ${(props) => props.theme.fs_body5};
    font-weight: ${(props) => props.theme.fw_medium};
  }
  sub {
    width: 400px;
  }
`;

const OptionContainer = styled.div`
  padding-top: 10px;
`;

const SelectBox = styled.select`
  width: 100%;
  padding: 8px 5px;
  font-family: inherit;
  margin-top: 5px;
  font-size: ${(props) => props.theme.fs_body5};
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 2px;
  border-color: ${(props) => props.theme.borderColor};
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  span {
    width: 100%;
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 16px 0px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-weight: ${(props) => props.theme.fw_bold};
  }
`;

const BuyButton = styled.span`
  width: 100%;
  border: 6px solid ${(props) => props.theme.secondary};
  padding: 16px 0px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-weight: ${(props) => props.theme.fw_bold};
  color: white;
  background-color: ${(props) => props.theme.secondary};
  box-shadow: 5px 5px 16px;
  :hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.secondary};
  }
`;

function ShippingComments({ data }) {
  console.log(data?.seeDetail.brand.freeShipping);
  if (data?.seeDetail.brand.freeShipping) {
    if (data?.seeDetail.brand.additionalShippingCost === 0) {
      return <sub>"무료배송 + 도서산간 추가비용 없음"</sub>;
    }

    return (
      <sub>{`무료배송 + 도서산간 추가비용${data?.seeDetail.brand.additionalShippingCost}원`}</sub>
    );
  }
  if (data?.seeDetail.brand.conditionalShipping) {
    if (data?.seeDetail.brand.additionalShippingCost === 0) {
      return (
        <sub>{`${data?.seeDetail.brand.conditionalShippingAmount}원 이상 구매시 무료 + 도서산간 추가비용 없음`}</sub>
      );
    }

    return (
      <sub>{`${data?.seeDetail.brand.conditionalShippingAmount}원 이상 구매시 무료 + 도서산간 추가비용${data?.seeDetail.brand.additionalShippingCost}원`}</sub>
    );
  }
  if (data?.seeDetail.brand.additionalShippingCost === 0) {
    return (
      <sub>{`배송비 ${data?.seeDetail.brand.shippingCost}원  도서산간 추가비용 없음`}</sub>
    );
  } else {
  }
  return (
    <sub>{`배송비 ${data?.seeDetail.brand.shippingCost}원 + 도서산간 추가비용${data?.seeDetail.brand.additionalShippingCost}원`}</sub>
  );
}

function ProductHeader({ data }) {
  return (
    <SProductHeader>
      <ThumbnailPic src={data?.seeDetail.thumbnail}></ThumbnailPic>
      <ProductInfo>
        <ProductTitle>
          <span>{data?.seeDetail.productName}</span>
          <IllustContainer>
            <FontAwesomeIcon
              style={{
                color: data?.seeDetail.isLiked ? "tomato" : "inherit",
              }}
              icon={data?.seeDetail.isLiked ? SolidHeart : faHeart}
              size="xl"
            ></FontAwesomeIcon>
            <span>{numberWithCommas(data?.seeDetail.productLikes)}</span>
          </IllustContainer>
        </ProductTitle>
        {data?.seeDetail.productLikes === 0 ? (
          <ToReview>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <SeeReview>
              <span>{numberWithCommas(data?.seeDetail.reviews)}</span>
              <span>개 리뷰 보기</span>
            </SeeReview>
          </ToReview>
        ) : (
          <ToReview>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <SeeReview>
              <span>{numberWithCommas(data?.seeDetail.reviews)}</span>
              <span>개 리뷰 보기</span>
            </SeeReview>
          </ToReview>
        )}
        {data?.seeDetail.discountRate === 0 ? (
          <PriceContainer>
            <FinalPrice>
              <span>{numberWithCommas(data?.seeDetail.price)}</span>
              <sub>원</sub>
            </FinalPrice>
          </PriceContainer>
        ) : (
          <DisPriceContainer>
            <OriginalPrice>
              {numberWithCommas(data?.seeDetail.price)}
            </OriginalPrice>
            <FlexBox>
              <DiscountRate>
                {numberWithCommas(data?.seeDetail.discountRate)}%
              </DiscountRate>
              <FinalPrice>
                <span>
                  {numberWithCommas(
                    roundNumber(
                      data?.seeDetail.price,
                      data?.seeDetail.discountRate
                    )
                  )}
                </span>
                <sub>원</sub>
              </FinalPrice>
            </FlexBox>
          </DisPriceContainer>
        )}
        <ShippingInfo>
          <span>배송정보</span>
          <ShippingDetail>
            <div>
              <span>배송비</span>
            </div>
            <ShippingComments data={data}></ShippingComments>
          </ShippingDetail>
          <ShippingDetail>
            <div>
              <span>발송예정</span>
            </div>
            <sub>
              {data?.seeDetail.brand.shippingDay}일 이내 출고 (주말,공휴일제외)
            </sub>
          </ShippingDetail>
        </ShippingInfo>
        <OptionContainer>
          <form>
            <SelectBox>
              <option>색상</option>
              {data?.seeDetail.colors.map((color) => (
                <option key={color.id} id={color.id}>
                  {color.name}
                </option>
              ))}
            </SelectBox>
            <SelectBox onClick={console.log()}>
              <option>사이즈</option>
              {data?.seeDetail.sizes.map((size) => (
                <option key={size.id} id={size.id}>
                  {size.name}
                </option>
              ))}
            </SelectBox>
            <ButtonContainer>
              <span>장바구니</span>
              <BuyButton>바로 구매하기</BuyButton>
            </ButtonContainer>
          </form>
        </OptionContainer>
      </ProductInfo>
    </SProductHeader>
  );
}

export default ProductHeader;
