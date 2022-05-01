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
    id: string | null;
    token: string | null;
    token_expiry: string | null;
    status: 'idle' | 'loading' | 'loaded' | 'error';
}

export const initialUserState: UserState = {
    id: null,
    token: null,
    token_expiry: null,
    status: 'idle',
}