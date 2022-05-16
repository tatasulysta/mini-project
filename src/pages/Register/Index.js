import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GETemail } from "../../GraphQL/query";
import { Adduser } from "../../GraphQL/mutation";

import { Button } from "../../components/Button";
import "../Login/style.css";
import { Modal } from "react-bootstrap";
import MainNav from "../../components/MainNav";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [err, setErr] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [able, setAble] = useState(false);
  const [getData, { data: search }] = useLazyQuery(GETemail);
  const [addUser, { data: done, loading }] = useMutation(Adduser);
  const emailRex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setData({ ...data, [e.target.name]: e.target.value });
    if (key === "username") {
      if (val.length < 4) {
        setErr({ ...err, username: "Username is too short" });
      } else {
        setErr({ ...err, username: "" });
      }
    }
    if (key === "email") {
      if (!emailRex.test(val)) {
        setErr({ ...err, email: "Email is invalid" });
      } else {
        setErr({ ...err, email: "" });
      }
    }
    if (key === "password") {
      if (val.length < 5) {
        setErr({ ...err, password: "password is too short" });
      } else {
        setErr({ ...err, password: "" });
      }
    }
  };

  const register = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        email: data.email,
        password: data.password,
        username: data.username,
      },
    });
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (done?.insert_user.affected_rows === 1) {
      setShow(true);
    }
  }, [done]);

  useEffect(() => {
    if (data.email === "" && data.password === "" && data.username === "") {
      setAble(false);
    } else if (err.email === "" && err.username === "" && err.password === "") {
      setAble(true);
    } else {
      setAble(false);
    }
  }, [data, err]);
  useEffect(() => {}, [search]);
  const debounces = useDebounce(data.email, 1000);
  useEffect(() => {
    getData({
      variables: {
        _eq: debounces,
      },
    });
    if (err.email === "") {
      if (search?.user.length === 0) {
        setErr({ ...err, email: "" });
      } else {
        if (search?.user[0].email === debounces) {
          setErr({ ...err, email: "Email is already registered" });
        } else {
          setErr({ ...err, email: "" });
        }
      }
    }
    // eslint-disable-next-line
  }, [debounces, search]);

  return (
    <>
      <MainNav styles={"secondary"} title={"Login"} />
      <div className="d-flex justify-content-center container-log">
        <div className="container container-fluid my-auto p-4 container-log-inside">
          <div className="row ">
            <div
              className="col-md-4 justify-content-center my-auto mx-auto"
              style={{ background: "white" }}
            >
              <img
                src="./assets/images/register.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 contents" style={{ background: "white" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4 row">
                    <div className="col-lg-10 col-sm-9 col-md-9 col-8">
                      <h3>Welcome !</h3>
                      <p className="mb-4">register your account</p>
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

                  <form
                    className="justify-content-center p-2"
                    onSubmit={register}
                  >
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        Email
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="email"
                          className="form-control"
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="username">
                        Username
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control"
                          placeholder="username"
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password
                        <input
                          type="text"
                          id="password"
                          required
                          name="password"
                          className="form-control"
                          placeholder="password"
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
                      {err.username !== "" && (
                        <li>
                          {err.username} <br />
                        </li>
                      )}

                      {err.password !== "" && (
                        <li>
                          {err.password} <br />
                        </li>
                      )}
                    </ul>
                    <div className="mx-auto">
                      <Button
                        type={"submit"}
                        children={"Register"}
                        butSize={"small"}
                        radius={"10px"}
                        onClick={register}
                        able={able}
                      />
                    </div>
                  </form>

                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal
          show={show}
          onHide={() => handleClose()}
          style={{ marginTop: "25vh" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sucess</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have registered for your account</Modal.Body>
          <Modal.Footer>
            <Button
              butStyle={"secondary"}
              onClick={() => handleClose()}
              able={true}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/login")}
              able={true}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}
export default Login;
