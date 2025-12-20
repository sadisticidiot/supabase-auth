import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseInput from "../ui/BaseInput";
import SubmitBtn from "../ui/SubmitBtn";
import { supabase } from "../supabase-client";

export default function ResetPass() {
    const [newPass, setNewPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [validLink, setValidLink] = useState(true); // assume true, check hash below

    useEffect(() => {
        const hash = window.location.hash.substring(1); // remove '#'
        if (!hash.includes("access_token")) {
            setValidLink(false);
            setError("Invalid or expired password reset link.");
        }
    }, []);

    const validPassword = () => {
        if (!newPass) {
            setError("Password cannot be empty.");
            return false;
        }
        if (newPass.length < 8) {
            setError("Password must be at least 8 characters.");
            return false;
        }
        if (!/[A-Z]/.test(newPass)) {
            setError("Password must include at least one uppercase letter.");
            return false;
        }
        return true;
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!validPassword()) {
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({ password: newPass });
            if (error) throw error;

            setNewPass("");
            navigate("/login", { replace: true });
        } catch (err) {
            setError(err.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    if (!validLink) {
        return (
            <div className="form-base">
                <div className="parent-base">
                    <h1>Password Reset</h1>
                    <p className="text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <form className="form-base" onSubmit={handleReset}>
            <div className="parent-base">
                <h1>Reset your password</h1>
                <BaseInput
                    type="password"
                    value={newPass}
                    onChange={(e) => {
                        setNewPass(e.target.value);
                        setError("");
                    }}
                    placeholder="New Password"
                    name="password"
                    autoComplete="new-password"
                />
                {error && <p className="text-red-400">{error}</p>}
                <SubmitBtn variant="reset" loading={loading} />
            </div>
        </form>
    );
}
