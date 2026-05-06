import axios from "axios";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const API_URL = "http://20.207.122.201/evaluation-service/logs";

export async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      API_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}
