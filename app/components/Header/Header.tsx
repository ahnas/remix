import { Form } from '@remix-run/react';
import React, { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="relative shadow-lg px-3 py-2">
            <nav className="flex justify-between">
                <div className="w-[130px] md:w-[200px] flex items-center">
                    <img src="https://i.postimg.cc/MZCBXb1K/logo.png" alt="LOGO" />
                </div>
                <div className="flex items-center gap-3">
                    <div 
                        className={`navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] bg-white flex md:items-center gap-[1.5vw] top-[100%] ${menuOpen ? 'left-0' : 'left-[-100%]'} px-5 md:py-0 py-5`}
                    >
                        <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
                            <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                                <a href="#">Home</a>
                            </li>
                            <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                                <a href="#">Faculty</a>
                            </li>
                            <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                                <a href="#">Courses</a>
                            </li>
                            <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                                <a href="#">About Us</a>
                            </li>
                            <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                                <a href="#">Contact us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                    <Form method="post" action="/logout" className="mt-4">
                            <button
                                type="submit"
                                className="hover:bg-clip-text hover:text-transparent bg-gradient-to-br from-[#2b68e0] to-[#e710ea] border-solid border-2 border-[#5356e3] font-bold text-white px-5 py-2 rounded-full"
                            >
                                Logout
                            </button>
                        </Form>
                        {/* <ion-icon 
                            name="menu" 
                            onClick={toggleMenu} 
                            className="text-[30px] cursor-pointer md:hidden"
                        ></ion-icon> */}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
