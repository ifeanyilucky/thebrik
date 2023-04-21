import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// material
import { Backdrop, Container, Typography, CircularProgress, Box } from '@mui/material';
import { useFormik } from 'formik';
import { filter, orderBy, includes } from 'lodash';
// redux
/// routes
import { PATH_PAGE } from '../routes/paths';
// hooks
// components
import Page from '../components/Page';
import { useSelector, useDispatch } from '../redux/store';
import { HostelList } from '../components/hostel';
import Paginate from '../components/hostel/Pagination';
import Filter from '../components/filter';
import HostelTagFiltered from '../components/HostelTagFiltered';
import { getHostels } from '../redux/slices/hostels';

// ----------------------------------------------------------------------

function applyFilter(hostels, sortBy, filters) {
  // SORT BY
  if (sortBy === 'newest') {
    hostels = orderBy(hostels, ['createdAt'], ['desc']);
  }
  if (filters.area) {
    hostels = filter(hostels, (_hostel) => includes(filters.area, _hostel.area));
  }
  if (filters.areaSearch) {
    hostels = filter(hostels, (_hostel) => _hostel.areaSearch === filters.areaSearch);
  }
  if (sortBy === 'priceDesc') {
    hostels = orderBy(hostels, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    hostels = orderBy(hostels, ['price'], ['asc']);
  }
  if (filters.priceRange) {
    hostels = filter(hostels, (_hostel) => {
      if (filters.priceRange === 'below') {
        return _hostel.price < 25;
      }
      if (filters.priceRange === 'between') {
        return _hostel.price >= 25 && _hostel.price <= 75;
      }
      return _hostel.price > 75;
    });
  }
  return hostels;
}

// ----------------------------------------------------------------------
// const useCustomSearchParams = () => {
//   const [search, setSearch] = useSearchParams();
//   const searchAsObject = Object.fromEntries(new URLSearchParams(search));
//   return [searchAsObject, setSearch];
// };

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Hostels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useQuery();
  const areaSearch = query.get('area');
  const pageNumber = query.get('page') || 1;
  const {
    hostels: { data, currentPage, numberOfPages, totalHostels },
    isLoading,
    filters,
    sortBy
  } = useSelector((state) => state.hostel);

  const filteredHostels = applyFilter(data, sortBy, filters);

  console.log(filteredHostels);
  const formik = useFormik({
    initialValues: {
      minPrice: '',
      maxPrice: '',
      bedroom: '',
      area: areaSearch || '',
      category: 'All',
      page: pageNumber
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
    enableReinitialize: true
  });
  const { values, resetForm, handleSubmit, initialValues } = formik;
  console.log(data);
  const isDefault =
    !values.area &&
    values.category === 'All' &&
    !values.bedroom &&
    !values.maxPrice &&
    !values.minPrice &&
    values.page === 1;

  useEffect(() => {
    dispatch(getHostels(values));
  }, [dispatch, values]);

  useEffect(() => {
    if (pathname === '/') {
      resetForm();
    }
  }, [pathname, resetForm]);
  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
    navigate(PATH_PAGE.hostels, { replace: true });
  };
  return (
    <Page title="Hostels">
      {isLoading === true && (
        <Backdrop open sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}
      <Container>
        <Typography variant="subtitle2" sx={{ color: 'primary.main', mt: 5 }}>
          EXPLORE THEBRIK
        </Typography>
        <Typography variant="h3" gutterBottom>
          Available Hostels.
        </Typography>
        <Box mt={4} mb={4}>
          <Filter formik={formik} onResetFilter={handleResetFilter} />
        </Box>
      </Container>
      <Container>
        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {Number(data.length)}
            </Typography>
            &nbsp;hostels found
          </Typography>
        )}
        <HostelTagFiltered
          filters={filters}
          formik={formik}
          onResetFilter={handleResetFilter}
          isDefault={isDefault}
        />

        {/* <HostelList hostels={propertiesById} isLoad={!filteredProducts && !initialValues} /> */}
        <HostelList
          hostels={filteredHostels}
          isLoad={(!filteredHostels && isLoading && !initialValues) || isLoading}
        />
        <Box my={10}>
          <Paginate page={pageNumber} numberOfPages={numberOfPages} />
        </Box>
      </Container>
    </Page>
  );
}
