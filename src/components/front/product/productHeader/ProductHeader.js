import {
  BorderBox,
  FlexBox,
  numberWithCommas,
  roundNumber,
} from "../../../shared";
import styled from "styled-components";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShippingInfo from "./ShippingInfo";
import { useState } from "react";
import { element } from "prop-types";

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
  :focus {
    outline: none;
  }
`;

const ColorOption = styled.option``;
const SizeOption = styled.option``;

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const ItemArray = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  width: 100%;
  justify-content: space-between;
  span {
    margin: 0px 20px;
  }
  li {
    margin: 4px 0px;
  }
  button {
    background-color: ${(props) => props.theme.bgColor};
    color: black;
    border: solid 1px ${(props) => props.theme.borderColor};
    padding: 4px 10px;
  }
`;
const Item = styled.li`
  display: flex;
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

function ProductHeader({ data }) {
  const [color, setColor] = useState("색상");
  const [size, setSize] = useState("사이즈");

  const select_color = document.getElementById("select-color");
  const select_size = document.getElementById("select-size");
  const itemArray = document.getElementById("item-array");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Item delete
  function deleteItem(event) {
    event.preventDefault();
    const li = event.target.parentElement; // 지워야할 부모인자
    li.remove();
  }

  // Item plus
  function plusItem(event) {
    event.preventDefault();
    const originalValue = parseInt(
      event.target.parentElement.children[3].innerText
    );
    event.target.parentElement.children[3].innerText = originalValue + 1;
  }

  // Item Minus
  function minusItem(event) {
    event.preventDefault();
    const originalValue = parseInt(
      event.target.parentElement.children[3].innerText
    );
    if (event.target.parentElement.children[3].innerText === "1") {
      event.target.parentElement.children[3].innerText = 1;
    } else {
      event.target.parentElement.children[3].innerText = originalValue - 1;
    }
  }

  // Each Item 요소
  function paintItem(color, size) {
    const li = document.createElement("li");
    const itemColor = document.createElement("span");
    itemColor.innerText = color;
    const itemSize = document.createElement("span");
    itemSize.innerText = size;

    const minusButton = document.createElement("button");
    minusButton.innerText = "-";
    minusButton.addEventListener("click", minusItem);
    const itemCount = document.createElement("span");
    itemCount.innerText = "1";
    const plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.addEventListener("click", plusItem);

    const ItemPrice = document.createElement("span");
    ItemPrice.innerText = data.seeDetail.price;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", deleteItem);

    li.appendChild(itemColor);
    li.appendChild(itemSize);
    li.appendChild(minusButton);
    li.appendChild(itemCount);
    li.appendChild(plusButton);
    li.appendChild(ItemPrice);
    li.appendChild(deleteButton);

    itemArray.appendChild(li);
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    // 색상 탭 초기화
    if (data?.seeDetail.colors.length !== 0) {
      paintItem(color, e.target.value);
      select_color.value = "색상";
      setColor("색상");

      setSize("사이즈");
      select_size.value = "사이즈";
    } else {
      paintItem(" ", e.target.value);
      setSize("사이즈");
      select_size.value = "사이즈";
    }
  };

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
        <ShippingInfo data={data}></ShippingInfo>
        <OptionContainer>
          <form>
            {data?.seeDetail.colors.length === 0 ? null : (
              <SelectBox onChange={handleColorChange} id="select-color">
                <option>색상</option>
                {data?.seeDetail.colors.map((color) => (
                  <ColorOption key={color.id} id={color.id}>
                    {color.name}
                  </ColorOption>
                ))}
              </SelectBox>
            )}

            <SelectBox onChange={handleSizeChange} id="select-size">
              <option>사이즈</option>
              1. 컬러가 없다면, 그냥 리스트 출력,
              {data?.seeDetail.colors.length === 0
                ? data?.seeDetail.sizes.map((size) => (
                    <SizeOption key={size.id} id={size.id}>
                      {size.name}
                    </SizeOption>
                  ))
                : color === "색상"
                ? null
                : data?.seeDetail.sizes.map((size) => (
                    <SizeOption key={size.id} id={size.id}>
                      {size.name}
                    </SizeOption>
                  ))}
            </SelectBox>
            <ItemContainer>
              <ItemArray id="item-array"></ItemArray>
            </ItemContainer>
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
