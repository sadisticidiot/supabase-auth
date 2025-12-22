import { motion, AnimatePresence } from "framer-motion";
import BaseInput from "../ui/BaseInput";

export default function LoginInputs({ email, setEmail, password, setPassword, errors, setErrors, submitting }) {
  return (
    <>
      <div className="w-full">
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
    </>
  );
}
