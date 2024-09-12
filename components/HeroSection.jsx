import Image from 'next/image';

import '../app/globals.css';

export default function HeroSection() {
  return (
    <>
    
    <section className="flex flex-col lg:flex-row items-center h-screen lg:items-start bg-cream-1 p-8 lg:p-16 ">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-7xl font-bold text-gray-800 libre-baskerville-regular ">Welcome to Our Website!</h1>
        <p className="text-xl text-gray-700">
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
        </p>
        <hr className="my-6 border-gray-300" />
        <p className="text-gray-700">
          It uses utility classes for typography and spacing to space content out within the larger container.
        </p>
        <button className="px-6 py-3 text-lg w-full  text-black  bg-cream-3  hover:bg-[#f3efe9]">
          Learn more
        </button>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2">
      <div style={{ height: "395px", position: "relative" }}>
  <Image
    src="https://images.unsplash.com/photo-1433574466251-fe1be0d9b3d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Background Image"
    className='ml-4'
    objectFit="cover" // Or "contain" depending on your preference
    layout="fill"
  />
</div>



      </div>
    </section>

    <section className="flex flex-col lg:flex-row items-center h-screen  lg:items-start bg-cream-2 p-8 lg:p-16 ">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-7xl font-bold text-gray-800 libre-baskerville-regular ">Welcome to Our Website!</h1>
        <p className="text-lg text-gray-700">
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
        </p>
        <hr className="my-6 border-gray-300" />
        <p className="text-gray-700">
          It uses utility classes for typography and spacing to space content out within the larger container.
        </p>
        <button className="px-6 py-3 text-lg w-full font-semibold text-black  bg-cream-3  hover:bg-[#f3efe5]">
          Learn more
        </button>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2">
      <div style={{ height: "395px", position: "relative" }}>
  <Image
    src="https://images.unsplash.com/photo-1433574466251-fe1be0d9b3d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Background Image"
    className='ml-4'
    objectFit="cover" // Or "contain" depending on your preference
    layout="fill"
  />
</div>



      </div>
    </section>

    <section className="flex flex-col lg:flex-row items-center h-screen  lg:items-start bg-green-1 p-8 lg:p-16 ">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-7xl font-bold text-gold libre-baskerville-regular ">Welcome to Our Website!</h1>
        <p className="text-lg text-white">
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
        </p>
        <hr className="my-6 border-gray-300" />
        <p className="text-white">
          It uses utility classes for typography and spacing to space content out within the larger container.
        </p>
        <button className="px-6 py-3 text-lg w-full font-semibold text-black  bg-cream-3  hover:bg-[#f3efe5]">
          Learn more
        </button>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2">
      <div style={{ height: "395px", position: "relative" }}>
  <Image
    src="https://images.unsplash.com/photo-1433574466251-fe1be0d9b3d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Background Image"
    className='ml-4'
    objectFit="cover" // Or "contain" depending on your preference
    layout="fill"
  />
</div>



      </div>
    </section>
  
    </>

    
  );
}