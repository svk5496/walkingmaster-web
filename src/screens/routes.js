const routes = {
  home: "/",
  signUp: "/sign-up",
  login: "/login",
  mypage: "/mypage",
  myHeart: "/my-heart",
  cart: "/cart",
  product: "/product/:id",
  quiz: "/quiz",
  //어드민 공통
  admin: "/rhksflwkdjemals",
  adminStore: "/rhksflwkdjemals/store",
  adminLogin: "/admin-login",
  // 유저 관련 page
  adminUser: "/rhksflwkdjemals/user",
  adminUserEdit: "/rhksflwkdjemals/user/edit/:id",
  adminUserNew: "/rhksflwkdjemals/user/new",
  // 상품 관련 page
  adminProduct: "/rhksflwkdjemals/product",
  adminProductEdit: "/rhksflwkdjemals/product/edit/:id",
  adminProductNew: "/rhksflwkdjemals/product/new",
};
export default routes;
