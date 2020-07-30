import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  /*
   2번째 파라미터 option
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입이 가능한 페이지
    false => 로그인한 유저는 출입 불가능한 페이지
  */
  /* 
    admin 만 들어갈 수 있는 페이지일경우 세번재 파라미터에 true를 준다
 */

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    // 서버에 request를 날려서 client의 상태를 가져온다 - redux 사용
    // 서버의 /api/users/auth 사용
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            //false => 로그인한 유저는 출입 불가능한 페이지
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
