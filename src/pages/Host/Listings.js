import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-square-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CardContent
} from '@mui/material';
import addListIcon from '@iconify/icons-ant-design/file-add-outline';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { PATH_AGENT } from '../../routes/paths';
import { useAuth } from '../../hooks/useAuth';
import HostListings from '../../components/host/listings';
import { getListing } from '../../redux/slices/host';
//

export default function Listings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListing());
  }, []);

  const { listings } = useSelector((state) => state.host);

  return (
    <Page title="My Listings">
      <Container>
        <Stack spacing={1} my={3}>
          <Typography variant="h5">Listings</Typography>
          <Typography variant="body2">Manage your listings on Thebrik</Typography>
        </Stack>

        <HostListings listings={listings} />
      </Container>
    </Page>
  );
}
