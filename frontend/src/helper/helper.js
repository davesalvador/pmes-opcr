import axios from "axios";
import jwt_decode from "jwt-decode";
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
});

/**MAKE API Reqeust */

/** To get username from Token*/

export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  // console.log(decode);
  return decode;
}

/**authenticate function */
export async function authenticate(username) {
  try {
    return await api.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/**get User details */
export async function getUser({ username }) {
  try {
    const { data } = await api.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password does not match...!" };
  }
}

/**register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await api.post(`/api/register`, credentials);
    let { username, email, institute } = credentials;
    /**send email */
    if (status === 201) {
      await api.post("/api/registerMail", {
        username,
        userEmail: email,
        institute,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await api.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/**update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await api.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update Profile...!" });
  }
}

/**generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await api.get("/api/generateOTP", {
      params: { username },
    });
    //send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
      await api.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
      return Promise.resolve(code);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**verify OTP */

export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await api.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/**reset Password */

export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await api.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
