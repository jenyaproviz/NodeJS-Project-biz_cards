// User type for login:
export type RequestUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export type Role = {
  name: string;
};

//ammend express - add RequestUser to Request
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}
