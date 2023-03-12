import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import HostelForm from '../../components/_dashboard/HostelForm';
// ----------------------------------------------------------------------

export default function CreateHostel() {
  const { pathname, state } = useLocation();
  const { id } = useParams();
  console.log(pathname, id);
  const property = {};
  const isEdit = pathname.includes('edit');
  console.log(property);
  console.log(state);

  return (
    <Page title={`${!isEdit ? 'New Listing' : state?.listing?.name}`}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Add a new listing' : 'Edit listing'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: !isEdit ? 'New Listing' : state?.listing?.name }
          ]}
        />
        <HostelForm isEdit={isEdit} currentHostel={state?.listing} />
      </Container>
    </Page>
  );
}
