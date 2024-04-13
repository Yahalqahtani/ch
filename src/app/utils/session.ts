import { SessionOptions } from "iron-session";


export type SessionData={

  userId?: number;
  username?:string;
  isAdmin:boolean;
  isLoggedIn:boolean;
}

export const defaultSession:SessionData={
  isLoggedIn: false,
  isAdmin: false
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY_SESSION!,
  cookieName: "UserInfo",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
    httpOnly:true
  },
};


