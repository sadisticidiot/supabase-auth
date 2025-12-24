import BaseInput from "../ui/BaseInput";
import { motion, AnimatePresence } from "framer-motion";

export default function MbSignupInput({
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
            className="bg-neutral-900 py-5"
            placeholder="First Name"
            name="firstName"
            autoComplete="given-name"
          />
        <AnimatePresence>
          {errors.firstName && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {errors.firstName}
            </motion.p>
          )}
        </AnimatePresence>
        </div>

        <div className="w-1/2">
          <BaseInput
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            className="bg-neutral-900 py-5"
            placeholder="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        <AnimatePresence>
          {errors.lastName && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {errors.lastName}
            </motion.p>
          )}
        </AnimatePresence>
        </div>
      </div>

      <div className="w-full">
        <BaseInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          className="bg-neutral-900 py-5"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="username"
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full">
        <BaseInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          className="bg-neutral-900 py-5"
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
        />
        <AnimatePresence>
          {errors.password && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {errors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full">
        <BaseInput
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          error={errors.confirmPass}
          className="bg-neutral-900 py-5"
          type="password"
          placeholder="Confirm Password"
          name="confirmPass"
          autoComplete="new-password"
        />
        <AnimatePresence>
          {errors.confirmPass && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {errors.confirmPass}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
