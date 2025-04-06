import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}

      <div className=" w-full pb-8">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
