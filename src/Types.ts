
interface User {
  email: string;
  password: string;
}

interface Blog {
  id?: string | number;
  title: string;
  content: string;
  user_id?: string
  created_at?: string
}

interface NewBlog {
  title: string;
  content: string;
}

// interface BlogsState {
//   blogs: Blog[]
//   singleBlog: null | Blog
//   status: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

export type { User, Blog, NewBlog };