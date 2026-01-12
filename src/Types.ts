interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

interface Blog {
  id?: string | number;
  title: string;
  content: string;
}

interface NewBlog {
  title: string;
  content: string;
}

export type { User, Blog, NewBlog , NewUser};