


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Container, Grid, AppBar, Toolbar } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        async function fetchHistory() {
            const history = await getHistoryOfUser();
            setMeetings(history);
        }
        fetchHistory();
    }, [getHistoryOfUser]);

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#FF9839' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Meeting History
                    </Typography>
                    <IconButton color="inherit" onClick={() => routeTo('/home')}>
                        <HomeIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {meetings.map((meeting, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Meeting Code: {meeting.code}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Date: {new Date(meeting.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        {meeting.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => routeTo(`/${meeting.code}`)}>Rejoin</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
