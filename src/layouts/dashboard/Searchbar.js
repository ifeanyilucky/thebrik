import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton
} from '@mui/material';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchArea, setSearchArea] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: 'hostels',
      search: `${createSearchParams({ search: searchArea })}`
    });
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <form onSubmit={handleSubmit}>
              <Input
                autoFocus
                fullWidth
                disableUnderline
                onChange={(e) => setSearchArea(e.target.value)}
                placeholder="Search…"
                value={searchArea}
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <Button variant="contained" onClick={handleClose} type="submit">
                Search
              </Button>
            </form>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
