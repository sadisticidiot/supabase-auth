import { useEffect, useState } from "react";
import LoginInputs from "../logic/LoginInputs";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../ui/SubmitBtn";
import AuthForm from "../logic/AuthForm";

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
  );
}
