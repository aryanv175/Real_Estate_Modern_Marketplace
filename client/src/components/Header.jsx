import {FaSearch} from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 

export default function Header() {
  return (
    <header className='bg-gray-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-base sm:text-xl text-gray-700 flex flex-wrap'>
                <span className='text-gray-500'>AYA</span> {/* AYA - Aryan, Yash, Akhil */}
                <span className='text-gray-800'>Estate</span>
            </h1>
            </Link>
            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                <input type="text" placeholder="Search..." className="bg-transparent px-2 py-1 rounded border focus:outline-none focus:ring focus:border-blue-300 w-24 sm:w-64" />
                <FaSearch className='text-slate-500' />
            </form>
            <ul className='flex gap-4'>
                <Link to='/home'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/sign-in'>
                    <li className='text-slate-700 hover:underline'>Sign in</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
