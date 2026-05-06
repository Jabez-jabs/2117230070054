import axios from "axios";
import { Log } from "../utils/logger";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const BASE_URL = "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications(page, limit, type) {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications"
    );

    const response = await axios.get(BASE_URL, {
      params: {
        page,
        limit,
        notification_type: type || undefined,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return response.data.notifications || [];
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    throw error;
  }
}
