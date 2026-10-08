import { Autocomplete, TextField } from "@mui/material";

function AppAutocomplete({ options, selected, handler }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label="Categories" />}
      value={selected}
      onChange={handler}
    />
  );
}

export default AppAutocomplete;
