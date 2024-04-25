export interface User {
    _id: string;
    name: string;
    role: string;
    photo: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
  }
  
  export interface AuthPayload {
    email: string;
    password: string;
  }
  