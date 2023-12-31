import Image from "next/image";

const AboutComponent = () => {
  const members = [
    {
      name: "Shaun Niel Ochavo",
      position: "Project Manager - Landcover Preservation",
      img: "/members-images/shaun.jpg",
    },
    {
      name: "Shane Angela Otugay",
      position: "Environmental Conservation Specialist",
      img: "/members-images/shane.jpg",
    },
    {
      name: "Jhon Vie Quiel",
      position: "Database Administrator",
      img: "/members-images/jhon.jpg",
    },
    {
      name: "Kaye Dacua",
      position: "User Experience (UX) Designer",
      img: "/members-images/kaye.jpg",
    },
    {
      name: "Gracylejohn De Jesus",
      position: "GIS Specialist (Geographic Information System)",
      img: "/members-images/gracyle.jpg",
    },
    {
      name: "Jeffrey Diapana",
      position: "Data Quality Assurance Analys",
      img: "/members-images/jeffrey.jpg",
    },
    {
      name: "Jan Cyril Tabafa",
      position: "Outreach and Communication Coordinator",
      img: "/members-images/jan.jpg",
    },
  ];

  return (
    <div
      id="about"
      className="w-screen min:h-[100dvh] md:h-[100dvh] py-5 md:py-20 bg-purple-800 rounded-3xl  shadow-2xl shadow-purple-400  border-y-4 border-pink-700 px-3 md:px-0">
      <div className="container mx-auto w-full h-full flex flex-col justify-around content-center items-center text-white">
        <div>
          <div className="mb-10 text-center">
            <h1 className="text-xl md:text-4xl font-bold md:mb-5">About Us</h1>
            <p className=" text-white text-center md:px-52 text-sm md:text-md">
              We are a team dedicated to studying and preserving the Philippine
              landcover.
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row  justify-center items-center text-center px-10 md:space-x-10 space-y-3 md:space-y-0">
            <div className="md:w-1/3 border-t-4 border-pink-700 bg-white bg-opacity-[80%] shadow-lg backdrop-blur-[1rem] rounded-lg py-3 px-5 space-y-3 text-black">
              <h3 className=" text-md md:text-xl font-semibold">Our Mission</h3>
              <p className=" text-xs md:text-sm">
                To provide a comprehensive and user-friendly digital platform
                for studying and preserving the diverse landcover of the
                Philippines.
              </p>
            </div>
            <div className=" md:w-1/3 border-t-4 border-pink-700 bg-white bg-opacity-[80%] shadow-lg backdrop-blur-[1rem] rounded-lg py-3 px-5 space-y-3 text-black">
              <h3 className=" text-md md:text-xl font-semibold">Our Vision</h3>
              <p className=" text-xs md:text-sm">
                To be the leading resource in the Philippines for landcover
                data, contributing to sustainable development and environmental
                conservation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col items-center space-x-5 w-full mt-8 justify-center">
          <div className="grid grid-cols-2 md:flex w-full mb-4 gap-3">
            {members.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center space-x-2 w-full">
                <div
                  className="w-[8rem] h-[8rem] md:w-[12rem] md:h-[12rem]"
                  style={{
                    backgroundImage: `url(${member.img})`,
                    borderRadius: "50%",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                  }}></div>
                <div className="text-center">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
