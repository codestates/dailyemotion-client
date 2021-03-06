import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import {
  withRouter,
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import EmailSignUp from "./EmailSignUp";
import "../css/LandingPage.css";
import Slider from "./Slider";

export default function LandingPage({ isLogin, handleResponseSuccess }) {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState("Loading...");

  const history = useHistory();

  const handleLoginSuccess = (response) => {
    if (response.profileObj) {
      axios
        // 이부분 서버랑 확인 (api에 없었음)
        .post(
          "https://localhost:5000/oauth",
          {
            email: response.profileObj.email,
            name: response.profileObj.name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setUser(response.profileObj);
          history.push("/mainpage");
          handleResponseSuccess();
        });
    }
  };

  const handleLoginFailure = (error) => {
    setLoding();
  };

  return (
    <container>
      <h1>💖 감정을 기록하는 간편한 방법</h1>
      <h5>이모지로 오늘 나만의 감정을 솔직하게 기록해보세요.</h5>
      <Slider />
      <div className="signin-wrapper">
        <div>
          <GoogleLogin
            className="btn-google"
            clientId="996092186048-291mg21lf890quda77fdgrqn11il9c0h.apps.googleusercontent.com"
            buttonText="구글 계정으로 시작하기"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div>
          <Link to="/emaillogin">
            <button className="btn-signin-e">이메일로 시작하기</button>
          </Link>
        </div>
        <div className="link">
          <span>아직 계정이 없으신가요?</span>
          <span className="empty"></span>
          <span className="link-signup">
            <Link to="/signup"> 👉 회원가입하기</Link>
          </span>
        </div>
      </div>
    </container>
  );
}

// const handleLogoutSuccess = response => {
//   setUser(null)

// }

// const OAuth = ({ processOAuthParams }) => {
//   useEffect(() => {
//     processOAuthParams()
//   }, [processOAuthParams])

//   return null
// }

// {
//    <Router>
//      <h1>감정을 기록하는 간편한 방법</>
//       <h5>이모지로 오늘 나만의 감정을 솔직하게 기록해보세요.</h5>
//         <div className="signin-wrapper">
//           <div>
//             <GoogleLogin
//               className="btn-google"
//               clientId="996092186048-291mg21lf890quda77fdgrqn11il9c0h.apps.googleusercontent.com"
//               buttonText="구글 계정으로 시작하기"
//               onSuccess={handleLoginSuccess}
//               onFailure={handleLoginFailure}
//               cookiePolicy={'single_host_origin'}
//             />
//           </div>
//           <div>
//             <Link to="/test">
//               <button className="btn-signin-e">이메일로 시작하기</button>
//             </Link>
//           </div>
//             <div className="route">
//               <Route path="/test" component={Test}></Route>
//               <Route path="/signup" component={EmailSignUp}></Route>
//             </div>
//           <div className="link">
//             <span>아직 계정이 없으신가요?</span>
//             <span className="empty"></span>
//             <span className="link-signup"><Link to="/signup">회원가입하기</Link></span>
//           </div>
//         </div>
//     </Router>
// }
