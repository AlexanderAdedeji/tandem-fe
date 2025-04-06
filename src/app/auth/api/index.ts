
import { toast } from 'sonner';

import request, { RequestMethod } from '@/lib/service/request';
import { LoginSchemaInterface , SignUpSchemaInterface} from '../types';




const login = async (params: LoginSchemaInterface) => {
    // Using the no-auth instance by passing { useNoAuth: true }
    return await request(RequestMethod.POST, '/auth/login', params, { useNoAuth: true });
};

const signUp = async (params: SignUpSchemaInterface) => {
    return await request(RequestMethod.POST, '/users/user', params, { useNoAuth: true });
};

// const verifyEmail = async (token: string, device_id: string | null = null) => {
//     const payload = { token: { token }, device_id };
//     const data = await request(RequestMethod.POST, '/auth/verify_email/', payload, { useNoAuth: true });
//     // toast.success(data?.message || "Verification successful");
//     toast.success("Verification successful");

//     return data;

// };

// const resetPassword = async (params: ResetPasswordSchemaInterface) => {
//     const data = await request(RequestMethod.POST, '/auth/reset_password/', params, { useNoAuth: true });
//     // toast.success(data?.message || "Password Reset successful");
//     toast.success("Password Reset successful");
//     return data;
// };

// const forgotPassword = async (params: EmailSchemaInterface) => {
//     return await request(RequestMethod.POST, `/auth/forgot_password?email=${params.email}`, params, { useNoAuth: true });
// };

// const resendEmailVerification = async (params: EmailSchemaInterface) => {
//     return await request(RequestMethod.POST, `/auth/resend_verification_token?email=${params.email}`, params, { useNoAuth: true });
// };

const authService = { login, signUp,
    //  verifyEmail, resetPassword, forgotPassword, resendEmailVerification
     };

export default authService;
