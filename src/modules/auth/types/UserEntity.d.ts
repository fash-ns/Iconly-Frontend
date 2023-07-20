export interface UserEntity {
    id: number;
    name: string;
    email: string;
}

export interface AuthContext {
    loading: boolean;
    user: UserEntity | null;
}