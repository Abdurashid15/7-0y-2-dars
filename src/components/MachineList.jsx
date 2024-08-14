import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const MachineList = () => {
    const [machines, setMachines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;

    const fetchMachines = async (page) => {
        try {
            const response = await fetch(`http://localhost:3000/machines?page=${page}&limit=10`);
            const data = await response.json();
            setMachines(data.results || []);
        } catch (error) {
            console.error('Error fetching machines:', error);
            setMachines([]);
        }
    };

    useEffect(() => {
        fetchMachines(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Machine List
            </Typography>
            <Grid container spacing={3}>
                {machines.length > 0 ? (
                    machines.map((machine, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={machine.image}
                                    alt={machine.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {machine.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Class: {machine.class}
                                    </Typography>
                                    {machine.start_production && (
                                        <Typography variant="body2" color="textSecondary">
                                            Start Production: {machine.start_production}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No machines available</Typography>
                )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default MachineList;
