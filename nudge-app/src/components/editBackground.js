import React from 'react';
import {useState} from 'react';
import { Button, Dialog } from '@mui/material';

const BackgroundForm = ({ open, handleClose, image, setImage }) => {

  function handleChange(e) {
      console.log(e.target.files);
      setImage('url(' + URL.createObjectURL(e.target.files[0]) + ')');
      handleClose();
  }
// <Button onClick={handleChange}>Choose File<VisuallyHiddenInput type="file"/></Button>
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="BackgroundForm" style={{margin:20}}>
          <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
      </div>
    </Dialog>
      
  );
};

const EditBackground = ({image, setImage}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("Opening background form at " + Date.now());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Background
      </Button>
      <BackgroundForm open={open} handleClose={handleClose} image={image} setImage={setImage}/>
    </>
  );
}

export default EditBackground;
