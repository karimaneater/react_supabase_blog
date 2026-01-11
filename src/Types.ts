interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export type { User, Blog };