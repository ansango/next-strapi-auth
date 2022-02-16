import { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";
import { NextPage } from "next";

const Profile: NextPage<{ user: { email: string; username: string } }> = ({
  user,
}) => {
  const { push } = useRouter();
  const { email, username } = user;

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;
