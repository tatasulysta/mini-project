import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GETuser } from "../../../GraphQL/query";
import Cookies from "universal-cookie";
import { Button } from "../../Button";
import MainNav from "../../MainNav";
import "./style.css";
import { Link } from "react-router-dom";
const cookie = new Cookies();
function Login() {
  const [getData, { data: dataUser, loading }] = useLazyQuery(GETuser);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    email: "",
    password: "",
    wrong: "",
  });
  const [able, setAble] = useState(false);
  const navigate = useNavigate();
  const emailRex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setData({ ...data, [e.target.name]: e.target.value });

    if (key === "email") {
      if (!emailRex.test(val)) {
        setErr({ ...err, email: "Email is invalid" });
      } else {
        setErr({ ...err, email: "" });
      }
    }
  };
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
    if (data.email === "" && data.password === "") {
      setAble(false);
    } else if (err.email === "" && err.password === "") {
      setAble(true);
    } else {
      setAble(false);
    }
  }, [data, err]);

  useEffect(() => {
    if (dataUser !== undefined) {
      if (dataUser?.user.length === 1) {
        cookie.set("loginID", dataUser.user[0].id);
        return navigate("/menu");
      } else if (dataUser?.user.length !== 1) {
        setErr({ ...err, wrong: "Wrong Email or password" });
      }
      if (cookie.get("loginID")) {
        return navigate("/menu");
      }
    }
    // eslint-disable-next-line
  }, [dataUser]);

  return (
    <>
      <MainNav styles={"secondary"} title={"Register"} />
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
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 contents" style={{ background: "white" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4 row">
                    <div className="col-lg-10 col-sm-9 col-md-9 col-8">
                      <h3>Log In</h3>
                      <p className="mb-4">Welcome back!</p>
                    </div>

                    {loading && (
                      <div className="col-lg-2 col-sm-3 col-md-3 col-3">
                        <img
                          src="assets/loading.gif"
                          style={{ width: "90px" }}
                          alt=""
                        />
                      </div>
                    )}
                  </div>

                  <form className="justify-content-center p-2" onSubmit={login}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
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
                      <label className="form-label" htmlFor="password">
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
                    <ul className="error">
                      {err.email !== "" && (
                        <li>
                          {err.email} <br />
                        </li>
                      )}
                      {err.wrong !== "" && (
                        <li>
                          {err.wrong} <br />
                        </li>
                      )}
                    </ul>
                    <div className="mx-auto">
                      <Button
                        type={"submit"}
                        children={"Sign In"}
                        butSize={"small"}
                        radius={"10px"}
                        able={able}
                        onClick={login}
                      />
                    </div>
                  </form>
                  <p>
                    Don't have account? <Link to="/register">Register</Link>
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
