import { useEffect, useState } from "react";
import LoginInputs from "../logic/LoginInputs";
import { supabase } from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";
import SubmitBtn from "../ui/SubmitBtn";
import AuthForm from "../ui/AuthForm";
import MobileSubmit from "../ui/MobileSubmit";
import MbLoginInput from "../logic/MbLoginInput";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);

  const inputProps = { email, setEmail, password, setPassword, errors, setErrors, loading };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrors({ form: "Incorrect username or password. Please try again or create an account." });
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <div className="block md:hidden w-full">
        <form 
          onSubmit={handleLogin} 
          autoComplete="on"
          className="flex flex-col fixed w-full inset-0 px-6 py-5 items-center justify-between bg-linear-to-b from-black to-neutral-900/98"
        >
          <header className="relative flex justify-center items-center w-full">
            <Link to="/" className="absolute left-0 text-neutral-100 rounded-sm">
              <XMarkIcon className="size-[30px]"/>
            </Link>
            <h1 className="text-[40px] text-white">Sign In</h1>
          </header>

          <div className="flex flex-col w-full gap-2">
            <MbLoginInput {...inputProps}  />
            <MobileSubmit variant="login" loading={loading} className="bg-neutral-950 rounded-md text-neutral-100 hover:border-white" />
            {errors.form && 
              <p className="text-red-400 text-md mt-1 text-center flex flex-col">
                {errors.form}
                <Link to="/forgot-password" className="text-blue-500 underline"> Forgot Password?</Link>
              </p>
            }
          </div>

          <div className="flex gap-1">
            <span className="text-neutral-400">Don't have an account?</span>
            <Link to="/signup" className="text-blue-500 underline">Sign up!</Link>
          </div>
        </form>
      </div>

      <div className="hidden md:block w-full">
        <form 
          onSubmit={handleLogin} 
          autoComplete="on"
        >
          <AuthForm
            emailLink="/signup"
            loading={loading}
            googleLoad={googleLoad}
            setGoogleLoad={setGoogleLoad}
            error={error}
            setError={setError}
          >
            <h1>Log into Ewan</h1>
            <LoginInputs {...inputProps} />
            {errors.form && <p className="text-red-400 text-sm mt-1">{errors.form}</p>}
            <SubmitBtn variant="login" loading={loading} />
          </AuthForm>
        </form>
      </div>
    </>
  );
}
