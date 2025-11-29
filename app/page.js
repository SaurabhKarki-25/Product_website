import Image from "next/image";
import { Landing } from "./components/landing";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";


export default function Home() {

  
  return (
         <>
          <Navbar />
          <Landing />
          <Footer />
         </>
  );
}
