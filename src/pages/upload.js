import React from "react";
import DrawerAppBar from "../component/Navbar";
import { useState } from "react";
import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { uploadImageApi } from "../hooks/api";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [snackState, setSnackState] = React.useState({
    open: false,
    message: "",
    snackType: "",
  });
  const { open, message, snackType } = snackState;
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG, or JPG image.");
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const token = localStorage.getItem('token');
        if(!token || !selectedFile){
         setSnackState({ ...snackState, message: 'No Token Found or empty file', snackType: 'error', open: true });
         return
        }
        const { success, message, error } = await uploadImageApi(selectedFile, token);

        if (success) {
          setSnackState({ ...snackState, message, snackType: 'success', open: true });
          setSelectedFile(null)
        } else {
          setSnackState({ ...snackState, message: error || 'Image upload failed', snackType: 'error', open: true });
        }
      } catch (error) {
        setSnackState({ ...snackState, message: 'An error occurred', snackType: 'error', open: true });
      }
    } else {
      setSnackState({ ...snackState, message: 'No file selected', snackType: 'error', open: true });
    }
    navigate('/')
  };
  return (
    <>
      <DrawerAppBar />

      <Box
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column"
        }}
        p={3}
        border="1px dashed #ccc"
        borderRadius={8}
        textAlign="center"
      >
        <Box style={{display:"block"}}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="image-file-input"
          />
          <label htmlFor="image-file-input">
            <Button variant="outlined" component="span">
              Select Image
            </Button>
          </label>
        </Box>
        <Box>
          {selectedFile && (
            <div>
              <Typography variant="subtitle1" mt={2}>
                Selected Image: {selectedFile.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                mt={2}
              >
                Upload
              </Button>
            </div>
          )}
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={() => setSnackState({ ...snackState, open: false })}
          autoHideDuration={2000}
          key={"bottom" + "center"}
        >
          <Alert severity={snackType} variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Upload;
