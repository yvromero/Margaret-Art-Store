
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {

  return (
    <>
      <div className='bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20'>
        <div className='p-5 '>
          <ul>
            <p className='text-gray-800 font-bold text-3xl pb-6'>
              Margarita<span className='text-blue-600'>Ruiz</span>
            </p>
            <div className='flex gap-6 pb-5'>
              <FaInstagram className='text-2xl cursor-pointer hover:text-yellow-600' />
              <FaTwitter className='text-2xl cursor-pointer hover:text-blue-600' />
              <FaLinkedin className='text-2xl cursor-pointer hover:text-blue-600' />
              <FaYoutube className='text-2xl cursor-pointer hover:text-red-600' />
            </div>
          </ul>
        </div>

        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>Tienda</p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Acerca de
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Contáctenos
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Tu cuenta
            </li>
          </ul>
        </div>
        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>
              Servicio al cliente
            </p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Seguimiento de mi Pedido
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Plazo de Entrega
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Gastos de Envío
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Devoluciones
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Envío
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Política de Cookies
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Términos y condiciones
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center text-center  p-5 bg-gray-50'>
        <h1 className=' text-gray-800 font-semibold'>
          © 2023 All rights reserved | Build with ❤ by{' '}
          <span className='hover:text-blue-600 font-semibold cursor-pointer'>
            The Romers{' '}
          </span>
        </h1>
      </div>
    </>
  );
}

export default Footer;