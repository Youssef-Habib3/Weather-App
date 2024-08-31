import { motion } from "framer-motion";
import Image from "next/image";

type Footer = {
  humidity: number;
  wind: number;
};

const Footer = ({ humidity, wind }: Footer) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 1,
      }}
      className="flex justify-between items-center text-left"
    >
      {/* Humidity */}
      <div className="flex items-center gap-3">
        {/* Image */}
        <div className="w-9 h-9 relative">
          <Image src="/imgs/humidity.png" fill alt="Humidity Image" />
        </div>

        {/* Humidity Text */}
        <p className="flex flex-col">
          <span>{humidity || "00"}%</span>
          <span>Humidity</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Image */}
        <div className="w-9 h-9 relative">
          <Image src="/imgs/wind.png" fill alt="wind Image" />
        </div>

        {/* Wind Speed Text */}
        <p className="flex flex-col">
          <span>{wind || "00"} km/h</span>
          <span>Wind Speed</span>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
