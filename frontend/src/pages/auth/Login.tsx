import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    EyeIcon,
    EyeOffIcon,
    LockIcon,
    MailIcon,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/loginHook";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
        .string()
        .min(1, "Password is required")
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginProps = {
    onSuccess?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Login({ onSuccess, ...props }: LoginProps) {
    const navigate = useNavigate();
    const { login, loading, error, data, reset } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    /* -------------------------- Effects -------------------------- */

    useEffect(() => {
        if (data?.data?.token && onSuccess) {
            onSuccess();
        }
    }, [data, onSuccess]);

    /* -------------------------- Handlers -------------------------- */

    const onSubmit = async (formData: LoginFormData) => {
        try {
            await login(formData);
            navigate("/dashboard");
        } catch (err: any) {
            setError("root", {
                message: err?.message || "Login failed. Please try again.",
            });
        }
    };

    const handleInputChange = () => {
        clearErrors("root");
        reset();
    };

    const togglePasswordVisibility = () =>
        setShowPassword((prev) => !prev);

    /* --------------------------- Render --------------------------- */

    return (
        <div className={cn("flex flex-col gap-6")} {...props}>
            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="space-y-4">

                            {/* Email */}
                            <Field>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <MailIcon className="text-muted-foreground" />
                                    </InputGroupAddon>

                                    <InputGroupInput
                                        type="email"
                                        placeholder="Email"
                                        disabled={loading || isSubmitting}
                                        className={cn(
                                            "border-0 shadow-none focus-visible:ring-0",
                                            errors.email && "border-red-500"
                                        )}
                                        {...register("email", {
                                            onChange: handleInputChange,
                                        })}
                                    />
                                </InputGroup>

                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </Field>

                            {/* Password */}
                            <Field>
                                <div className="flex items-center justify-between mb-2">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="/forgot-password"
                                        className="text-sm hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>

                                <InputGroup>
                                    <InputGroupAddon>
                                        <LockIcon className="text-muted-foreground" />
                                    </InputGroupAddon>

                                    <InputGroupInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        disabled={loading || isSubmitting}
                                        className={cn(
                                            "border-0 shadow-none focus-visible:ring-0",
                                            errors.password && "border-red-500"
                                        )}
                                        {...register("password", {
                                            onChange: handleInputChange,
                                        })}
                                    />

                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="size-4 text-muted-foreground" />
                                            ) : (
                                                <EyeIcon className="size-4 text-muted-foreground" />
                                            )}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>

                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </Field>

                            {/* Root Error */}
                            {errors.root && (
                                <Field>
                                    <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-3 rounded-md text-center">
                                        {errors.root.message}
                                    </div>
                                </Field>
                            )}

                            {/* API Error */}
                            {error && !errors.root && (
                                <Field>
                                    <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-3 rounded-md text-center">
                                        {error}
                                    </div>
                                </Field>
                            )}

                            {/* Success */}
                            {data?.data?.token && (
                                <Field>
                                    <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-md text-center">
                                        {data.message || "Login successful! Redirecting..."}
                                    </div>
                                </Field>
                            )}

                            {/* Submit */}
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading || isSubmitting}
                                >
                                    {loading || isSubmitting
                                        ? "Logging in..."
                                        : "Login"}
                                </Button>

                                <FieldDescription className="text-center mt-4">
                                    Don&apos;t have an account?{" "}
                                    <a
                                        href="/signup"
                                        className="text-primary hover:underline"
                                    >
                                        Sign up
                                    </a>
                                </FieldDescription>
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}