import GaleriaLista from "../../components/GaleriaLista/GaleriaLista.jsx";
import "./Home.css";
import Navbar from "components/Navbar/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <div className="Home__container">
        <GaleriaLista />
      </div>
      <div className="Home__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
