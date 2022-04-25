import { isLoggedInvar } from "../apollo";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($id: Int!) {
    seeProfile(id: $toNumber) {
      id
      email
    }
  }
`;

function MyPage() {
  const params = useParams();
  const toNumber = parseInt(params.id);
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      toNumber,
    },
  });
  return (
    <div>
      <h1>MyPage</h1>
    </div>
  );
}

export default MyPage;
