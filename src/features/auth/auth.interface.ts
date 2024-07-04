export type User = {
    _id: string;
    name: string;
    role: string;
    email: string;
    teams:[string];
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
  
  export type UserInfo = {
    _id: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    photo: string;
    contact_info: Array<{ type: string; value: string }>;
    family_contacts: Array<{ name: string; relation: string; contact: string }>;
    present_training_events: number;
    total_training_events: number;
    training_attendance_ratio: number;
    present_game_events: number;
    total_game_events: number;
    game_attendance_ratio: number;
    role: string;
};