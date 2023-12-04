import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='bg-purdue-black text-white p-10'>
        <h1 className='text-purdue-gold font-bold text-3xl lg:text-6xl'>
          Find Your Next <span className='text-yellow-500'>Perfect</span> Place
        </h1>
        <Link
          to={'/search'}
          className='text-sm text-yellow-500 font-bold hover:underline mt-4 inline-block'
        >
          Search Listings
        </Link>
      </div>

      {/* listing results for offer, sale, and rent */}

      <div className='max-w-6xl mx-auto p-3 flex gap-8 my-3'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-purdue-gold'>
                Special Offers
              </h2>
              <Link
                className='text-sm text-yellow-500 hover:underline'
                to={'/search?offer=true'}
              >
                Show More
              </Link>
            </div>
            <div className='grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4'>
              {offerListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-purdue-gold'>
                Places for Rent
              </h2>
              <Link
                className='text-sm text-yellow-500 hover:underline'
                to={'/search?type=rent'}
              >
                Show More
              </Link>
            </div>
            <div className='grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4'>
              {rentListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-purdue-gold'>
                Places for Sale
              </h2>
              <Link
                className='text-sm text-yellow-500 hover:underline'
                to={'/search?type=sale'}
              >
                Show More
              </Link>
            </div>
            <div className='grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4'>
              {saleListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
