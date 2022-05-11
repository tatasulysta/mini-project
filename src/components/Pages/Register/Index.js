import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GETuser, GETemail } from "../../../GraphQL/query";
import { Adduser } from "../../../GraphQL/mutation";
import Cookies from "universal-cookie";
import { Button } from "../../Button";
import "../Login/style.css";
import { Modal } from "react-bootstrap";

const cookie = new Cookies();
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [error, setErr] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [addUser, { data: done, loading }] = useMutation(Adduser);
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
  useEffect(() => {
    if (done?.insert_user.affected_rows === 1) {
      //   alert("berhasil");
      //   navigate("/login");
      setShow(true);
    }
  }, [done]);
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

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
                src="./assets/images/register.png"
                alt=""
                srcset=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 contents" style={{ background: "white" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Welcome !</h3>
                    <p className="mb-4">register your account</p>
                  </div>

                  <form
                    className="justify-content-center p-2"
                    onSubmit={register}
                  >
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlfor="email">
                        Email
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="email"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlfor="username">
                        Username
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control"
                          placeholder="username"
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlfor="password">
                        Password
                        <input
                          type="text"
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="password"
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>

                    <div className="mx-auto">
                      <Button
                        type={"submit"}
                        children={"Register"}
                        butSize={"small"}
                        radius={"10px"}
                        onClick={register}
                      />
                    </div>
                  </form>
                  <p>
                    Already have an account? <a href="/login">Login</a>
                  </p>
                  {loading && <h1>loadingg... </h1>}
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
            <Button butStyle={"secondary"} onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}
export default Login;
