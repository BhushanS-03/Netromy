

import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Box, Container, Grid } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#FF9839' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Netromy
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/history")}
                        sx={{
                            marginRight: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <RestoreIcon sx={{ marginRight: 1 }} />
                        History
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Container component="main" maxWidth="xs" sx={{ textAlign: 'center' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: 4,
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        >
                            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                Welcome to Netromy
                            </Typography>
                            <Typography component="p" sx={{ mb: 4 }}>
                                Enter your meeting code to join a video call
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="meetingCode"
                                label="Meeting Code"
                                name="meetingCode"
                                autoComplete="off"
                                autoFocus
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mb: 2,
                                    backgroundColor: '#FF9839',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 152, 57, 0.8)',
                                    },
                                }}
                                onClick={handleJoinVideoCall}
                            >
                                Join Video Call
                            </Button>
                            <IconButton color="primary" onClick={() => setMeetingCode('')}>
                                <RestoreIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="/logo3.png" alt="Description" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </div>
    );
}

export default withAuth(HomeComponent);