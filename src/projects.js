import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
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


function App() {

    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [list, setList] = useState([]);
    const [upd, setUpd] = useState();
    const [ur, setUr] = useState();

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
        const item = await axios.post("https://team-manager-api.onrender.com/projects", {
            name: name,
            client: role
        });
        if (item.data.name) {
            setList((prev) => { return [...prev, item.data] });
        }
        setName('');
        setRole('');
    }
    const some = async () => {
        const item = await axios.get("https://team-manager-api.onrender.com/projects");
        setList(item.data);
        console.log(list);
        return;
    }
    useEffect(() => {
        some();
        return;
    }, []);

    async function deleteItem(id) {
        try {
            const url = "https://team-manager-api.onrender.com/projects/" + id;
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
            const url = "https://team-manager-api.onrender.com/projects/" + id;
            const del = await axios.patch(url, { client: ur });

            setUr('');
            setUpd('');

            const item = await axios.get("https://team-manager-api.onrender.com/projects");
            setList(item.data);

        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <Container justify
        >
            <React.Fragment>
                <h1>Projects</h1>
            </React.Fragment>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#f5f6f7', p: 3,
                    '&:hover': {
                        backgroundColor: '#edf2fa',
                        opacity: [0.9, 0.8, 0.7],
                        p: 2, border: '3px'
                    },
                }}
            >
                <div>
                    <form onSubmit={(e) => addEmp(e)}>
                        <br />
                        <Grid container spacing={10}>
                            <Grid item xs>

                                <Box sx={{
                                    backgroundColor: '#88fc9e', p: 1, border: '1px solid green',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor: '#a7fcb6',
                                        opacity: [0.9, 0.8, 0.7],
                                        p: 2, border: '3px'
                                    },
                                }}>

                                    <TextField

                                        label="Title:"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    /> </Box>
                            </Grid>
                            <Grid item xs>

                                <Box sx={{
                                    backgroundColor: '#88fc9e', p: 1, border: '1px solid green', borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor: '#a7fcb6',
                                        opacity: [0.9, 0.8, 0.7],
                                        p: 2, border: '3px'
                                    },
                                }}>
                                    <TextField

                                        label="Client:"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Button variant="contained" color="success" onClick={() => addEmp()} >Register</Button>

                    </form>

                </div>
            </Box>
            <br />
            <br />
            <br />
            <br />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#d1f3fd', p: 3, border: '1px',
                    '&:hover': {
                        backgroundColor: '#97f9d8',
                        opacity: [0.9, 0.8, 0.7],
                        p: 2, border: '3px'
                    },
                }}
            >

                <div>

                    {/*
               
                <table >
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                    {  
                        list.map((item) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.Id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.role}</td>
                                        <td><button onClick={() => { deleteItem(item.Id) } }>X</button></td>
                                        <td>
                                            {upd === item.Id ? 
                                                <input type='text' onChange={(e) => setUr(e.target.value)} value={ur} onKeyDown={handleKeyDown} />
              
                                                 
                                                :
                                                <button onClick={() => setUpd(item.Id) }>Edit</button>
                                            }
                                        </td>
                                    </tr>
                                </>
                            );
                    })

                    }
                    
                    </table> */}
                    <Grid container spacing={10}>
                        <Grid item xs>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell align="right">ID</StyledTableCell>
                                            <StyledTableCell align="right">Client</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.Id}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {row.client}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button variant="outlined" onClick={() => { deleteItem(row.Id) }} size="small">
                                                        Delete
                                                    </Button>
                                                    

                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs>

                            <Box sx={{
                                backgroundColor: '#fcffc4', p: 2,
                                '&:hover': {
                                    backgroundColor: '#fbffb5',
                                    opacity: [0.9, 0.8, 0.7],
                                    p: 3, border: '3px'
                                },
                            }}>
                                <React.Fragment>
                                    <Typography>Number of projects:</Typography>
                                    <Typography component="p" variant="h4">
                                        {list.length}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                        
                                    </Typography>

                                </React.Fragment>
                            </Box>
                        </Grid>
                    </Grid>

                </div>
            </Box>
        </Container>

    );
}

export default App;
