import { WallPrivacy } from '../generated/prisma/client.js';
export declare class RegisterDto {
    email: string;
    username: string;
    displayName: string;
    password: string;
}
export declare class UsernameAvailabilityDto {
    username: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ResendVerificationDto {
    email: string;
}
export declare class UpdateProfileDto {
    displayName?: string;
    bio?: string;
    website?: string;
    location?: string;
    wallPrivacy?: WallPrivacy;
    showFavorites?: boolean;
    showSubscriptions?: boolean;
}
export declare class RequestPasswordResetDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
