import Image from "next/image";
import Logo from "../../public/mountain-15-512-260771.png";

const Header = () => {
  return (
    <div className="flex flex-row items-center space-x-8 lg:w-[1248px]">
      <Image src={Logo} alt="Mountain logo" width={64} height={64} />
      <h1 className="py-4 text-4xl font-bold tracking-tight md:py-8 md:text-[3rem] lg:py-16 lg:text-[5rem]">
        Lakeland Saga Louts
      </h1>
    </div>
  );
};

export default Header;
