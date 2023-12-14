import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../lib/axios';

const MbtiForm = () => {
    const location = useLocation();
    const email = location.state.id;
    const password = location.state.pass;

    const [formData, setFormData] = useState({
        gmail: email,
        Ne: "",
        Ni: "",
        Te: "",
        Ti: "",
        Se: "",
        Si: "",
        Fe: "",
        Fi: "",
        Type: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send form data to the server
            const response = await axiosInstance.post('/users/saveMbti', formData);
            console.log('Server Response:', response.data);

            // Handle success or navigate to another page
        } catch (error) {
            console.error('Error submitting form:', error.response.data.error);
            // Handle error
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* <div>
                    <label htmlFor="gmail" className="block text-sm font-medium text-gray-700">
                        Gmail:
                    </label>
                    <input
                        type="text"
                        id="gmail"
                        name="gmail"
                        value={formData.gmail}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div> */}

                <div>
                    <label htmlFor="Ne" className="block text-sm font-medium text-gray-700">
                        Ne:
                    </label>
                    <input
                        type="number"
                        id="Ne"
                        name="Ne"
                        value={formData.Ne}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Ni" className="block text-sm font-medium text-gray-700">
                        Ni:
                    </label>
                    <input
                        type="number"
                        id="Ni"
                        name="Ni"
                        value={formData.Ni}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Te" className="block text-sm font-medium text-gray-700">
                        Te:
                    </label>
                    <input
                        type="number"
                        id="Te"
                        name="Te"
                        value={formData.Te}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Ti" className="block text-sm font-medium text-gray-700">
                        Ti:
                    </label>
                    <input
                        type="number"
                        id="Ti"
                        name="Ti"
                        value={formData.Ti}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Se" className="block text-sm font-medium text-gray-700">
                        Se:
                    </label>
                    <input
                        type="number"
                        id="Se"
                        name="Se"
                        value={formData.Se}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Si" className="block text-sm font-medium text-gray-700">
                        Si:
                    </label>
                    <input
                        type="number"
                        id="Si"
                        name="Si"
                        value={formData.Si}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Fe" className="block text-sm font-medium text-gray-700">
                        Fe:
                    </label>
                    <input
                        type="number"
                        id="Fe"
                        name="Fe"
                        value={formData.Fe}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Fi" className="block text-sm font-medium text-gray-700">
                        Fi:
                    </label>
                    <input
                        type="number"
                        id="Fi"
                        name="Fi"
                        value={formData.Fi}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Type" className="block text-sm font-medium text-gray-700">
                        Type:
                    </label>
                    <input
                        type="text"
                        id="Type"
                        name="Type"
                        value={formData.Type}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MbtiForm;
