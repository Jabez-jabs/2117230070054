import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function FilterBar({ type, setType }) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Notification Type</InputLabel>

      <Select
        value={type}
        label="Notification Type"
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterBar;
