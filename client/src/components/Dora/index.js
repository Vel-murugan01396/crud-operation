



import React, { useState, useEffect } from "react";

export default function Dora() {
  const [scrollY, setScrollY] = useState(0);
 

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to calculate zigzag movement and mirror image flag
  const calculateZigzag = (scrollY) => {
    // Change the frequency and amplitude values to adjust the zigzag motion
    const frequency = 0.009;
    const amplitude = 300;

    // Apply sinusoidal function to calculate the horizontal offset
    const offsetX = amplitude * Math.sin(frequency * scrollY);

    // Determine if the image should be mirrored based on the current section
    const mirror = scrollY < 200;
 // Adjust this threshold as needed

    // Return the calculated horizontal offset and mirror flag
    return { offsetX, mirror };
  };

  return (
    <>
      <div className="relative flex justify-center">
        <div
          className="absolute top-40"
          style={{
            transform: `translate(${calculateZigzag(scrollY).offsetX}px, ${scrollY}px) ${calculateZigzag(scrollY).mirror ? 'scaleX(-1)' : ''}`
          }}
        >
          <img src="\g2.gif" className="w-72 h-72" alt="sample" />
        </div>
      </div>
      <section className="w-full h-[500px]  flex justify-center  p-5"  style={{ backgroundImage: 'url("\s1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
       <div className=" flex justify-center flex-col w-full" >
        <h1 className=" text-white text-xl text-center font-semibold">CSS background properties </h1>
        <p className=" text-white text-base text-center p-10">We are delighted to bring you a wide range of organic groceries, vegetables, fruits, snacks, clay pots, etc. directly sourced from farmers to consumers.For vegetables and fruits, please place your order before Thursday 4pm IST to have them delivered on Saturday to specific locations in Chennai.</p>
        <button className="bg-black text-lg text-white  rounded px-7 items-center w-p[]">rth</button>
       </div>
      </section>
      <section className="w-full h-[500px] flex justify-center text-5xl text-slate-100" style={{ backgroundImage: 'url("\s4.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1>jhgvhvjhnvjhvgh</h1>
      </section>
      <section className="w-full h-[500px]  flex justify-center text-5xl text-slate-100" style={{ backgroundImage: 'url("\s2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1>jhgvhvjhnvjhvgh</h1>
      </section>
      <section className="w-full h-[500px]  flex justify-center text-5xl text-slate-100" style={{ backgroundImage: 'url("\s3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1>jhgvhvjhnvjhvgh</h1>
      </section>
      <section className="w-full h-[500px]  flex justify-center text-5xl text-slate-100" style={{ backgroundImage: 'url("\s1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1>jhgvhvjhnvjhvgh</h1>
      </section>
    </>
  );
}






