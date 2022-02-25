import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function Dropdown() {
  const [Role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    // <Box sx={{ minWidth: 120 }}>
      <FormControl label="User" style={{width:"35%"}} variant="outlined" size="small">
        <InputLabel label="User" id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Role}
          label="User type"
          onChange={handleChange}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"Wardles staff"}>Wardles staff</MenuItem>
          <MenuItem value={"HQ"}>HQ</MenuItem>
          <MenuItem value={"Sales"}>Sales</MenuItem>
        </Select>
      </FormControl>
    // </Box>
  );
}
