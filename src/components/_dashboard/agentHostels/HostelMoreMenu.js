import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import editFill from '@iconify/icons-eva/edit-fill';
import { useNavigate } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import eyeIcon from '@iconify/icons-eva/eye-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import PropTypes from 'prop-types';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { PATH_AGENT, PATH_PAGE } from '../../../routes/paths';
import { removeListing } from '../../../redux/slices/host';

// ----------------------------------------------------------------------

HostelMoreMenu.propTypes = {
  hostel: PropTypes.object
};
export default function HostelMoreMenu({ hostel }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, urlId } = hostel;

  const handleDelete = () => {
    dispatch(removeListing(_id));
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDialogOpen}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <DialogBox
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
          handleDelete={handleDelete}
          dialogOpen={dialogOpen}
        />
        <MenuItem
          onClick={() => navigate(`${PATH_PAGE.hostels}/${urlId}`)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={eyeIcon} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

function DialogBox({ handleDialogClose, handleDelete, dialogOpen }) {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Delete hostel</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this hostel?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
        <Button onClick={handleDialogClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogBox.propTypes = {
  handleDialogClose: PropTypes.func,
  handleDelete: PropTypes.func,
  dialogOpen: PropTypes.func
};
