import { gql, useQuery } from "@apollo/client";
import { isLoggedInvar, logUserOut } from "../apollo";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";

import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { numberWithCommas, roundNumber } from "../components/shared";
import { bool, number, symbol } from "prop-types";
import { Link } from "react-router-dom";
import PageTitle from "../components/pageTitle";

const SEEPRODUCTS_QUERY = gql`
  query seeProducts {
    seeProducts {
      id
      productName
      productEngName
      price
      thumbnail
      detailPage1
      detailPage2
      reviews
      productLikes
      brand {
        brandName
      }
      onSale
      discountRate
      isLiked
    }
  }
`;

const HomeImageContainer = styled.div`
  display: flex;
  width: 1200px;
  max-width: 1600px;
  height: 640px;
`;

const HomeImage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(img/home/home1.png);
  background-size: cover;
`;

const ToSurvey = styled.div`
  position: absolute;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 3px;
  top: 300px;
  span {
    color: black;
    font-weight: ${(props) => props.theme.fw_bold};
  }
`;

const RankContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

const ProductContainer = styled.div`
  padding: 0px 10px;
  flex-basis: 270px;
  flex-grow: 1;

  cursor: pointer;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
  }
`;

const ThubmnailContainer = styled.div``;

const ThumbnailFile = styled.img`
  max-width: 100%;
  min-width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const IllustContainer = styled.div`
  display: flex;
  padding-top: 14px;
  span {
    font-size: ${(props) => props.theme.fs_body5};
  }
`;

const HeartContainer = styled.div`
  padding-right: 30px;
  span {
    padding-left: 4px;
  }
`;

const ReviewContainer = styled.div`
  span {
    padding-left: 4px;
  }
`;

const BrandName = styled.span`
  font-size: ${(props) => props.theme.fs_body4};
  font-weight: ${(props) => props.theme.fw_bold};
  text-decoration: underline;
  padding-top: 10px;
`;

const ProductName = styled.span`
  font-size: ${(props) => props.theme.fs_body5};
  font-weight: ${(props) => props.theme.fw_regular};
  padding-top: 10px;
`;

const GrayText = styled.span`
  color: ${(props) => props.theme.fontGray};
`;

const Price = styled.span`
  font-size: ${(props) => props.theme.fs_body4};
  font-weight: ${(props) => props.theme.fw_bold};
  padding-top: 20px;
`;

const DiscountPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DiscountRate = styled.span`
  padding-top: 14px;
  color: tomato;
`;

const DiscountPrice = styled.span`
  font-size: ${(props) => props.theme.fs_body4};
  font-weight: ${(props) => props.theme.fw_bold};
  color: tomato;
  padding-top: 4px;
`;

function Home() {
  const { data } = useQuery(SEEPRODUCTS_QUERY);
  return (
    <div>
      <PageTitle title="워킹마스터 | 정말 좋은건 정말 편하다"></PageTitle>
      <HomeImageContainer>
        <HomeImage>
          <Link to={`/quiz`}>
            <ToSurvey>
              <span>발 알아보기 </span>
            </ToSurvey>
          </Link>
        </HomeImage>
      </HomeImageContainer>
      <RankContainer>
        {data?.seeProducts?.map((product) => (
          <ProductContainer key={product.id} id={product.id}>
            <Link to={`/product/${product.id}`}>
              <ThubmnailContainer>
                <ThumbnailFile src={product.thumbnail}></ThumbnailFile>
              </ThubmnailContainer>
              <TitleContainer>
                <BrandName>{product.brand.brandName}</BrandName>
                <ProductName>{product.productName}</ProductName>
                {product.discountRate === 0 ? (
                  <Price>{numberWithCommas(product.price)}원</Price>
                ) : (
                  <DiscountPriceContainer>
                    <GrayText>{numberWithCommas(product.price)}</GrayText>
                    <DiscountRate>{product.discountRate}% OFF</DiscountRate>
                    <DiscountPrice>
                      {numberWithCommas(
                        roundNumber(product.price, product.discountRate)
                      )}
                      원
                    </DiscountPrice>
                  </DiscountPriceContainer>
                )}
              </TitleContainer>
            </Link>

            <IllustContainer>
              <HeartContainer>
                <FontAwesomeIcon
                  style={{
                    color: product?.isLiked ? "tomato" : "inherit",
                  }}
                  icon={product?.isLiked ? SolidHeart : faHeart}
                  size="lg"
                ></FontAwesomeIcon>
                <span>{numberWithCommas(product.productLikes)}</span>
              </HeartContainer>
              <ReviewContainer>
                <FontAwesomeIcon icon={faMessage} size={"lg"}></FontAwesomeIcon>
                <span>{numberWithCommas(product.reviews)}</span>
              </ReviewContainer>
            </IllustContainer>
          </ProductContainer>
        ))}
      </RankContainer>
    </div>
  );
}

export default Home;
