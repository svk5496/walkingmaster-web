import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../../../components/shared/FormError";
import {
  dressCategory,
  shoesCategory,
  insoleCategory,
  runningCategory,
  casualCategory,
  sportsCategory,
  sandalCategory,
  bootsCategory,
} from "../../../components/shared/Data";
import { useState } from "react";
import { RowFlexBox } from "../../../components/shared/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const UploadContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 100%;
`;

const Subtitle = styled.span`
  font-size: 24px;
  padding: 20px 40px;
`;

const TopicTitle = styled.span`
  font-size: 16px;
  padding: 30px 0px;
  font-weight: 500;
`;

const TopicContainer = styled.div`
  width: 100%;
  min-width: 600px;
  padding: 20px 40px 40px 40px;
  border: solid 1px ${(props) => props.theme.borderColor};
  background-color: white;
  margin-bottom: 30px;
  border-radius: 4px;
`;

const FormErrorBox = styled.div`
  width: 100%;
  margin-left: 100px;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryFlexBox = styled(RowFlexBox)`
  justify-content: space-around;
  width: 100%;
`;

const ProductInput = styled.input`
  width: 100%;
  border-radius: 2px;
  padding: 7px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  &:active {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
  ::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const ProductSelect = styled.select`
  width: 100%;
  height: 38px;
  border-radius: 2px;
  padding: 7px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
`;

const SmallInput = styled(ProductInput)`
  width: 50%;
