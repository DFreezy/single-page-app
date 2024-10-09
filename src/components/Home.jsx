import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Home(props) {
    function showMessage() {
        const dialog = document.querySelector('#message-dialog');
        dialog.showModal();
    }

    function closeMessage(event) {
        event.preventDefault(); // Prevent form submission
        const dialog = document.querySelector('#message-dialog');
        dialog.close();
    }

    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="quotes">
            <h1>Du-wayne Frieslaar Portfolio</h1>
            <h1>🏡 {props.qoutes}</h1>
            <h2>Explore my site</h2>

            {/* Carousel */}
            <Slider {...settings}>
                <div>
                    <img 
                        className="homeimage" 
                        src="https://th.bing.com/th/id/R.9b2ec30db9a8449eb863e70d7f8f88ed?rik=sHUVuudiMKzXLw&pid=ImgRaw&r=0" 
                        width="200" 
                        height="200" 
                        alt="Home 1" 
                    />
                </div>
                <div>
                    <img 
                        className="homeimage" 
                        src="https://tech.co.za/wp-content/uploads/2023/03/Lenovo-V15-G2-IJLa-500x375.png" 
                        width="200" 
                        height="200" 
                        alt="Home 2" 
                    />
                </div>
                <div>
                    <img 
                        className="homeimage" 
                        src="https://th.bing.com/th/id/OIP._ZtEJqd3SNLBO8hCG-aeygAAAA?rs=1&pid=ImgDetMain" 
                        width="200" 
                        height="200" 
                        alt="Home 3" 
                    />
                </div>
                {/* Add more slides as needed */}
            </Slider>

            <h1>My desired skills</h1>
            <p>Project commits: {props.amount}</p>
            <p>Languages: {props.languages}</p>
            <p>Frameworks: {props.frameworks}</p>
            <p>Libraries: {props.libraries}</p>
            <button onClick={showMessage}>Message me</button>
            <dialog id="message-dialog">
                <form>
                    <label htmlFor="message">What do you need?</label>
                    <input type="text" id="message" />
                    <button onClick={closeMessage}>❌</button>
                </form>
            </dialog>
        </div>
    );
}
