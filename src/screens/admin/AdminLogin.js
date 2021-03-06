import { gql, useMutation } from "@apollo/client";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { darkModeVar, isLoggedInvar, logUserIn } from "../../apollo";
import AuthBottomBox from "../../components/auth/AuthBottomBox";
import AuthFormBox from "../../components/auth/AuthFormBox";
import FormError from "../../components/shared/FormError";
import AuthLayout from "../../components/auth/AuthLayout";
import Seperator from "../../components/auth/Seperator";
import PageTitle from "../../components/pageTitle";
import routes from "../routes";

const Notification = styled.div`
  color: green;
`;

const BaseBox = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UpperBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const FormBox = styled.div`
  width: 50%;
  min-width: 320px;
`;

const AuthInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
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

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function AdminLogin() {
  const location = useLocation(); // ??????????????? ????????? ?????????, ?????????, ?????????????????? ??????
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  //????????? ??????
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    // ?????? ?????? Input.name??? ???????????? ????????????.
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const onSubmitInvalid = (data) => {
    console.log(data, "invalid");
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login"></PageTitle>
      <BaseBox>
        <UpperBox>
          <span>????????? ?????????</span>
        </UpperBox>
        <FormBox>
          <AuthFormBox>
            {/* <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div> */}
            <Notification>{location?.state?.message}</Notification>
            <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
              <AuthInput
                ref={register({
                  required: "???????????? ??????????????????",
                  minLength: { value: 1, message: "5??? ?????? ??????????????????" },
                  //validate: (currentValue) => currentValue.includes(".com"),
                })}
                onChange={clearLoginError}
                name="username"
                type="text"
                placeholder="?????????"
                hasError={Boolean(errors?.username?.message)}
              />
              <FormError message={errors?.username?.message}></FormError>
              <AuthInput
                ref={register({ required: "??????????????? ??????????????????" })}
                name="password"
                type="password"
                placeholder="????????????"
                onChange={clearLoginError}
                hasError={Boolean(errors?.username?.message)}
              />
              <FormError message={errors?.password?.message}></FormError>
              <AuthButton
                type="submit"
                value="Log in"
                disabled={!formState.isValid || loading}
              />
              <FormError message={errors?.result?.message}></FormError>
            </form>
          </AuthFormBox>
          <AuthBottomBox
            cta="????????? ????????????????"
            linkText="????????????"
            link={routes.adminSignUp}
          ></AuthBottomBox>
        </FormBox>
      </BaseBox>
    </AuthLayout>
  );
}
export default AdminLogin;
