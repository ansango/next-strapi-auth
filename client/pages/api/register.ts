import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

type Data = {
  username: string;
  password: string;
  email: string;
};

const register = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) => {
  const { username, password, email } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username,
        email,
        password,
      }
    );

    setCookie({ res }, "jwt", response.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).end();
  } catch (e: any) {
    res.status(e.response.status).send(e.response.data.error);
  }
};

export default register;
