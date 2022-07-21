import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import Login from "./screens/Login";
import MyHeart from "./screens/MyHeart";
import NotFound from "./screens/NotFound";
import Product from "./screens/Product";
import routes from "./screens/routes";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import User from "./screens/MyPage";
import MyPage from "./screens/MyPage";
import Quiz from "./screens/Quiz";
import AdminStore from "./screens/admin/AdminStore";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./screens/admin/AdminLogin";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Layout>
                  <Home></Home>
                </Layout>
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}

              <Route path={routes.login} exact>
                <Layout>
                  <Login></Login>
                </Layout>
              </Route>
              <Route path={`/mypage/:id`} exact>
                <Layout>
                  <MyPage></MyPage>
                </Layout>
              </Route>
              <Route path={routes.myHeart} exact>
                <MyHeart></MyHeart>
              </Route>
              <Route path={routes.cart} exact>
                <Cart></Cart>
              </Route>
              <Route path={routes.product} exact>
                <Layout>
                  <Product></Product>
                </Layout>
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp} exact>
                  <SignUp />
                </Route>
              ) : (
                <Route path={routes.quiz} exact>
                  <Quiz></Quiz>
                </Route>
              )}

              {isLoggedIn ? (
                <>
                  <Route path={routes.admin} exact>
                    <AdminLayout>
                      <AdminStore></AdminStore>
                    </AdminLayout>
                  </Route>
                  {/* 관리자 유저관리
                  <Route path={routes.adminUser} exact>
                    <AdminLayout>
                      <UserListLayout></UserListLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminUserEdit} exact>
                    <AdminLayout>
                      <UserDetail></UserDetail>
                    </AdminLayout>
                  </Route> */}
                  {/* 관리자 상품관리
                  <Route path={routes.adminProduct} exact>
                    <AdminLayout>
                      <ProductListLayout></ProductListLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminProductEdit} exact>
                    <AdminLayout>
                      <ProductDetail></ProductDetail>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminProductNew} exact>
                    <AdminLayout>
                      <ProductUploadLayout></ProductUploadLayout>
                    </AdminLayout>
                  </Route> */}
                </>
              ) : (
                <AdminLogin></AdminLogin>
              )}

              <Route></Route>

              <Route>
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
