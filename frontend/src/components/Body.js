import '../styles/body.css';
import backgroundPic from '../images/cooking.webp';

function Body() {
    return (
        <div className="body">
            <div className="background-image">
                <img src={backgroundPic} alt="Background" />
            </div>
            <div className="search">
                <input type="text" placeholder="Search recipes..." />
                <button type="submit">Search</button>
            </div>
        </div>
    );
}

export default Body;