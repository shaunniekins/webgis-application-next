const AboutComponent = () => {
  const members = [
    { name: "Ochavo, Shaun Niel", img: "/facebook.png" },
    { name: "Otugay, Shane Angela", img: "/twitter.png" },
    { name: "Quiel, Jhon Vie", img: "/youtube.png" },
    { name: "Dacua, Kaye", img: "/twitter.png" },
    { name: "De Jesus, Gracylejohn", img: "/vercel.svg" },
    { name: "Diapana, Jeffrey", img: "/next.svg" },
    { name: "Tabafa, Jan Cyril", img: "/linkedin.png" },
  ];

  const firstRow = members.slice(0, 3);
  const secondRow = members.slice(3);

  return (
    <div className="w-full h-[100dvh] flex flex-col gap-16 text-white mt-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="">
          We are a team dedicated to studying and preserving the Philippine
          landcover.
        </p>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col sm:flex-row justify-around w-full mb-4">
          {firstRow.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full mb-2"
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
              <img
                className="w-32 h-32 rounded-full mb-2"
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
