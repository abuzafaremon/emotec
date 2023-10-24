import Hero from "./Hero/Hero";
import LatestBlog from "./LatestBlog/LatestBlog";
import Newsletter from "./Newsletter/Newsletter";
import SmartWatch from "./SmartWatch/SmartWatch";
import Tws from "./Tws/Tws";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestBlog />
      <SmartWatch />
      <Tws />
      <Newsletter />
    </div>
  );
};

export default Home;
