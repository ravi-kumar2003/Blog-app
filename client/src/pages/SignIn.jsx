import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInfailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInfailure("please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInfailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInfailure(data.message));
    }
  };

  return (
    <div className="min-ht-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* for left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl ">
            <span className="p-2 bg-gradient-to-r from-indigo-500 via-purple-900 to-pink-500 rounded-md">
              TeachDaddy
            </span>
          </Link>
          <p className="text-sm mt-5">
            Sign In to explore insightful blogs, share your unique stories, and
            connect with like-minded individuals.
          </p>
        </div>

        {/* for Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="mb-1">
              <Label value="Your email" />
              <TextInput
                placeholder="name@company.com"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="Your Password" />
              <TextInput
                placeholder="password"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-small mt-4">
            <span>Don't have an account </span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 flex" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