`;

const InputName = styled.span`
  display: flex;
  width: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const UploadFormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 25px 40px;
  overflow: auto;
  form {
    margin-top: 4px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const AuthButton = styled.input`
  border: none;
  border-radius: 3px;

  margin-top: 12px;
  background-color: ${(props) => props.theme.secondary};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

const SaleBtContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SaleTextContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: green;
  h1 {
    font-size: 24px;
  }
`;

const SaleBtBox = styled.button`
  padding: 10px 40px;
  background-color: white;
  border: solid 1px ${(props) => props.theme.borderColor};

  &.active {
    background-color: ${(props) => props.theme.secondary};
    color: white;
    transform: scale(1.02);
  }
  span {
    font-size: 12px;
  }
`;

const DiscountContainer = styled(InputContainer)`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CREATE_PRODUCT_MUTATION = gql`
  mutation uploadProduct(
    $productName: String!
    $price: Int!
    $adName: String!
    $packageName: String!
    $detailPage1: String!
    $productSliderPicture: String
  ) {
    uploadProduct(
      productName: $productName
      price: $price
      adName: $adName
      packageName: $packageName
      detailPage1: $detailPage1
      productSliderPicture: $productSliderPicture
    ) {
      ok
      error
    }
  }
`;

function ProductUploadLayout() {
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [discount, setDiscount] = useState(false);
  const [inputs, setInputs] = useState({
    discountPrice: 0,
    originalPrice: 0,
  });
  const onCompleted = (data) => {
    const {
      uploadProduct: { ok, error },
    } = data;
    if (!ok) {
      alert(error);
      return;
    } else {
      alert("????????? ?????????????????????.");
    }
  };
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues, clearErrors } =
    useForm({
      mode: "onChange",
    });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    if (data.price) {
      data.price = parseInt(data.price);
    }

    console.log(data);

    createProduct({
      variables: {
        ...data,
      },
    });
  };

  const category1Click = (e) => {
    setCategory1(e.target.value);
  };

  return (
    <UploadContainer>
      <Subtitle>????????????</Subtitle>
      <UploadFormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <TopicContainer>
            <TopicTitle>????????????</TopicTitle>
            <hr></hr>
            <CategoryFlexBox>
              <CategoryBox>
                <InputName>????????????1</InputName>

                <InputContainer>
                  <ProductSelect
                    ref={register({ required: "??????" })}
                    name="category1"
                    onChange={category1Click}
                  >
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                  </ProductSelect>
                </InputContainer>
              </CategoryBox>
              <FontAwesomeIcon size="lg" icon={faArrowRight}></FontAwesomeIcon>

              <CategoryBox>
                <InputName>????????????2</InputName>

                <InputContainer>
                  <ProductSelect
                    ref={register({ required: "??????" })}
                    name="category2"
                  >
                    {category1 === "??????"
                      ? shoesCategory.map((item, index) => {
                          return <option key={index}>{item}</option>;
                        })
                      : insoleCategory.map((item, index) => {
                          return <option key={index}>{item}</option>;
                        })}
                  </ProductSelect>
                </InputContainer>
              </CategoryBox>
              <FontAwesomeIcon size="lg" icon={faArrowRight}></FontAwesomeIcon>

              <CategoryBox>
                <InputName>????????????3</InputName>

                <InputContainer>
                  <ProductSelect
                    ref={register({ required: "??????" })}
                    name="category3"
                  >
                    <option>??????</option>
                    <option>??????</option>
                  </ProductSelect>
                </InputContainer>
              </CategoryBox>
            </CategoryFlexBox>
          </TopicContainer>

          <TopicContainer>
            <TopicTitle>?????????</TopicTitle>
            <hr></hr>
            <InputContainer>
              <ProductInput
                ref={register({ required: "???????????? ??????????????????" })}
                name="productName"
                type="text"
                placeholder="?????????"
                onChange={() => clearErrors("result")}
              ></ProductInput>
            </InputContainer>
            <FormError message={errors?.productName?.message}></FormError>
          </TopicContainer>

          <TopicContainer>
            <TopicTitle>?????????</TopicTitle>
            <hr></hr>
            <InputContainer>
              <InputName>?????????</InputName>

              <ProductInput
                ref={register({ required: "????????? ?????????????????? !" })}
                name="price"
                type="number"
                placeholder="??????"
                onChange={(e) => {
                  clearErrors("result");
                  setInputs({ ...inputs, originalPrice: e.target.value });
                }}
              ></ProductInput>
            </InputContainer>
            <FormErrorBox>
              <FormError message={errors?.price?.message}></FormError>
            </FormErrorBox>
            <hr></hr>
            <InputContainer>
              <InputName>??????</InputName>
              <SaleBtContainer>
                <SaleBtBox
                  className={discount === true ? "active" : ""}
                  onClick={() => setDiscount(true)}
                  type="button"
                >
                  <span>?????????</span>
                </SaleBtBox>

                <SaleBtBox
                  className={discount === true ? "" : "active"}
                  onClick={() => setDiscount(false)}
                  type="button"
                >
                  <span>????????????</span>
                </SaleBtBox>
              </SaleBtContainer>
            </InputContainer>
            {discount ? (
              <DiscountContainer>
                <InputContainer>
                  <InputName>????????????</InputName>
                  <SaleBtContainer>
                    <SmallInput
                      ref={register({})}
                      name="discountPrice"
                      type="number"
                      placeholder="???????????????"
                      onChange={(e) => {
                        clearErrors("result");
                        setInputs({ ...inputs, discountPrice: e.target.value });
                      }}
                    ></SmallInput>
                    <span>??? ??????</span>
                  </SaleBtContainer>
                </InputContainer>
                <hr></hr>
                <InputContainer>
                  <SaleTextContainer>
                    <RowFlexBox>
                      <span>?????????</span>
                    </RowFlexBox>
                    <RowFlexBox>
                      <h1>
                        {parseInt(inputs.originalPrice) -
                          parseInt(inputs.discountPrice)}
                      </h1>
                      <span>??? (</span>
                      <span>{}</span>
                      <span>)??? ??????</span>
                    </RowFlexBox>
                    <RowFlexBox></RowFlexBox>
                  </SaleTextContainer>
                </InputContainer>
              </DiscountContainer>
            ) : null}
          </TopicContainer>
          {/* 
          <InputContainer>
            <InputName>?????? ?????? ??????</InputName>
            <ProductInput
              ref={register({ required: "?????? ??????" })}
              name="adName"
              type="text"
              placeholder="?????? ?????? ??????"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>????????? ??????</InputName>
            <ProductSelect
              ref={register({ required: "????????? ??????" })}
              name="packageName"
              type="text"
            >
              <option>kakao</option>
              <option>naver</option>
              <option>instagram</option>
              <option>facebook</option>
              <option>google</option>
            </ProductSelect>
          </InputContainer>
          <InputContainer>
            <InputName>PC??????</InputName>
            <ProductInput
              ref={register()}
              name="productSliderPicture"
              type="text"
              placeholder=",??? ??????(optional)"
              defaultValue="http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung1.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung2.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung3.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung4.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung5.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung6.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung7.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung8.png,"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>?????????(HTML)</InputName>
            <ProductInput
              ref={register({ required: "?????????1" })}
              name="detailPage1"
              type="text"
              placeholder="HTML"
            ></ProductInput>
          </InputContainer> */}

          <AuthButton
            type="submit"
            value="????????????"
            disabled={!formState.isValid || loading}
          />
        </form>
      </UploadFormBox>
    </UploadContainer>
  );
}
export default ProductUploadLayout;
