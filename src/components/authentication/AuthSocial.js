import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseGoogle = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/dashboard/app', { replace: true });
    } catch (error) {
      console.log(error);
    }

    console.log(response);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        {/* <GoogleLogin
          clientId="516147560128-qge1sas5sr5s650kmubi3mrhhhn82iur.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
          render={(renderProps) => (
            <Button
              size="large"
              color="inherit"
              variant="outlined"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Icon icon={googleFill} color="#DF3E30" height={24} />
            </Button>
          )}
        /> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
