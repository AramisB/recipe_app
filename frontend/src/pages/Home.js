import Layout from './Layout';
import '../styles/home.css';
import foodImage from '../images/food.jpg';
const Home = () => {
  return (
    <Layout>
      <div className='home-container'>
        <h1>Welcome to Our Recipe App</h1>
        <p>Discover the best recipes from Kenyan cuisine and more!</p>
        <img src={ foodImage } alt="Food" />
      </div>
    </Layout>
  );
};

export default Home;