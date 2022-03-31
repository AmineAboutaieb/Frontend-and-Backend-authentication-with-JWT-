import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../api/user";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Spinner } from "react-activity";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      if (response.error) {
        setIsLoading(false);
        toast.error(response.error);
      } else {
        toast.success(response.message);
        setAuth(response.user);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  return (
    <div className="container my-5 mx-auto">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Sign in
        </label>
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
      </div>
      <div className="text-center mt-4">
        {isLoading ? (
          <Spinner className="mx-auto" />
        ) : (
          <Button
            variant="contained"
            disabled={!email || !password}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Login;
