import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { HiLocationMarker } from 'react-icons/hi';
import {
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Button } from '@mui/material';

export const ContactForm = () => {
  return (
    <div className='bg-[#FEC99A] w-screen md:h-screen h-auto'>
      <div className='flex justify-around items-center mx-20 md:flex-row flex-col'>
        {/* textual content */}
        <div className='md:w-1/2 w-full md:p-20 my-10 md:my-0  flex-col'>
          <h1 className='text-4xl font-semibold text-white'>Contáctenos</h1>
          <p className='text-gray-700 font-semibold text-sm my-10'>
            Completa el formulario y nos comunicaremos contigo en la brevedad.
          </p>
          <div className='flex-col my-20 gap-5 flex  '>
            <div className='flex gap-5 p-4 border border-gray-500 hover:border-pink-700 md:w-1/2 w-full rounded-lg group cursor-pointer items-center'>
              <BsTelephoneFill className='text-xl text-gray-500  group-hover:text-white' />
              <p className='text-gray-600 text-base font-semibold group-hover:text-white'>
                +595-991777-777
              </p>
            </div>
            <div className='flex gap-5 p-4 border border-gray-500 hover:border-pink-700 md:w-1/2 w-full rounded-lg group cursor-pointer items-center'>
              <GrMail className='text-xl text-gray-500  group-hover:text-white' />
              <p className='text-gray-500 text-base font-semibold group-hover:text-white'>
                info@margaret-art.com
              </p>
            </div>
            <div className='flex gap-5 p-4 border border-gray-500 hover:border-pink-700 md:w-1/2 w-full rounded-lg group cursor-pointer items-center'>
              <HiLocationMarker className='text-xl text-gray-500  group-hover:text-white' />
              <p className='text-gray-500 text-base font-semibold group-hover:text-white'>
                Asunción, PY
              </p>
            </div>
          </div>

          <div className='flex gap-8  justify-center md:justify-start '>
            <FaInstagram className='text-2xl text-white hover:text-pink-700 cursor-pointer' />
            <FaXTwitter className='text-2xl text-white hover:text-gray-700 cursor-pointer' />
            <FaYoutube className='text-2xl text-white hover:text-red-700 cursor-pointer' />
            <FaPinterest className='text-2xl text-white hover:text-red-700 cursor-pointer' />
          </div>
        </div>
        {/* Contact form */}
        <div className='bg-white p-12 rounded-lg shadow-md'>
          <form>
            <div className='grid xl:grid-cols-2 xl:gap-10'>
              <input
                type='text'
                name='first_name'
                id='first_name'
                className='form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                placeholder='Nombre'
                required={true}
              />

              <input
                type='text'
                name='last_name'
                id='last_name'
                className='form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                placeholder='Apellido'
                required={true}
              />
            </div>
            <input
              type='email'
              name='email'
              className='form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder='Email'
              required={true}
            />
            <input
              type='text'
              name='subject'
              className='form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder='Asunto'
              required={true}
            />

            <div className='flex justify-center'>
              <textarea
                className='form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                id='exampleFormControlTextarea1'
                rows={3}
                placeholder='Tu mensaje'
                required={true}
              ></textarea>
            </div>

            <Button
              variant='outlined'
              fullWidth
              color="primary"
              sx={{ mb: 1 }}
            >
              Enviar mensaje
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};
