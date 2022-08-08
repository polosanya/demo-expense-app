import React, { Dispatch, SetStateAction, useState } from 'react';
import { register } from '../../api/api';
import { Pages } from '../Auth/Auth';
import '../Auth/Auth.scss';

type Props = {
    setCurrentPage: Dispatch<SetStateAction<Pages>>;
};

const SignUp: React.FC<Props> = ({ setCurrentPage }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const changePage = () => {
        setCurrentPage(Pages.SignIn);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const result = register(password,username,fullName);

        result.then(response => {
            if (response.ok) {
                setCurrentPage(Pages.SignIn);
            } else {
                response.json().then(error => {
                    alert(error.message);
                })
            }
        });
    }

    return (
        <div className='Auth__signUp SignUp'>
            <form
                className='SignUp__form Form'
                onSubmit={handleSubmit}
            >
                <h2 className='Form__title'>SIGN UP</h2>
                <label className='Form__label'>
                    Full Name
                    <input
                        type="text"
                        name="fullname"
                        className='Form__input'
                        placeholder='Example Name'
                        value={fullName}
                        onChange={event => { setFullName(event.target.value) }}
                        required
                    />
                </label>
                <label className='Form__label'>
                    User Name
                    <input
                        type="text"
                        name="username"
                        className='Form__input'
                        placeholder='Example123'
                        value={username}
                        onChange={event => { setUsername(event.target.value) }}
                        required
                    />
                </label>
                <label className='Form__label'>
                    Password
                    <input
                        type="password"
                        name="password"
                        className='Form__input'
                        placeholder='***************'
                        value={password}
                        onChange={event => { setPassword(event.target.value) }}
                        required
                    />
                </label>
                <label className='Form__label'>
                    Confirm password
                    <input
                        type="password"
                        name="confirm"
                        className='Form__input'
                        placeholder='***************'
                        value={confirm}
                        onChange={event => { setConfirm(event.target.value) }}
                        required
                    />
                </label>
                <input
                    type="submit"
                    value="Sign Up"
                    className='Form__submit'
                />
                <span className='Form__footer'>I have an account.&nbsp;  
                    <a 
                      className='Form__link'
                      onClick={changePage}
                    >
                        Go to Sign in
                    </a>
                </span>
            </form>
        </div>
    );
};

export default SignUp;