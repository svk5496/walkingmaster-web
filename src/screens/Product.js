import { isLoggedInvar } from "../apollo";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import BrandContainer from "../components/product/brand/BrandContainer";
import ProductHeader from "../components/product/productHeader/ProductHeader";
import PageTitle from "../components/pageTitle";

const SEEDETAIL_QUERY = gql`
  query seeDetail($id: Int!) {
    seeDetail(id: $id) {
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
        brandEngName
        bio
        brandLogo
        brandCoverImg
        freeShipping
        shippingCost
        conditionalShippingAmount
        shippingDay
        additionalShippingCost
        conditionalShipping
      }
      colors {
        id
        name
      }
      sizes {
        id
        name
      }
      onSale
      discountRate
      isLiked
    }
  }
`;

// const TOGGLE_PRODUCT_LIKE_MUTATION = gql`
//   mutation toggleProductLike($id: Int!) {
//     toggleProductLike(id: $id) {
//       ok
//       error
//     }
//   }
// `;

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
  }
`;

const LoadingContainer = styled.div``;

const ProductDetailContainer = styled.div`
  min-width: 600px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductDetail1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductDetail2 = styled.div`
  width: 100%;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ShowDetailBt = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 78%;
  cursor: pointer;
`;

function Product() {
  const { id } = useParams();
  const toNumber = parseInt(id);
  const { loading, _, data } = useQuery(SEEDETAIL_QUERY, {
    variables: {
      id: toNumber,
    },
  });
  console.log(data);
  const detail1 = data?.seeDetail.detailPage1;
  const detail2 = data?.seeDetail.detailPage2;

  function createDetail1() {
    return { __html: detail1 };
  }

  function createDetail2() {
    return { __html: detail2 };
  }

  // const [toggleProductLikeMutation, { mloading }] = useMutation(
  //   TOGGLE_PRODUCT_LIKE_MUTATION,
  //   {
  //     variables: {
  //       id: data.seeDetail.id,
  //     },
  //   }
  // );

  return (
    <div>
      <ProductContainer>
        <Link to="#">
          {loading ? null : <BrandContainer data={data}></BrandContainer>}
        </Link>
        {loading ? null : (
          <LoadingContainer>
            <ProductHeader data={data}></ProductHeader>

            <ProductDetailContainer>
              <ProductDetail1>
                <div dangerouslySetInnerHTML={createDetail1()}></div>
              </ProductDetail1>
              <ShowDetailBt>
                상품설명 더보기
                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
              </ShowDetailBt>
              <ProductDetail2>
                <div dangerouslySetInnerHTML={createDetail2()}></div>
              </ProductDetail2>
            </ProductDetailContainer>
          </LoadingContainer>
        )}
      </ProductContainer>
    </div>
  );
}

export default Product;
