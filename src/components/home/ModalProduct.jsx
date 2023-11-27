import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { numberFormat } from '../../utils/Utils';

const ModalProduct = ({ status, data }) => {

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(status);
  }, [data]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {data.title}
      </DialogTitle>
      <DialogContent>

        {
          data?.images?.length > 0 ? (
            <>
              <ImageList className='images-list' sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164}>
                {data.images.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      srcSet={`${item}`}
                      src={`${item.img}`}
                      alt={data.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          ) : null
        }

        <DialogContentText>
          <Typography variant="h4" gutterBottom>
            {numberFormat(data.price)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {data.description}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ModalProduct;
