import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
        setLoading(false);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
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
            Sign up to explore insightful blogs, share your unique stories, and
            connect with like-minded individuals.
          </p>
        </div>

        {/* for Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="mb-1">
              <Label value="Your Username" />
              <TextInput
                placeholder="Enter Username"
                type="text"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Enter password"
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-small mt-4">
            <span>Have an account ?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
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
