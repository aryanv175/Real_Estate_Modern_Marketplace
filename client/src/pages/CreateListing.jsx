import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { set } from 'mongoose';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
      imageUrls: [],
      name: '',
      description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(formData);
    const handleImageSubmit = (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
  
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch((err) => {
            setImageUploadError('Image upload failed (2 mb max per image)');
            setUploading(false);
          });
      } else {
        setImageUploadError('You can only upload 6 images per listing');
        setUploading(false);
      }
    };
  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
  
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
          setFormData({
            ...formData,
            type: e.target.id,
          });
        }
    
        if (
          e.target.id === 'parking' ||
          e.target.id === 'furnished' ||
          e.target.id === 'offer'
        ) {
          setFormData({
            ...formData,
            [e.target.id]: e.target.checked,
          });
        }
    
        if (
          e.target.type === 'number' ||
          e.target.type === 'text' ||
          e.target.type === 'textarea'
        ) {
          setFormData({
            ...formData,
            [e.target.id]: e.target.value,
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (formData.imageUrls.length < 1)
            return setError('You must upload at least one image');
          if (+formData.regularPrice < +formData.discountPrice)
            return setError('Discount price must be lower than regular price');
          setLoading(true);
          setError(false);
          const res = await fetch('/api/listing/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              userRef: currentUser._id,
            }),
          });
          const data = await res.json();
          setLoading(false);
          if (data.success === false) {
            setError(data.message);
          }
          navigate(`/listing/${data._id}`);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

  return (
    <main className='container py-4'>
      <h1 className='text-primary text-center my-4 fw-bold'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='row g-3'>
        <div className='col-md-6'>
          <input
            type='text'
            placeholder='Name'
            className='form-control'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className='col-md-6'>
          <textarea
            placeholder='Description'
            className='form-control'
            id='description'
            rows='3'
            required
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <div className='col-12'>
          <input
            type='text'
            placeholder='Address'
            className='form-control'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
        </div>
        <div className='col-12'>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='sale' onChange={handleChange} checked={formData.type === 'sale'} />
            <label className='form-check-label' htmlFor='sale'>Sell</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='rent' onChange={handleChange} checked={formData.type === 'rent'}/>
            <label className='form-check-label' htmlFor='rent'>Rent</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='parking' onChange={handleChange} checked={formData.parking}/>
            <label className='form-check-label' htmlFor='parking'>Parking spot</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='furnished' onChange={handleChange} checked={formData.furnished}/>
            <label className='form-check-label' htmlFor='furnished'>Furnished</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='offer'  onChange={handleChange} checked={formData.offer}/>
            <label className='form-check-label' htmlFor='offer'>Offer</label>
          </div>
        </div>
        <div className='col-md-3'>
          <input
            type='number'
            className='form-control'
            id='bedrooms'
            placeholder='Beds'
            min='1'
            max='10'
            required
            onChange={handleChange}
            value={formData.bedrooms}
          />
        </div>
        <div className='col-md-3'>
          <input
            type='number'
            className='form-control'
            id='bathrooms'
            placeholder='Baths'
            min='1'
            max='10'
            required
            onChange={handleChange}
            value={formData.bathrooms}
          />
        </div>
        <div className='col-md-3'>
          <input
            type='number'
            className='form-control'
            id='regularPrice'
            placeholder='Regular price ($ / month)'
            min='50'
            max='10000000'
            required
            onChange={handleChange}
            value={formData.regularPrice}
          />
        </div>
        {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
            )}
        <div className='col-md-6'>
          <label htmlFor='images' className='form-label'>
            Images (max 6)
          </label>
          <input
            className='form-control'
            type='file'
            id='images'
            accept='image/*'
            multiple
          />
        </div>
        <div className='col-md-6 d-flex align-items-end'>
            <input
                onChange={(e) => setFiles(e.target.files)}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
            />
          <button type='button' disabled={uploading} onClick={handleImageSubmit} className='btn w-100' style={{ backgroundColor: '#ff5722', color: 'white' }}>{uploading ? 'Uploading...' : 'Upload'}</button>
        </div>
        <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}

          <button disabled = {loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
      </form>
    </main>
  );
}
