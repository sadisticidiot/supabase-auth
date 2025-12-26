import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseInput from "../ui/BaseInput";
import SubmitBtn from "../ui/SubmitBtn";
import { supabase } from "../supabase-client";
import MobileSubmit from "../ui/MobileSubmit";

export default function ResetPass() {
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setsuccess] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if (success === "") return 

        const timer = setTimeout(() => navigate("/login", { replace: true }), 3000)
        return () => clearTimeout(timer)
    }, [success])

    const validPassword = () => {
        if (!newPass) {
            setError("Password cannot be empty.");
            return false;
        }
        if (newPass.length < 8) {
            setError("Password must be at least 8 characters.");
            return false;
        }
        if (newPass !== confirmNewPass) {
            setError("Password does not match.")
            return false
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

        const { error } = await supabase.auth.updateUser({ password: newPass });
        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        setLoading(false)
        setNewPass("");
        setsuccess("Password succesfully changed. You'll be redirected shortly.")
    };

    return (
        <>
            <div className="block md:hidden w-full">
                <form className="form-base flex-col justify-between p-3" onSubmit={handleReset}>
                    <h1 className="text-[80px]">Reset your password</h1>
                    <div className="flex flex-col w-full gap-4">
                        <BaseInput
                            type="password"
                            value={newPass}
                            onChange={(e) => {
                                setNewPass(e.target.value);
                                setError("");
                            }}
                            className="bg-neutral-900 py-6"
                            placeholder="New Password"
                            name="password"
                            autoComplete="new-password"
                        />
                        <BaseInput
                            type="password"
                            value={confirmNewPass}
                            onChange={(e) => {
                                setConfirmNewPass(e.target.value);
                                setError("");
                            }}
                            className="bg-neutral-900 py-6"
                            placeholder="Corfirm new password"
                            name="password"
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <p className="text-red-400">{error}</p>}
                    <MobileSubmit variant="reset" loading={loading} />
                    {success && <p className="text-lime-500">{success}</p>}
                </form>
            </div>

            <div className="hidden md:block">
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
                        <BaseInput
                            type="password"
                            value={confirmNewPass}
                            onChange={(e) => {
                                setConfirmNewPass(e.target.value);
                                setError("");
                            }}
                            placeholder="Confirm new password"
                            name="password"
                            autoComplete="new-password"
                        />
                        {error && <p className="text-red-400">{error}</p>}
                        <SubmitBtn variant="reset" loading={loading} />
                        {success && <p className="text-lime-500">{success}</p>}
                    </div>
                </form>                
            </div>
        </>

    );
}
