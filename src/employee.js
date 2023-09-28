import { useState, useEffect } from 'react';
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
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



import {
 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
 
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
    const [mail, setMail] = useState();
   const [un, setUn] = useState();






    const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);


  const [opend, setOpend] = useState(false);

  const useStyles = makeStyles((theme) => ({
  tableRow: {
     height: '20px',
    marginBottom: '6px', // Gap between rows
    boxShadow: '-3px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow for each row
    borderRadius: '4px', // Rounded corners for each row
    transition: 'transform 0.3s ease', // Smooth hover effect
    '&:hover': {
      transform: 'scale(1.02)', // Scale up on hover
    },
  },
   largeFontSize: {
    fontSize: '16px', // Adjust the font size as needed
  }
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
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.client.toLowerCase().includes(search.toLowerCase())
  );

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
    const d = new Date();
    const t = d.getDay + d.getMonth + d.getYear;
    async function addEmp(){
        
        //e.preventDefault();
        const item = await axios.post("https://team-manager-api.onrender.com/employee", {
            name: name,
            role: role,
            email: mail
        });
        if (item.data.name) {
            setList((prev) => { return [...prev, item.data] });
        }
        setName('');
        setRole('');
        setMail('');
    }
    const some = async () => {
        const item = await axios.get("https://team-manager-api.onrender.com/employee");
        setList(item.data);
        console.log(list)
    }
    useEffect(() => {
        some();
        return;
    }, []);

    async function deleteItem(id) {
        try {
            const url = "https://team-manager-api.onrender.com/employee/" + id;
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
            const url = "https://team-manager-api.onrender.com/employee/" + id;
            const del = await axios.patch(url, {role : ur, name: un, email: mail});
          
            setUr('');
            setUn('');
            setMail('');
            setUpd('');

            const item = await axios.get("https://team-manager-api.onrender.com/employee");
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
        + <AccountCircleIcon />
 Add Employees

      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Employee
          </DialogContentText>

                                        <TextField
                           
                            label="Name:"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            /> 
                                
                                    <span>                 </span>
                      
                        <TextField

                                        label="Role:"
                                        required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            />
                                        

                           
                                
                                    <TextField

                                        label="Email:"
                                        required
                                       value={mail}
                                        onChange={(event) => {setMail(event.target.value) } }
                                        fullWidth
                                        style = {{width: '300px'}}
                                    />
                                
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
         
            

                    

                           
      





      <TableContainer style={{   margin: '10px' , overflowX: 'hidden'}}>
        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell style={{ color: 'blue' }} >S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell  style={{ color: 'blue' }}>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell style={{ color: 'blue' }} >Role</TableCell>
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


                  <TableCell style={{ color: 'blue' }}>{++nm}</TableCell>
                  <TableCell >{row.name}</TableCell>
                  <TableCell style={{ color: 'blue' }}>{row.Id}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell style={{ color: 'blue' }}>{row.role}</TableCell>
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

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            onChange={(e) => setMail(e.target.value)} value={mail}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label="Role"
            type="text"
            onChange={(e) => setUr(e.target.value)} value={ur} onKeyDown={handleKeyDown}
            fullWidth
          />
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
      onClick={() => {setUpd(row.Id); setMail(row.email); setUr(row.role); setUn(row.name); handleOpend();} }
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
