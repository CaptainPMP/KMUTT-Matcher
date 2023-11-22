import React from 'react'

function userProfile(){
    document.addEventListener('DOMContentLoaded', function () {
        const userProfileButton = document.getElementsByClassName('UserProfile');
        const userMenu = document.getElementsByClassName('UserMenu');
        userProfileButton.addEventListener('click', function () {
            // Toggle the 'hidden' class on the UserMenu element
            userMenu.classList.toggle('hidden');
        });
    });
}

function WelcomeMenu() {
    return (
        <nav className='p-4 '>
            <nav className="border-gray-200">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="" className="TopMenu flex items-center space-x-1 rtl:space-x-reverse ">
                        <img src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&" class="w-20" alt="Flowbite Logo " />
                        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">KMUTT</span>
                    </a>
                    <div class=" TopMenu flex items-center justify-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
                        <button type="button" className="ํUserProfile flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { userProfile()}} id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span class="sr-only">Open user menu</span>
                            <img class="w-16 h-16 rounded-full" src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&" alt="user photo"></img>
                        </button>
                        
                        <div class="UserMenu z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div class="px-4 py-3">
                                <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul class="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
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
                        <h1 className='WelcomeUser text-8xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>Welcome! User</h1>
                    </div>
                </div>
            </nav>
        </nav>
    )
}


export default WelcomeMenu