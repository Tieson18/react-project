import { LOGIN_ENDPOINT, RESGISTER_ENDPOINT } from "./index.api";

export const signUpAdmin = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(RESGISTER_ENDPOINT, options);
    const response = await request.json();
    return response
  } catch (e) {
    return{
        message: e.message,
        success: false
    }
  }
};

export const loginAdmin = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(LOGIN_ENDPOINT, options);
    const response = await request.json();
    return response
  } catch (e) {
    return{
        message: e.message,
        success: false
    }
  }
};