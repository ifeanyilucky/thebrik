import React, { useState } from 'react';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { MHidden } from '../../@material-extend';
import FaqsList, { commonQuestions } from '../../FaqsList';
import Iconify from '../../Iconify';
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0)
}));

const AccordionStyle = styled((props) => (
  <Accordion elevation={0} square disableGutters sx={{ boxShadow: 'none' }} {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: '15px',
  paddingTop: '15px',
  '&:before': {
    display: 'none'
  },
  boxShadow: 'none'
}));

const AccordionSummaryStyle = styled((props) => (
  <AccordionSummary
    expandIcon={
      <Box
        sx={{
          bgcolor: '#e6e9fb',
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Iconify icon="material-symbols:arrow-forward-ios-rounded" fontSize="14px" />
      </Box>
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3)
  }
}));

const AccordionDetailsStyle = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2)
}));
// ----------------------------------------------------------------------

export default function LandingFAQ() {
  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={1.6} mb={4}>
          <Typography
            component="p"
            variant="overline"
            sx={{ color: 'primary.main', display: 'block' }}
          >
            Common Questions
          </Typography>
          <Typography variant="h3">Frequently asked questions.</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }} maxWidth="768px">
            Get quick answers to all your questions and concerns about Thebrik. Whether as a member,
            host or just a visitor, we will have an answer waiting for you.
          </Typography>
          <Box>
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_PAGE.faqs}
              size="large"
              sx={{ textTransform: 'capitalize' }}
            >
              Visit FAQs
            </Button>
          </Box>
        </Stack>
        <Stack spacing={2}>
          {commonQuestions.slice(0, 4).map((item) => (
            <AccordionStyle
              key={item.panel}
              expanded={expanded === item.panel}
              onChange={handleChange(item.panel)}
              sx={{ boxShadow: 'none' }}
            >
              <AccordionSummaryStyle>
                <Typography variant="subtitle1">{item.question}</Typography>
              </AccordionSummaryStyle>
              <AccordionDetailsStyle>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {item.answer}
                </Typography>
              </AccordionDetailsStyle>
            </AccordionStyle>
          ))}
        </Stack>
      </Container>
    </RootStyle>
  );
}
