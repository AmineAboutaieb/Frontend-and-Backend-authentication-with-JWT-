import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { registerUser } from "../api/user";
import { toast } from "react-toastify";
import { Spinner } from "react-activity";

function Register() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,51}$/;
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      if (response.error) {
        toast.error(response.error);
        setIsLoading(false);
      } else {
        toast.success(response.message);
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5 mx-auto">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Sign up
        </label>
      </div>
      <div className="form-group">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="First name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {firstName && (
          <FormHelperText>
            <span
              className={
                USER_REGEX.test(firstName) ? "text-success" : "text-danger"
              }
            >
              2 to 50 letters <br />
              first letter must be uppercase
            </span>
            {USER_REGEX.test(firstName) && (
              <CheckCircle className="text-success ml-2" fontSize="small" />
            )}
            {!USER_REGEX.test(firstName) && (
              <Cancel className="text-danger ml-2" fontSize="small" />
            )}
          </FormHelperText>
        )}
      </div>
      <div className="form-group">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Last name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {lastName && (
          <FormHelperText>
            <span
              className={
                USER_REGEX.test(lastName) ? "text-success" : "text-danger"
              }
            >
              2 to 50 letters <br />
              first letter must be uppercase
            </span>
            {USER_REGEX.test(lastName) && (
              <CheckCircle className="text-success ml-2" fontSize="small" />
            )}
            {!USER_REGEX.test(lastName) && (
              <Cancel className="text-danger ml-2" fontSize="small" />
            )}
          </FormHelperText>
        )}
      </div>
      <div className="form-group">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && (
          <FormHelperText>
            <span
              className={
                EMAIL_REGEX.test(email) ? "text-success" : "text-danger"
              }
            >
              Must be a valid email (must contain a @)
            </span>
            {EMAIL_REGEX.test(email) && (
              <CheckCircle className="text-success ml-2" fontSize="small" />
            )}
            {!EMAIL_REGEX.test(email) && (
              <Cancel className="text-danger ml-2" fontSize="small" />
            )}
          </FormHelperText>
        )}
      </div>
      <div className="form-group">
        <FormControl variant="outlined" size="small" className="form-control">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {password && (
          <FormHelperText>
            <span
              className={
                PWD_REGEX.test(password) ? "text-success" : "text-danger"
              }
            >
              8 to 24 letters <br />
              must increase uppercase and lowercase letters, a number and a
              special character
            </span>
            {PWD_REGEX.test(password) && (
              <CheckCircle className="text-success ml-2" fontSize="small" />
            )}
            {!PWD_REGEX.test(password) && (
              <Cancel className="text-danger ml-2" fontSize="small" />
            )}
          </FormHelperText>
        )}
      </div>
      <div className="form-group">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password && confirmPassword && (
          <FormHelperText>
            {password === confirmPassword ? (
              <span className="text-success">Password does match</span>
            ) : (
              <span className="text-danger">Password does not match</span>
            )}
            {password === confirmPassword && (
              <CheckCircle className="text-success ml-2" fontSize="small" />
            )}
            {password !== confirmPassword && (
              <Cancel className="text-danger ml-2" fontSize="small" />
            )}
          </FormHelperText>
        )}
      </div>
      <div className="text-center mt-4">
        {isLoading ? (
          <Spinner className="mx-auto" />
        ) : (
          <Button
            variant="contained"
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              !USER_REGEX.test(firstName) ||
              !USER_REGEX.test(lastName) ||
              !EMAIL_REGEX.test(email) ||
              !PWD_REGEX.test(password)
            }
            onClick={handleRegister}
          >
            Sign up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Register;
