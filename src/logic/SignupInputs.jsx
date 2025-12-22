import BaseInput from "../ui/BaseInput";

export default function SignupInputs({
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
}) {
  return (
    <>
      <div className="flex gap-3 mb-2 w-full">
        <div className="w-1/2">
          <BaseInput
            value={firstName}
            onChange={
                (e) => setFirstName(e.target.value)
            }
            error={errors.firstName}
            placeholder="First Name"
            name="firstName"
            autoComplete="given-name"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div className="w-1/2">
          <BaseInput
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            placeholder="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="w-full">
        <BaseInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="username"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="w-full">
        <BaseInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="w-full">
        <BaseInput
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          error={errors.confirmPass}
          type="password"
          placeholder="Confirm Password"
          name="confirmPass"
          autoComplete="new-password"
        />
        {errors.confirmPass && <p className="text-red-400 text-sm mt-1">{errors.confirmPass}</p>}
      </div>
    </>
  );
}
