import styled from "styled-components";

export const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColumBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  span {
    font-size: 14px;
  }
`;

export const HiddenInput = styled.input`
  width: 100%;
  display: none;
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

export const StyledSelect = styled.select`
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

export const StyledInput = styled.input`
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
  -webkit-appearance: none;
`;

export const RowFlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  span {
    margin: 10px;
  }
`;

export const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    margin: 0px 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: green;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${(props) => props.theme.secondary};
    border-radius: 20px;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: green;
  }
  a {
    text-decoration: none;
  }
`;
