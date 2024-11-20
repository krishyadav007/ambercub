import Image from 'next/image';
import '../app/globals.css';

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center bg-cream-1 p-8 lg:p-16 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 libre-baskerville-regular">
            Notice Boy
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Safeguard your property with real-time alerts for legal notices, title updates, and encroachments. Notice Boy keeps you informed, so you stay secure.
          </p>
          <button className="px-6 py-3 text-lg font-semibold text-white bg-green-600 hover:bg-green-700">
            Get Started
          </button>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1591012911205-f24e970e12a9?w=1471&auto=format&fit=crop&q=80"
            alt="Secure Property"
            width={600}
            height={400}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Notice Boy?</h2>
          <p className="text-lg text-gray-600 mt-2">
            Discover the features that make us your trusted property partner.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-cream-3 rounded-lg shadow-md">
            <Image
              src="/icons/alerts.svg"
              alt="Real-Time Alerts"
              width={60}
              height={60}
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">
              Real-Time Alerts
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Stay informed with instant notifications for legal updates, disputes, and more.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-cream-3 rounded-lg shadow-md">
            <Image
              src="/icons/security.svg"
              alt="Property Security"
              width={60}
              height={60}
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">
              Secure Monitoring
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Advanced encryption to ensure your property data is always safe.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-cream-3 rounded-lg shadow-md">
            <Image
              src="/icons/dashboard.svg"
              alt="Comprehensive Dashboard"
              width={60}
              height={60}
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">
              Comprehensive Dashboard
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Manage all your properties and alerts in one easy-to-use interface.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-cream-2 py-16 px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600 mt-2">
            A simple process to ensure your properties are always protected.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/icons/register.svg"
              alt="Register Property"
              width={60}
              height={60}
            />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Step 1</h3>
            <p className="text-gray-600">Sign up and add your properties to the platform.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/icons/customize.svg"
              alt="Customize Alerts"
              width={60}
              height={60}
            />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Step 2</h3>
            <p className="text-gray-600">Customize alerts for disputes, encroachments, and notices.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/icons/notification.svg"
              alt="Stay Informed"
              width={60}
              height={60}
            />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Step 3</h3>
            <p className="text-gray-600">Receive timely updates and take action as needed.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-green-1 py-16 px-8 lg:px-16 text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gold">What Our Users Say</h2>
          <p className="text-lg mt-2">
            See how Notice Boy has helped property owners and lawyers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-lg md:text-xl italic">
            &quot Notice Boy saved me from a fraudulent title change. The alerts were fast and accurate! &quot
            </p>
            <h3 className="text-xl font-semibold mt-4">- Ramesh K., Property Owner</h3>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-lg md:text-xl italic">
            &quot As a lawyer, this tool has streamlined my work. I can proactively manage client properties! &quot
            </p>
            <h3 className="text-xl font-semibold mt-4">- Neha P., Lawyer</h3>
          </div>
        </div>
      </section>
    </>
  );
}

// import Image from 'next/image';

// import '../app/globals.css';

// export default function HeroSection() {
//   return (
//     <>
    
//     <section className="flex flex-col lg:flex-row items-center h-screen lg:items-start bg-cream-1 p-8 lg:p-16 ">
//       <div className="lg:w-1/2 space-y-6">
//         <h1 className="text-7xl font-bold text-gray-800 libre-baskerville-regular ">Notice Boy!</h1>
//         <p className="text-xl text-gray-700">
//         Your trusted partner in property protection and legal awareness. With Notice Boy, you’ll never miss a critical update about your property. Whether you’re a lawyer, property owner, or business, we provide tailored alerts to keep you informed and secure.
//         </p>
//         <hr className="my-6 border-gray-300" />
//         <p className="text-gray-700">
//           It uses utility classes for typography and spacing to space content out within the larger container.
//         </p>
//         <button className="px-6 py-3 text-lg w-full  text-black  bg-cream-3  hover:bg-[#f3efe9]">
//           Learn more
//         </button>
//       </div>
//       <div className="mt-8 lg:mt-0 lg:w-1/2">
//       <div style={{ height: "395px", position: "relative" }}>
//   <Image
//     src="https://images.unsplash.com/photo-1433574466251-fe1be0d9b3d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     alt="Background Image"
//     className='ml-4'
//     objectFit="cover" // Or "contain" depending on your preference
//     layout="fill"
//   />
// </div>



//       </div>
//     </section>

//     <section className="flex flex-col lg:flex-row items-center h-screen  lg:items-start bg-cream-2 p-8 lg:p-16 ">
//       <div className="lg:w-1/2 space-y-6">
//         <h1 className="text-7xl font-bold text-gray-800 libre-baskerville-regular ">Welcome to Our Website!</h1>
//         <p className="text-lg text-gray-700">
//           This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
//         </p>
//         <hr className="my-6 border-gray-300" />
//         <p className="text-gray-700">
//           It uses utility classes for typography and spacing to space content out within the larger container.
//         </p>
//         <button className="px-6 py-3 text-lg w-full font-semibold text-black  bg-cream-3  hover:bg-[#f3efe5]">
//           Learn more
//         </button>
//       </div>
//       <div className="mt-8 lg:mt-0 lg:w-1/2">
//       <div style={{ height: "395px", position: "relative" }}>
//   <Image
//     src="https://images.unsplash.com/photo-1433574466251-fe1be0d9b3d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     alt="Background Image"
//     className='ml-4'
//     objectFit="cover" // Or "contain" depending on your preference
//     layout="fill"
//   />
// </div>



//       </div>
//     </section>

//     <section className="flex flex-col lg:flex-row items-center h-screen  lg:items-start bg-green-1 p-8 lg:p-16 ">
//       <div className="lg:w-1/2 space-y-6">
//         <h1 className="text-7xl font-bold text-gold libre-baskerville-regular ">Welcome to Our Website!</h1>
//         <p className="text-lg text-white">
//           This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
//         </p>
//         <hr className="my-6 border-gray-300" />
//         <p className="text-white">
//           It uses utility classes for typography and spacing to space content out within the larger container.
//         </p>
//         <button className="px-6 py-3 text-lg w-full font-semibold text-black  bg-cream-3  hover:bg-[#f3efe5]">
//           Learn more
//         </button>
//       </div>
//       <div className="mt-8 lg:mt-0 lg:w-1/2">
//       <div style={{ height: "395px", position: "relative" }}>
//   <Image
//     src="https://images.unsplash.com/photo-1433574466251-fe1be0d9b3d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     alt="Background Image"
//     className='ml-4'
//     objectFit="cover" // Or "contain" depending on your preference
//     layout="fill"
//   />
// </div>



//       </div>
//     </section>
  
//     </>

    
//   );
// }