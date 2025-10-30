
export interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
