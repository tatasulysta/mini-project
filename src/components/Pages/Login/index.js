import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GETuser } from "../../../GraphQL/query";
import Cookies from "universal-cookie";
import { Button } from "../../Button";
import "./style.css";
const cookie = new Cookies();
function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [getData, { data: dataUser }] = useLazyQuery(GETuser);
  const login = (e) => {
    e.preventDefault();
    getData({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  useEffect(() => {}, [data, dataUser]);
  useEffect(() => {
    if (dataUser?.user.length === 1) {
      if (state === true) {
        cookie.set("loginID", dataUser.user[0].id);
      }
      if (state === false) {
        cookie.set("loginID", dataUser.user[0].id, { expires: 0 });
      }
      return navigate("/menu");
    }
    if (cookie.get("loginID")) {
      return navigate("/menu");
    }
  }, [dataUser, state]);

  return (
    <>
      <div className="d-flex justify-content-center container-log">
        <div className="container container-fluid my-auto p-4 container-log-inside">
          <div className="row ">
            <div
              className="col-md-4 justify-content-center my-auto mx-auto"
              style={{ background: "white" }}
            >
              <img
                src="./assets/images/login.png"
                alt=""
                srcset=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 contents" style={{ background: "white" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Log In</h3>
                    <p className="mb-4">welcome Back !</p>
                  </div>

                  <form className="justify-content-center p-2" onSubmit={login}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlfor="email">
                        Email
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="email"
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlfor="password">
                        Password
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>

                    <div className="mx-auto">
                      <Button
                        type={"submit"}
                        children={"Sign In"}
                        butSize={"small"}
                        radius={"10px"}
                        onClick={login}
                      />
                    </div>
                  </form>
                  <p>
                    Don't have account? <a href="/register">Register</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
