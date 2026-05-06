import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

function NotificationCard({ notification, read }) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: read ? "#f5f5f5" : "#ffffff",
        borderLeft: read
          ? "4px solid gray"
          : "4px solid #1976d2",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Type: {notification.Type}
        </Typography>

        <Typography variant="body2">
          Time: {notification.Timestamp}
        </Typography>

        <Chip
          label={read ? "Read" : "Unread"}
          color={read ? "default" : "primary"}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
