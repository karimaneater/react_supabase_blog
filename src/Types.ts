interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
}

interface NewBlog {
  title: string;
  content: string;
}

export type { User, Blog, NewBlog };