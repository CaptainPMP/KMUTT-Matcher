import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setfull_name] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/users/register', {
        gmail,
        password,
        full_name,
        confirm_password,
      })
      alert('Registration successful!');
      ;

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setError('');
        console.log('Registration successful!');
        // Redirect to login page
      }
    } catch (error) {
      console.error(error);
      setError('กรุณากรอกข้อมูลให้ครบ หรือลองใหม่อีกครั้ง');
    }
  };

  return (
    <section className='mx-auto bg-blue-0'>
      <div className='LoginForm bg-yellow-0 flex flex-wrap flex-col items-center'>
        <div className='BoxLogin bg-zinc-950/60 rounded-md'>
          <div className='WelcomeText bg-red-0 py-16 rounded-md'>
            <h1 className='text-center  text-white text-7xl font-semibold'>NO ACCOUNT YET?</h1>
          </div>
          <div className='bg-green flex flex-wrap flex-col pb-16'>
            <h1 className='text-5xl font-semibold text-white mx-auto'>Register</h1>

            {error && (
              <div className='text-red-500 text-center mt-5'>{error}</div>
            )}

            <input
              type='email'
              name='email'
              id='email'
              className='InfoLogin Email py-2 mt-12 text-center text-1xl font-semibold'
              placeholder='You@example.com'
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />

            <input
              type='text'
              name='full_name'
              id='full_name'
              className='InfoLogin Name py-2 mt-7 text-center text-1xl font-semibold'
              placeholder='Your name'
              value={full_name}
              onChange={(e) => setfull_name(e.target.value)}
            />

            <input
              type='password'
              name='password'
              id='password'
              className='InfoLogin Password py-2 mt-7 text-center text-1xl font-semibold'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type='password'
              name='confirm_password'
              id='confirm_password'
              className='InfoLogin RePassword py-2 mt-7 text-center text-1xl font-semibold'
              placeholder='Confirm Password'
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)}
            />

            <div className='flex flex-wrap flex-row justify-evenly bg-blue-00 w-full'>
              <button
                className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-cyan-600 rounded-full bg-green-100 mt-10 py-3 px-20 font-semibold'
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
