import React from 'react';
import { Container, Grid, Typography, Stack, Button, ListItem, List } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import statusIcon from '@iconify/icons-ant-design/box-plot-twotone';

export default function ListingStatus() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} direction="row">
        <Grid item md={6}>
          <Stack spacing={2}>
            <Icon
              icon={statusIcon}
              style={{ width: '70px', fontSize: '70px', color: 'var(--primary-color)' }}
            />
            <Typography variant="h4">Listing your hostel property</Typography>
            <Typography variant="body1">
              Please make sure you have the following in your hostel property to be eligible for
              approval:
            </Typography>
            <Typography variant="body1">
              <List>
                <ListItem>Location of hostel</ListItem>
                <ListItem>Genuine images of hostel</ListItem>
                <ListItem>Landlord information</ListItem>
              </List>
            </Typography>
            <Typography variant="body1">
              Please note an extensive check will be done on your hostel property before approval.
              This is a guide and does not substitute for guaranteed listing approval for your
              property.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/dashboard/add-listing"
              sx={{ width: '60%' }}
            >
              Get started
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
