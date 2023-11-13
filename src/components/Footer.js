import Image from "next/image";

export const Footer = () => {
  return (
    <div className=" bg-purple-900 w-screen rounded-t-3xl border-t-4 border-pink-700">
      <div className="container mx-auto flex flex-col py-5 justify-center items-center space-y-2  ">
        <div className=" flex space-x-5">
          <Image
            src="/facebook.png"
            width={40}
            height={40}
            alt="Facebook Logo"
            className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
          />
          <Image
            src="/linkedin.png"
            width={40}
            height={40}
            alt="LinkedIn Logo"
            className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
          />
          <Image
            src="/twitter.png"
            width={40}
            height={40}
            alt="Twitter Logo"
            className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
          />
          <Image
            src="/youtube.png"
            width={40}
            height={40}
            alt="Youtube Logo"
            className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
          />
        </div>
        <div>
          <p className="text-gray-200 text-xs">
            {" "}
            © {new Date().getFullYear()} ITE - 18{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
