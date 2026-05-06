import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";

import { fetchNotifications } from "../api/notifications";
import { Log } from "../utils/logger";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [readMap, setReadMap] = useState({});

  const limit = 10;

  const priority = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);

        await Log(
          "frontend",
          "info",
          "page",
          "Loading notifications page"
        );

        const data = await fetchNotifications(
          page,
          limit,
          type
        );

        const sorted = [...data].sort((a, b) => {
          const priorityDiff =
            priority[b.Type] - priority[a.Type];

          if (priorityDiff !== 0) {
            return priorityDiff;
          }

          return (
            new Date(b.Timestamp) -
            new Date(a.Timestamp)
          );
        });

        setNotifications(sorted);
      } catch (error) {
        await Log(
          "frontend",
          "error",
          "page",
          "Notifications loading failed"
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [page, type]);

  const markAsRead = async (id) => {
    setReadMap((prev) => ({
      ...prev,
      [id]: true,
    }));

    await Log(
      "frontend",
      "info",
      "state",
      `Notification ${id} marked as read`
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Campus Notifications
      </Typography>

      <FilterBar type={type} setType={setType} />

      {loading ? (
        <CircularProgress />
      ) : (
        notifications.map((item) => (
          <Box
            key={item.ID}
            onClick={() => markAsRead(item.ID)}
          >
            <NotificationCard
              notification={item}
              read={readMap[item.ID]}
            />
          </Box>
        ))
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default NotificationsPage;
