import React from 'react';

import { Container, Typography, Stack } from '@mui/material';
import Page from '../components/Page';

function PrivacyPolicy() {
  return (
    <Page title="Privacy policy">
      <Container maxWidth="md">
        <Typography variant="h1" paddingBottom={4}>
          Privacy Policy
        </Typography>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="h3">Notification of Copyright Infringement</Typography>
            <Typography variant="body1">
              Thebrik. (“Thebrik”) respects the intellectual property rights of others and expects
              its users to do the same.
            </Typography>
            <Typography variant="body1">
              It is Thebrik’s policy, in appropriate circumstances and at its discretion, to disable
              and/or terminate the account or access of users who repeatedly infringe or are
              repeatedly charged with infringing the copyrights or other intellectual property
              rights of others.
            </Typography>
            <Typography variant="body1">
              In accordance with the Nigerian Copyrights Act (“NCA”) Cap. 28, Laws of the Federation
              of Nigeria, 2004, Thebrik will respond expeditiously to claims of copyright
              infringement committed using the Thebrik website and mobile application (the “Site and
              Application”) that are reported to Thebrik’s Designated Copyright Agent, identified in
              the sample notice below.
            </Typography>
            <Typography variant="body1">
              If you are a copyright owner, or are authorized to act on behalf of one, or authorized
              to act under any exclusive right under copyright, please report alleged copyright
              infringements taking place on or through the Site and Application by completing the
              following NCA Notice of Alleged Infringement and delivering it to Thebrik’s Designated
              Copyright Agent. Upon receipt of the Notice as described below, Thebrik will take
              whatever action, in its sole discretion, it deems appropriate, including removal of
              the challenged material from the Site and Application.
            </Typography>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="h3">Notice of Alleged Infringement ("Notice")</Typography>
            <ol>
              <Typography variant="body1">
                <li>
                  Identify the copyrighted work that you claim has been infringed, or – if multiple
                  copyrighted works are covered by this Notice – you will provide a comprehensive
                  list of the copyrighted works that you claim have been infringed.
                </li>
              </Typography>
              <Typography variant="body1">
                <li>
                  Identify the material that you claim is infringing (or to be the subject of
                  infringing activity) and that is to be removed or access to which is to be
                  disabled, and information reasonably sufficient to permit us to locate the
                  material, including at a minimum, if applicable, the URL of the link shown on the
                  Site and Application where such material may be found.
                </li>
              </Typography>
              <Typography variant="body1">
                <li>
                  Provide your mailing address, telephone number, and, if available, email address.
                </li>
              </Typography>
              <Typography variant="body1">
                <li>
                  Include both of the following statements in the body of the Notice:
                  <ul>
                    <li>
                      “I hereby state that I have a good faith belief that the disputed use of the
                      copyrighted material is not authorized by the copyright owner, its agent, or
                      the law (e.g., as a fair use).”
                    </li>
                    <li>
                      “I hereby state that the information in this Notice is accurate and, under
                      penalty of perjury, that I am the owner, or authorized to act on behalf of the
                      owner, of the copyright or of an exclusive right under the copyright that is
                      allegedly infringed.”
                    </li>
                  </ul>
                </li>
              </Typography>
              <Typography variant="body1">
                <li>Provide your full legal name and your electronic or physical signature.</li>
              </Typography>
            </ol>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="body1">
              Deliver this Notice, with all items completed, to Thebrik’s Designated Copyright
              Agent:
            </Typography>
            <Typography variant="body1">
              Copyright Agent
              <br />
              c/o Thebrik
              <br />
              11A, Ayodele Odubuyi Street,
              <br />
              Lekki Peninsula,
              <br />
              Lagos, Nigeria
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}

export default PrivacyPolicy;
