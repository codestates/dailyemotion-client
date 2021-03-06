import React, { useState } from "react";
import validation from "./validation";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/EmailSignUp.css";
import swal from "sweetalert";
axios.defaults.withCredentials = true;
export default function EmailSignUp() {
  const [values, setValues] = useState({
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (key) => (e) => {
    setValues({
      ...values,
      [key]: e.target.value,
    });
    setErrors(validation(values));
  };
  const history = useHistory();
  const handleSignup = (e) => {
    e.preventDefault();
    const { nickName, email, password, confirmPassword } = values;
    if (!email || !password || !nickName || !confirmPassword) {
      return swal("Oops", "모든 항목은 필수입니다.", "error");
    }
    // const res =
    axios
      .post(
        "https://localhost:5000/user/signup",
        {
          nickName,
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data);
        history.push("/login");
      });
  };
  return (
    <div className="container">
      {/* <div className="img-left"> */}
      {/* <img src="images/test01.jpg" alt="test" */}
      {/* className="test-img"/> */}
      {/* </div> */}
      <div className="app-wrapper">
        <div>
          <h2 className="title"> 💖 하루의 감정을 쉽게 기록해 보세요.</h2>
        </div>
        <form className="form-wrapper">
          <div className="nickName">
            {" "}
            😁 닉네임
            <input
              className="input"
              type="text"
              placeholder="닉네임을 입력해주세요"
              onChange={handleChange("nickName")}
            />
            {errors.nickName && (
              <p className="error-signup">{errors.nickName}</p>
            )}
          </div>
          <div className="email">
            {" "}
            📧 이메일
            <input
              className="input"
              type="text"
              placeholder="이메일를 입력해주세요"
              onChange={handleChange("email")}
            />
            {errors.email && <p className="error-signup">{errors.email}</p>}
          </div>
          <div className="password">
            {" "}
            🔐 비밀번호
            <input
              className="input"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange("password")}
            />
            {errors.password && (
              <p className="error-signup">{errors.password}</p>
            )}
          </div>
          <div className="confirmPassword">
            <input
              className="input"
              type="password"
              placeholder="비밀번호를 다시한번 입력해주세요"
              onChange={handleChange("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error-signup">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <button className="btn-singup" onClick={handleSignup}>
              회원가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
