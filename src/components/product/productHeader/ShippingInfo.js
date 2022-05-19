import styled from "styled-components";

const SShippingInfo = styled.div`
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

function ShippingComments({ data }) {
  console.log("freeshiping is " + data?.seeDetail.brand.freeShipping);
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

function ShippingInfo({ data }) {
  return (
    <SShippingInfo>
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
    </SShippingInfo>
  );
}

export default ShippingInfo;
