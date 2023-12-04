import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import Contact from '../components/Contact';
import { useSelector } from 'react-redux';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className='bg-gray-100 text-gray-800 min-h-screen'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='flex flex-col items-center' style={{ marginTop: '50px', margin: 'auto' }}>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[500px] w-[700px] bg-cover bg-center rounded-lg'
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='max-w-xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg' style={{ marginBottom: '100px', minWidth: '700px' }}>
            <h1 className='text-2xl font-semibold text-gray-800 mb-2'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </h1>
            <p className='text-gray-700'>
              <FaMapMarkerAlt className='text-green-700 inline-block mr-2' />
              {listing.address}
            </p>
            <div className='flex mt-4'>
              <div className='mr-2 bg-red-600 text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </div>
              {listing.offer && (
                <div className='bg-green-600 text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </div>
              )}
            </div>
            <p className='mt-4 text-gray-800'>
              <span className='font-semibold'>Description:</span> {listing.description}
            </p>
            <ul className='mt-4 text-green-600 font-semibold text-sm flex flex-wrap items-center gap-2'>
              <li className='flex items-center whitespace-nowrap'>
                <FaBed className='text-lg mr-1' />
                {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
              </li>
              <li className='flex items-center whitespace-nowrap'>
                <FaBath className='text-lg mr-1' />
                {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
              </li>
              <li className='flex items-center whitespace-nowrap'>
                <FaParking className='text-lg mr-1' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center whitespace-nowrap'>
                <FaChair className='text-lg mr-1' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='mt-4 bg-green-600 text-white rounded-lg uppercase hover:bg-green-700 px-4 py-2'
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
