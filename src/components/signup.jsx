import React, { useState } from 'react';

export default function Signup(props) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signing up:', formData);
    };

    function subscribe(){
        const subscriber = document.querySelector('.join')
        subscriber.style.backgroundColor = "red"
        subscriber.textContent = "Subscribed"
    }

    return (
        <>
            <h1>Subscribe:</h1>
            <h3>Welcome to my subscribe page. If you want to get updates on services I offer then feel free to subscribe to get weekly email updates</h3>
            <form onSubmit={handleSubmit} className="form-sub">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" onClick={subscribe} className='join'>Subscribe</button>
            </form>
            <hr></hr>
        </>
    );
}
