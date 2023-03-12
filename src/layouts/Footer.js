import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, Typography, Link, Box, Stack } from '@mui/material';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import facebook from '@iconify/icons-ant-design/facebook-fill';
import instagram from '@iconify/icons-ant-design/instagram';
import twitter from '@iconify/icons-ant-design/twitter';
import { config } from '../config';
// import CTA from '../components/_external-pages/CTA';
import { PATH_PAGE } from '../routes/paths';

function Footer() {
  const socials = [
    {
      title: 'facebook',
      url: config.social.facebook,
      icon: facebook
    },
    {
      title: 'twitter',
      url: config.social.twitter,
      icon: twitter
    },
    {
      title: 'instagram',
      url: config.social.instagram,
      icon: instagram
    }
  ];
  const date = new Date();
  const getYear = date.getFullYear();
  return (
    <FooterStyle>
      {/* BEGINNING OF GET STARTED COMPONENT SECTION */}
      {/* <CTA /> */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Grid direction="row" container spacing={6} alignItems="baseline">
            {/* COLUMN 1 */}
            <Grid item xs={12} sm={12} md={3} spacing={2}>
              <Typography variant="h5">Thebrik</Typography>
              <Typography variant="body1">
                &copy; {getYear}. Thebrik. All rights reserved
              </Typography>
              <Stack direction="row" spacing={2} className="footer__socials">
                {socials.map((s, index) => (
                  <a href={s.url} target="_blank" key={index} rel="noreferrer">
                    <Box
                      component={Icon}
                      icon={s.icon}
                      className="social"
                      height="35px"
                      width="35px"
                    />
                  </a>
                ))}
              </Stack>
              <Typography variant="body2">thebrik.co@gmail.com</Typography>
              <Link href="tel:2348131271411" underline="hover">
                (+234) 813 127 1411
              </Link>
              {/* <img src="/images/Thebrik.png" width="140" alt="Thebrik-logo" /> */}
            </Grid>

            {/* COLUMN 2 */}
            <Grid item xs={6} sm={6} md={3}>
              <Typography variant="subtitle1" sx={{ pb: 2 }}>
                COMPANY
              </Typography>
              <Typography variant="body2" sx={{ pb: 1 }}>
                <Link to={PATH_PAGE.about} component={RouterLink} color="inherit" underline="hover">
                  About
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ pb: 1 }}>
                <Link
                  to={PATH_PAGE.becomeAgent}
                  component={RouterLink}
                  color="inherit"
                  underline="hover"
                >
                  Become an agent
                </Link>
              </Typography>

              <Typography variant="body2">
                <Link to={PATH_PAGE.faqs} component={RouterLink} color="inherit" underline="hover">
                  FAQs
                </Link>
              </Typography>
            </Grid>

            {/* COLUMN 4 */}
            <Grid item xs={6} sm={6} md={3}>
              <Typography variant="subtitle1" sx={{ pb: 2 }}>
                LEGAL
              </Typography>
              <Typography variant="body2" sx={{ pb: 1 }}>
                <Link to={PATH_PAGE} component={RouterLink} color="inherit" underline="hover">
                  Privacy and Policy
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ pb: 1 }}>
                <Link to={PATH_PAGE} component={RouterLink} color="inherit" underline="hover">
                  Terms & Conditions
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </FooterStyle>
  );
}
const FooterStyle = styled.section`
  .get__started {
    background-color: rgba(247, 249, 253, 1);

    .border__dashed {
      border-style: dashed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      border-left-width: 1px;
      border-color: rgba(208, 213, 224, 1);
    }
  }
  .footer__socials {
    padding: 24px 0;

    .social {
      padding: 6px;
      background-color: #e9eefb;
      font-size: 24px;
      color: var(--primary-color);
      border-radius: 50%;
    }
  }
`;
export default Footer;
