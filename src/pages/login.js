import { Alert, Container, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import DrawerAppBar from "../component/Navbar";
import { loginApi } from "../hooks/api";
import { useUser } from "../constants/userCOntext";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { updateUser} = useUser();
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [snackState, setSnackState] = React.useState({
    open: false,
    message: "",
    snackType: "",
  });
  const { open, message, snackType } = snackState;

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "email is required";
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { success, data, error } = await loginApi(formData);
  
        if (success) {
          updateUser(data); // Set the user in the context
          setSnackState({
            ...snackState,
            open: true,
            message: 'Login successful',
            snackType: 'success',
          });
          navigate('/');
        } else {
          setSnackState({
            ...snackState,
            open: true,
            message: error || 'Login failed',
            snackType: 'error',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        setSnackState({
          ...snackState,
          open: true,
          message: 'An error occurred',
          snackType: 'error',
        });
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <DrawerAppBar />
      <Container component="main" maxWidth="lg" sx={{ pt: 4 }}>
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://trendingtales.com/wp-content/uploads/2021/09/How-Much-Does-it-Cost-to-Develop-an-App-like-Zomato-696x455.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{ mt: 2 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container justifyContent={"center"}>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
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
      </Container>
    </>
  );
};

export default Login;
