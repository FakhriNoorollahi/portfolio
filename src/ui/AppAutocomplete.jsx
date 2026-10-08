import { Autocomplete, TextField } from "@mui/material";

function AppAutocomplete({ options }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label="Categories" />}
    />
  );
}

export default AppAutocomplete;
