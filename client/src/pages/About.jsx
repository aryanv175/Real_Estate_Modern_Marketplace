import React from 'react';

export default function About() {
  return (
    <div className='bg-purdue-black text-white py-20 px-4 max-w-6xl mx-auto'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4 text-purdue-gold'>About AYA Estate</h1>
        <p className='text-lg text-gray-400 mb-6'>
          AYA Estate is a web application that connects you with your dream property.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4 text-purdue-gold'>Frontend Technologies</h2>
          <p className='text-gray-700'>
            AYA Estate's frontend is built using modern technologies such as React, React Router, and Redux. We focus on delivering an exceptional user experience.
          </p>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4 text-purdue-gold'>Backend Technologies</h2>
          <p className='text-gray-700'>
            Our backend is powered by Node.js, Express, and MongoDB. We ensure that our system is robust and efficient in handling data and user requests.
          </p>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4 text-purdue-gold'>User-Friendly Design</h2>
          <p className='text-gray-700'>
            We prioritize user-friendliness and ease of use in our app's design. AYA Estate is open-source and free for everyone to explore and enjoy.
          </p>
        </div>
      </div>
    </div>
  );
}
