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
                    src="https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/452195521_1530578321000096_5989762714055245838_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_aid=0&_nc_ohc=oqs433T3aQcQ7kNvgE2vXd0&_nc_ht=scontent-cpt1-1.xx&_nc_gid=A1ZAh0dcywyKqtd-IUk1vxf&oh=00_AYCjy_r7OccSDKfkMjOlKk1ean_nj1az3SLJW_OC9SE1dQ&oe=670EDA13" 
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
