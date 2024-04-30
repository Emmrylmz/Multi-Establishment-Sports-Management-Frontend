export type User = {
    _id: string;
    name: string;
    role: string;
    photo: string;
    email: string;
  }
  
  export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
  }
  
  export type AuthPayload = {
    email: string;
    password: string;
  }
  