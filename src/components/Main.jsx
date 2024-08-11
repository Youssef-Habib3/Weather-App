import { motion } from "framer-motion";
import Image from "next/image";

const Main = ({ weather, temp, name }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 0.5,
      }}
      className="my-7 flex justify-center items-center flex-col"
    >
      {/* Image */}
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={`/imgs/${weather}.png`}
          width="150"
          height="150"
          alt="Weather Image"
        />
      </div>

      <h1 className="text-5xl font-bold">{Math.floor(temp) || "00"}°C</h1>
      <p className="text-4xl mt-4">{name || "..."}</p>
    </motion.main>
  );
};

export default Main;
