import { LoginRequest, UserProfileDto, UserProfileDTOSchema } from "@/dtos/login";
import { apiRoutes } from "../api-service/apiRoutes";
import { apiService } from "../api-service/apiService";

export async function loginAction(payload: LoginRequest): Promise<UserProfileDto> {
try {
    const response = await apiService.post<UserProfileDto>(apiRoutes.auth.login, { ...payload });
    return UserProfileDTOSchema.parse(response);
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
}

export async function fetchUserProfileAction(): Promise<UserProfileDto> {
    try {
        const response = await apiService.get<UserProfileDto>(apiRoutes.auth.profile);
        return UserProfileDTOSchema.parse(response);
    } catch (error) {
        console.error('Fetch user profile failed', error);
        throw error;
    }
}