import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";
import { User } from "../types";

export const useAuth = () => {
    const query = useQuery({
        queryKey: ["auth", "user"],
        queryFn: getUser,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    return {
        user: query.data as User | undefined,
        isAuthenticated: !!query.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
};