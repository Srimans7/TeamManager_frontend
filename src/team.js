import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import * as React from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import { Container, Button, TextField, Title, Typography } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';


import {

  
  DialogContentText,

 
} from '@mui/material';

import {
  TablePagination,
} from '@mui/material';







function App() {

    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [list, setList] = useState([]);
    const [upd, setUpd] = useState();
    const [ur, setUr] = useState();
    const [up, setUp] = useState();
    const [lte, setLte] = useState([]);
    const [ltp, setLtp] = useState([]);
   
    const [personName, setPersonName] = useState([]);
     const [un, setUn] = useState();
    




 const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);


  const [opend, setOpend] = useState(false);

  const useStyles = makeStyles((theme) => ({
  tableRow: {
    marginBottom: '6px', // Gap between rows
    boxShadow: '-3px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow for each row
    borderRadius: '4px', // Rounded corners for each row
    transition: 'transform 0.3s ease', // Smooth hover effect
    '&:hover': {
      transform: 'scale(1.02)', // Scale up on hover
    },
  },
}));

  const classes = useStyles();
var nm = 0;
  const handleOpend = () => {
    setOpend(true);
  };

  const handleClosed = () => {
    setOpend(false);
  };

  const handleSubmitd = () => {
    update(upd);    handleClosed();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    // Typically, you would send the data to a server or perform some action
    // and then close the dialog.
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
const filteredList = list.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );



    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handlChange = (event) => {
        const {
            target: { value },
        } = event;
       
        setPersonName(
            typeof value === 'string' ? value.split(', ') : value,
        );
    };
        

        const handleChange = (event) => {
            setRole(event.target.value);
        };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    async function addEmp() {

        //e.preventDefault();
        const item = await axios.post("https://team-manager-api.onrender.com/team", {
            name: name,
            member: personName,
            project: role
        });
        if (item.data.name) {
            setList((prev) => { return [...prev, item.data] });
        }
        setName('');
        setRole('');
    }

    const some = async () => {
        const item = await axios.get("https://team-manager-api.onrender.com/team");
        const lt = await axios.get("https://team-manager-api.onrender.com/employee");
        const ltt = await axios.get("https://team-manager-api.onrender.com/projects");


        console.log(lt.data);
        setList(item.data);
        setLte(lt.data);
        setLtp(ltt.data);
    }
    
    useEffect(() => { some(); return; }, []);

    async function deleteItem(id) {
        try {
            const url = "https://team-manager-api.onrender.com/team/" + id;
            const del = await axios.delete(url);
            console.log(del);
            const k = list.filter((l) => l.Id !== id);
            setList(k);
        } catch (err) {
            console.log(err.message);
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // ?? Get input value
            update(upd);
        }
    };


    async function update(id) {
        try {
            const url = "https://team-manager-api.onrender.com/team/" + id;
            const del = await axios.patch(url, {project: up, name: un , member: ur });

            setUr('');
            setUn('');
            setUp('');
            setUpd('');


            const item = await axios.get("https://team-manager-api.onrender.com/team");
            setList(item.data);

        } catch (err) {
            console.log(err.message);
        }

    }


    



    return (
       <div style={{backgroundColor: "white", margin: "10px", borderRadius: "10px", width:"76%"}}>
                    
<br />
            <br />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{margin: '16px', maxWidth: '200px' }}
          
    
        />
        <Button variant="contained" color="primary" >
  <SearchIcon /> Search
</Button>


<Button variant="outlined" color="primary" onClick={handleOpen} style={{ marginLeft: '40%' ,  }}>
        + <GroupIcon />
 Create Teams

      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Team
          </DialogContentText>

                                    <TextField

                                        label="Team Name:"
                                        value={name}
                                        size='medium'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                            

                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={personName}
                                            onChange={handlChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {lte.map((name) => (
                                                <MenuItem
                                                    key={name.name}
                                                    value={name.name}
                                                    
                                                >
                                                    {name.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                               
                                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Project</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={role}
                                            onChange={handleChange}
                                            autoWidth
                                            label="Age"
                                        >
                                            
                                            {ltp.map((em) => <MenuItem value={em.name}>{em.name}</MenuItem>)}

                                        </Select>
                                    </FormControl>

            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => addEmp()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </div>




                
            <br />
         
            


                           
      





      <TableContainer style={{   margin: '10px' , overflowX: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell style={{ color: 'blue' }}>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell style={{ color: 'blue' }}>Id</TableCell>
              <TableCell>Project</TableCell>
              <TableCell style={{ color: 'blue' }} >Members</TableCell>
              <TableCell></TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredList.map((row) => (
                <TableRow
                  key={row.id}
                  className={classes.tableRow}
                  
                >


                  <TableCell style={{ color: 'blue' }} >{++nm}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell style={{ color: 'blue' }}>{row.Id}</TableCell>
                  <TableCell>{row.project}</TableCell>
                  <TableCell style={{ color: 'blue' }} >{row.member.join(", ")}</TableCell>
                  <TableCell>

{upd === row.Id ?
<div>
    
      <Dialog open={opend} onClose={handleClosed}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            onChange={(e) => setUn(e.target.value)} value={un}
            fullWidth
          />


          <FormControl sx={{ m: 1, minWidth: 150 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Project</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={up}
                                            onChange={(e) => setUp(e.target.value)}
                                            autoWidth
                                            label="Age"
                                        >
                                            
                                            {ltp.map((em) => <MenuItem value={em.name}>{em.name}</MenuItem>)}

                                        </Select>
                                    </FormControl>



                                              <FormControl sx={{ m: 1, width: 300 }}>
                                        <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={ur}
                                            onChange={(e) => setUr(e.target.value)}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {lte.map((name) => (
                                                <MenuItem
                                                    key={name.name}
                                                    value={name.name}
                                                    
                                                >
                                                    {name.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

          
          {/* Add more form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{handleClosed(); setUpd();} } color="secondary">
            Cancel
          </Button>
          <Button onClick={() =>{handleSubmitd(); setUpd();} } color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>  
                :
<Button
      variant="outlined"
      color="primary"
      startIcon={<EditIcon />}
      onClick={() => {setUpd(row.Id); setUp(row.project); setUr(row.member); setUn(row.name); handleOpend();} }
    >
      Edit
    </Button>
                                            }

                 
                 

                                                    <Button  color="secondary" onClick={() => { deleteItem(row.Id) }} size="small">
                                                        <IconButton
          color="secondary"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
                                                    </Button>
                                                    

                                               </TableCell>

                </TableRow>
              )) }
          </TableBody>
        </Table>
      </TableContainer>
      
    
                        

                </div>
           
       

    );
}

export default App;
