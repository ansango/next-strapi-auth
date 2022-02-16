import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  destroyCookie({ res }, "jwt", {
    path: "/",
  });
  res.status(200).end();
};

export default logout;
