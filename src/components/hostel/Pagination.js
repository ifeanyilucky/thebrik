import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PATH_PAGE } from '../../routes/paths';

Paginate.propTypes = {
  page: PropTypes.number,
  numberOfPages: PropTypes.number
};

export default function Paginate({ page, numberOfPages }) {
  return (
    <>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        size="large"
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <RouterLink to={`${PATH_PAGE.hostels}?page=${item.page}`}>
            <PaginationItem {...item} />
          </RouterLink>
        )}
      />
    </>
  );
}
