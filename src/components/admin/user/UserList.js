import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useCallback, useState } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../../screens/routes";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  margin-right: 30px;
  padding-top: 30px;
  width: 100%;
`;

const Base = styled.div`
  width: 100%;
  height: 100%;
`;

const SubjectContainer = styled.div`
  width: 100%;
  padding-right: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${(props) => props.theme.bgGray};
  span {
  }
  label {
    cursor: pointer;
  }
  input {
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    -ms-appearance: checkbox !important;
    -o-appearance: checkbox !important;
    appearance: checkbox !important;
    accent-color: ${(props) => props.theme.secondary};

    margin-right: 10px;
  }
`;

const UserContainer = styled.div`
  width: auto;
  display: flex;

  flex-direction: column;
`;

const UserRow = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  display: flex;
  border-bottom: solid 1px lightgrey;
  input {
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    -ms-appearance: checkbox !important;
    -o-appearance: checkbox !important;
    appearance: checkbox !important;
    margin-right: 10px;
    accent-color: ${(props) => props.theme.secondary};
  }
  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const PlaceOrderBt = styled.div`
  padding: 8px 20px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteBt = styled(PlaceOrderBt)`
  background-color: tomato;
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  span {
    width: 120px;
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      ok
      error
    }
  }
`;

function UserList({ data }) {
  const [checkedList, setCheckedList] = useState([]);

  const dataList = [];

  if (data?.seeUsers) {
    data.seeUsers?.Users.forEach((user) => dataList.push(user));
  }

  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];
        dataList.forEach((list) => checkedListArray.push(list));
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [dataList]
  );

  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedList([...checkedList, list]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list));
      }
    },
    [checkedList]
  );

  const onCompleted = (data) => {
    const {
      deleteProduct: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
  };

  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted,
  });

  const deleteBt = () => {
    for (let i = 0; i < checkedList.length; i++) {
      deleteUser({
        variables: {
          id: checkedList[i].id,
        },
      });
    }
    if (checkedList.length > 0) {
      alert("삭제가 완료되었습니다.");
      window.location.reload();
    } else {
      alert("삭제할 항목을 먼저 눌러주세요");
    }
  };

  return (
    <Content>
      {loading ? null : (
        <Base>
          <span>총 {data?.seeUsers?.totalUsers}명</span>

          <ButtonContainer></ButtonContainer>
          <SubjectContainer>
            <label>
              <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={
                  checkedList?.length === 0
                    ? false
                    : checkedList?.length === dataList?.length
                    ? true
                    : false
                }
              ></input>
              <span>id</span>
            </label>
            <span>이름</span>
            <span>구매횟수</span>
            <span>핸드폰번호</span>
          </SubjectContainer>

          <UserContainer>
            {data?.seeUsers.Users.length > 0 ? (
              <div>
                {data?.seeUsers.Users.map((user) => (
                  <UserRow key={user.id}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          onCheckedElement(e.target.checked, user)
                        }
                        checked={checkedList.includes(user) ? true : false}
                      ></input>
                    </label>
                    <Link to={`/rhksflwkdjemals/user/edit/${user.id}`}>
                      <UserInfo>
                        <span>{user.id}</span>
                        <span>{user.firstName}</span>
                        <span>{user.totalPurchase}</span>
                        <span>
                          {user.phone.replace(
                            /(^02.{0}|^01.{1}|^[0-9]{3})([0-9]*)([0-9]{4})/,
                            "$1--$2--$3"
                          )}
                        </span>
                      </UserInfo>
                    </Link>
                  </UserRow>
                ))}
              </div>
            ) : (
              <div>데이터가 없습니다</div>
            )}
          </UserContainer>
        </Base>
      )}
    </Content>
  );
}
export default UserList;
