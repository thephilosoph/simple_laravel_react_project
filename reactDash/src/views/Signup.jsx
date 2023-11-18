import axiosClient from "../axios-client.js";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confpassRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const onSubmit = (event) => {
        event.preventDefault();
        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confpassRef.current.value,
        };
        // console.log(payLoad);
        axiosClient
            .post("/signup", payLoad)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <form onSubmit={onSubmit} className="animated">
            <p className="title">Make new Account</p>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
                ref={confpassRef}
                type="password"
                placeholder="Password Confirmation"
            />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already Registered?{" "}
                <Link to="/login">Signin into your Account </Link>
            </p>
        </form>
    );
}
