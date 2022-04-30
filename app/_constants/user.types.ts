export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    role: string;
}

export type UserState = {
    token: string | null;
    tokenExpiration: string | null;
    status: 'idle' | 'loading' | 'loaded' | 'error';
    user: User | null;
}

export const initialUserState: UserState = {
    token: null,
    tokenExpiration: null,
    status: 'idle',
    user: null
}