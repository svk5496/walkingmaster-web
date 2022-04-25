import styled from "styled-components";

export const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export function numberWithCommas(obj) {
  return obj.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function roundNumber(price, dRate) {
  const Nprice = parseInt(price);
  const temp1 = Nprice - Nprice * dRate * 0.01;
  const temp2 = temp1 / 1000;
  const temp3 = Math.ceil(temp2);
  const result = temp3 * 1000;
  return result;
}
