import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, MenuItem, Select, FormControl } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const MachineList = () => {
    const [machines, setMachines] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentLimit = parseInt(searchParams.get('limit')) || 10; 
    const totalPages = 10; 
    const fetchMachines = async (page, limit) => {
        try {
            const response = await fetch(`http://localhost:3000/machines?page=${page}&limit=${limit}`);
            const data = await response.json();
            setMachines(data.results || []);
        } catch (error) {
            console.error('Error fetching machines:', error);
            setMachines([]);
        }
    };

    useEffect(() => {
        fetchMachines(currentPage, currentLimit); 
    }, [currentPage, currentLimit]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setSearchParams({ page, limit: currentLimit });
        }
    };

    const handleLimitChange = (event) => {
        const newLimit = event.target.value;
        setSearchParams({ page: 1, limit: newLimit }); 
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
                                    loading="lazy" 
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Typography variant="body2" color="textSecondary">
                    Page {currentPage} of {totalPages}
                </Typography>
                <FormControl sx={{ minWidth: 120 }}>
                    <Select
                        value={currentLimit}
                        onChange={handleLimitChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Items per page' }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
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
