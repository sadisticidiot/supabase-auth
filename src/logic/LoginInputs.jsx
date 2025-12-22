import BaseInput from "../ui/BaseInput";

export default function LoginInputs({ email, setEmail, password, setPassword, errors, setErrors, submitting }) {
  return (
    <>
      <div className="w-full mb-2">
        <BaseInput
          disabled={submitting}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="username"
          error={errors.email}
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="w-full mb-2">
        <BaseInput
          disabled={submitting}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
          error={errors.password}
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
      </div>
    </>
  );
}
