import Image from "next/image";

const AboutComponent = () => {
  const members = [
    { name: "Ochavo, Shaun Niel", img: "/twitter.png" },
    { name: "Otugay, Shane Angela", img: "/twitter.png" },
    { name: "Quiel, Jhon Vie", img: "/twitter.png" },
    { name: "Dacua, Kaye", img: "/twitter.png" },
    { name: "De Jesus, Gracylejohn", img: "/twitter.png" },
    { name: "Diapana, Jeffrey", img: "/twitter.png" },
    { name: "Tabafa, Jan Cyril", img: "/twitter.png" },
  ];

  const firstRow = members.slice(0, 3);
  const secondRow = members.slice(3);

  return (
    <div className="w-full h-[100dvh] flex flex-col gap-16 text-white my-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="">
          We are a team dedicated to studying and preserving the Philippine
          landcover.
        </p>
      </div>
      <div className="flex flex-col gap-16 pb-11 md:pb-0">
        <div className="flex flex-col sm:flex-row justify-around w-full mb-4">
          {firstRow.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <Image
                width={128}
                height={128}
                className="rounded-full mb-2"
                src={member.img}
                alt={member.name}
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-around w-full">
          {secondRow.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <Image
                width={128}
                height={128}
                className=" rounded-full mb-2"
                src={member.img}
                alt={member.name}
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
