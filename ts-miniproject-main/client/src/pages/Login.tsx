import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/auth-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Register.css';

interface LoginResponse {
  token: string;
  username: string;
}

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => navigate('/dashboard'), 900); 
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', data);
      if (response.data.token) {
        login(response.data.token, response.data.username);
        toast.success('Login successful!', {
          position: "top-center",
          autoClose: 900,
          onClose: () => navigate('/dashboard')
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during login.');
      } else {
        setErrorMessage('Network error, please try again later.');
      }
      setError("email", { type: "manual", message: "Check your email." });
      setError("password", { type: "manual", message: "Check your password." });
    }
  };

  return (
    <div className="register-container">
      {/* className="container mt-5 bg-dark text-light" style={{ maxWidth: '400px', padding: '20px' }} */}
      <h2 className="mb-3">Login</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control"  id="email" {...register("email", { required: true })} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control"  id="password" {...register("password", { required: true })} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <div >
          <button type="submit">Login</button>
          <button className="btn btn-outline-light" type="button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
