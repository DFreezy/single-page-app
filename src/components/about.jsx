import React, { useEffect, useState } from 'react';

export default function About(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/data.json") // Adjusted path to fetch from public folder
            .then(res => res.json()) // Parse the JSON response
            .then(data => console.log(data)) // Set the fetched data to state
            .catch(err => console.error("Error fetching data:", err)); // Handle any fetch errors
    }, []); // Runs only once when the component mounts

    return (
        <div className="about">
            <div className="base-info">
                <h1>Du-wayne Frieslaar</h1>
                <h2>Front-end developer</h2>
                <p>Project commits: {props.amount}</p>
                <p>Languages: {props.languages}</p>
                <p>Frameworks: {props.frameworks}</p>
                <p>Libraries: {props.libraries}</p>
                <img 
                    src="https://th.bing.com/th/id/R.6b4b41280ec740e79fb4af5b5c03e983?rik=4fmIn0wugS5ajg&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2017%2f03%2fpictures-14-11.jpg&ehk=BlPjXtdZ11zcqHzqerxJci4U%2bUakPdaH7ybU%2fjXNIq8%3d&risl=&pid=ImgRaw&r=0" 
                    className="hero-image" 
                    alt="Hero" 
                />
            </div>
            <hr />
            <h3>
                Through rigorous coding I've found myself to be more disciplined than ever before. I have become passionate about 
                developing the world by developing apps one code at a time. I never give up when I really want something. You can count on me.
            </h3>
            {/* Display the fetched data */}
        </div>
    );
}
