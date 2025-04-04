import React, { useState } from "react";
import { signIn } from "../config/FireBase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slice/authSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, SignInContainer, AuthBox } from "./SignInStyles";
import logo from "../assets/images/logo.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await signIn(email, password);
      dispatch(setUser(user));
      navigate("/store");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  // Redirect to store page if the user is already authenticated
  if (currentUser) {
    navigate("/store");
  }

  // Create form fields
  const formFields = [
    {
      id: "email",
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "your@email.com",
      autoComplete: "email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "••••••",
      autoComplete: "current-password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    },
  ];

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="Company Logo" style={{ height: "80px" }} />
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            {formFields.map((field) => (
              <FormControl key={field.id}>
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                <TextField
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required
                  fullWidth
                  variant="outlined"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            ))}
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
        </Card>
        <AuthBox>
          <Typography variant="h6">Demo Authentication Details</Typography>
          <Typography>Email: nitish@gmail.com</Typography>
          <Typography>Password: nitish12345</Typography>
        </AuthBox>
      </SignInContainer>
    </Box>
  );
};

export default SignIn;