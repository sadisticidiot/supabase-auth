import { useEffect, useState } from "react";
import LoginInputs from "../logic/LoginInputs";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../ui/SubmitBtn";
import AuthForm from "../ui/AuthForm";
import MobileAuth from "../ui/MobileAuth";
import MbLoginInput from "../logic/MbLoginInput";
import MobileSubmit from "../ui/MobileSubmit";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);

  const inputProps = { email, setEmail, password, setPassword, errors, setErrors, loading };

  // Auto clear errors after 5s
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timer = setTimeout(() => setErrors({}), 5000);
    return () => clearTimeout(timer);
  }, [errors]);

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
        >
          <MobileAuth
            emailLink="/signup"
            loading={loading}
            googleLoad={googleLoad}
            setGoogleLoad={setGoogleLoad}
            error={error}
            setError={setError}
          >
            <h1 className="text-[60px]">Log into Ewan</h1>
            <MbLoginInput {...inputProps} />
            {errors.form && <p className="text-red-400 text-sm mt-1">{errors.form}</p>}
            <MobileSubmit variant="login" loading={loading} />
          </MobileAuth>
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
