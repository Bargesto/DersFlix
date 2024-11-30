export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  class: string;
  subject: string;
  userId: string;
}

export interface Category {
  class: string;
  subjects: string[];
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}