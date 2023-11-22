import React from 'react';

function UserEdit() {
  return (
    <div>
      <div className='text-white text-center text-6xl mb-10'>MBTI :</div>
      <div className='EditAccount max-w-screen-2xl 0 flex flex-row mx-auto '>

        <div className='stblock w-2/5 bg- flex flex-col items-start justify-items-center '>
          <img className="UserPic bg-red-500 rounded-full mx-auto" src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&" alt="user photo" />
          <button type="button" className='EDIT bg-white text-4xl font-bold px-10 py-5 mt-3 mx-auto rounded-full'>EDIT</button>
        </div>

        <div className='UserInfo w-3/5 bg-gree py-20 '>
            <div className='text-4xl text-white '>Email : <span className='underline underline-offset-4'>talnw1123@gmail.com</span></div>
            <div className='text-4xl text-white pt-14'>Full Name : <span className='underline underline-offset-4' >Sirawit Arpawatcharanun </span></div>
            <div className='text-4xl text-white pt-14'>Password : </div>
        </div>

      </div>

    </div>
  );
}

export default UserEdit;
