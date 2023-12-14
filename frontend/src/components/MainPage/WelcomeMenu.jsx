import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ... (imports)

function WelcomeMenu() {
    const location = useLocation();
    const email = location.state.id;
    const password = location.state.pass;
    const history = useNavigate();

    // State to manage the visibility of UserMenu
    const [userMenuVisible, setUserMenuVisible] = useState(false);

    // Ref to store reference to UserMenu
    const userMenuRef = useRef(null);

    const Goback = async (e) => {
        history("/main", { state: { id: email, pass: password } });
    }

    // Function to toggle UserMenu visibility
    const toggleUserMenu = () => {
        setUserMenuVisible(!userMenuVisible);
    }

    // Function to navigate to "/edit_profile"
    const navigateToEditProfile = () => {
        history("/edit_profile", { state: { id: email, pass: password } });
    }

    // Effect to close UserMenu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuVisible(false);
            }
        };

        // Add event listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef]);

    return (
        <nav className='p-4'>
            <nav className="border-gray-200">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <button onClick={Goback} className="TopMenu flex items-center space-x-1 rtl:space-x-reverse">
                        <img src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&" class="w-20" alt="Flowbite Logo " />
                        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">KMUTT</span>
                    </button>
                    <div class="TopMenu flex items-center justify-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
                        <button
                            type="button"
                            className="UserProfile flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            onClick={toggleUserMenu} // Call the toggleUserMenu function on button click
                            id="user-menu-button"
                            aria-expanded={userMenuVisible} // Use the state value for aria-expanded
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span class="sr-only">Open user menu</span>
                            <img class="w-16 h-16 rounded-full" src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&" alt="user photo"></img>
                        </button>

                        {/* Add a condition to show or hide UserMenu based on the state */}
                        <div
                            ref={userMenuRef} // Set the ref to UserMenu
                            class={`UserMenu ${userMenuVisible ? "block" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                            id="user-dropdown"
                            style={{ position: "absolute", marginTop: 25, marginRight: -110, }} // Set position to relative
                        >
                            <ul class="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <button
                                        class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={navigateToEditProfile} // Call the navigateToEditProfile function on button click
                                    >
                                        Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                </li>
                            </ul>
                        </div>

                        <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <h1 className={`WelcomeUser text-6xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Welcome! {email}</h1>
                    </div>
                </div>
            </nav>
        </nav>
    )
}

export default WelcomeMenu;
