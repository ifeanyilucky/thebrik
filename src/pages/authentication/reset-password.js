import { useState } from 'react';
import { Link } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
//
import { SentIcon } from '../../assets';
import ResetPasswordForm from '../../components/authentication/reset-password/reset-form';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <RootStyle title="Reset Password">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Typography variant="h3" paragraph>
            Reset your password
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Enter your new password to reset it
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <ResetPasswordForm />
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
