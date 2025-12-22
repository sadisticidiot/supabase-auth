import { useEffect, useState } from "react";
import SignupInputs from "../logic/SignupInputs";
import { supabase } from "../supabase-client";
import SubmitBtn from "../ui/SubmitBtn";
import verifyImg from "/Icon.png";
import AuthForm from "../logic/AuthForm";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputProps = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPass,
    setConfirmPass,
    errors,
    setErrors,
  };

  // Auto clear errors after 6s
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const timer = setTimeout(() => setErrors({}), 6000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = {};

    // First & Last Name validation
    const nameRegex = /^[A-Z][a-zA-Z-' ]*$/;
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    else if (!nameRegex.test(firstName)) newErrors.firstName = "Must start with a capital letter.";

    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    else if (!nameRegex.test(lastName)) newErrors.lastName = "Must start with a capital letter.";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Invalid email.";

    // Password validation
    if (!password) newErrors.password = "Password cannot be empty.";
    else if (password.length < 8) newErrors.password = "Password too short (min 8 chars).";

    // Confirm password validation
    if (password !== confirmPass) newErrors.confirmPass = "Passwords do not match.";

    // Stop if errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Signup via Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setErrors({ form: error.message });
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleResend = async () => {
    setResending(true);
    setMessage("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Verification email resent.");
    }
    setResending(false);
  };

  function Verification() {
    return (
      <div className="form-base">
        <div className="parent-base">
          <img src={verifyImg} />
          <h1>Verify your email</h1>
          <span>Click the link sent to {email}.</span>
          <button onClick={handleResend} disabled={resending} className="button-base">
            {resending ? "Resending..." : "Resend verification email."}
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      {submitted ? (
        <Verification />
      ) : (
        <form onSubmit={handleSignup} autoComplete="on">
          <AuthForm emailLink="/login" loading={loading}>
            <h1>Create your account</h1>
            <SignupInputs {...inputProps} />
            {errors.form && <p className="text-red-400 text-sm mt-1">{errors.form}</p>}
            <SubmitBtn variant="signup" loading={loading} />
          </AuthForm>
        </form>
      )}
    </>
  );
}
``
