import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";
import { FC, useState } from "react";

const LoginComponent: FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", { ...userData });
      router.push("/profile");
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="identifier"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

const Home: NextPage = () => {
  const { push } = useRouter();
  const goToRegister = () => {
    push("/register");
  };
  return (
    <div>
      <LoginComponent />
      <button onClick={goToRegister}>Register</button>
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

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
