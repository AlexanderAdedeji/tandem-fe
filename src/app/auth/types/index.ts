import { z } from "zod";
import React from "react";

export const passwordValidationSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one digit",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one special character",
    });


export const emailSchema = z.object({
    email: z.string().email({ message: "Enter a valid email address" })
})

export const loginSchema = emailSchema.extend({
    password: z.string() // Login should only validate that password exists, not full validation
})




export const signupSchema = emailSchema.extend({
    password: passwordValidationSchema,
    first_name: z.string().min(3).max(100),
    last_name: z.string().min(3).max(100),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});






export type LoginSchemaInterface = z.infer<typeof loginSchema>
export type EmailSchemaInterface = z.infer<typeof emailSchema>
export type SignUpSchemaInterface = z.infer<typeof signupSchema>











