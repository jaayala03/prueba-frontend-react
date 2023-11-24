import React, {useEffect, useState} from 'react';
import logo from '../Assets/images/logo.png';
import '../Assets/styles/auth.scss';
import {auth} from '../Apis/auth';
import {useNavigate} from 'react-router-dom';

const Auth = () => {
    const [username, setUsername] = useState('cramirez');
    const [password, setPassword] = useState('PrismaD2022');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const r = await auth(username, password);
        if (r.login) {
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(r));
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, []);

    return (
        <div className="auth">

            <div className="container h-100">
                <div className="content-login">
                    <img src={logo} className="d-block" alt="PRISMA DIGITAL"/>
                    <div className="title-login">
                        <h1>LOGIN</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" required className="form-label">User</label>
                            <input type="text"
                                   className="form-control"
                                   id="username"
                                   placeholder=""
                                   value={username}
                                   onChange={event => setUsername(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" required className="form-label">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="password"
                                   placeholder="********"
                                   value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                        </div>
                        {error && <p>{error}</p>}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-success w-100">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;