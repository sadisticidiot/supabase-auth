import { useEffect, useState } from "react";
import LoginInputs from "../logic/LoginInputs";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../ui/SubmitBtn";
import AuthForm from "../logic/AuthForm";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);

  const inputProps = { email, setEmail, password, setPassword, errors, setErrors, submitting };

  // Auto clear errors after 5s
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timer = setTimeout(() => setErrors({}), 5000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrors({ form: "Incorrect username or password. Please try again or create an account." });
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <form 
      onSubmit={handleLogin} 
      autoComplete="on"
    >
      <AuthForm
        emailLink="/signup"
        submitting={submitting}
        googleLoad={googleLoad}
        setGoogleLoad={setGoogleLoad}
      >
        <h1>Log into Ewan</h1>
        <LoginInputs {...inputProps} />
        {errors.form && <p className="text-red-400 text-sm mt-1">{errors.form}</p>}
        <SubmitBtn variant="login" loading={submitting} />
      </AuthForm>
    </form>
  );
}
