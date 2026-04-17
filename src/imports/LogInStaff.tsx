import React, { useState } from 'react';
import svgPaths from "./svg-s16wtksb7l";
// NOTICE: We deleted the figma:asset import line here!

function Bg() {
  return (
    <div className="absolute h-[1037px] left-[-251px] top-[154px] w-[902.069px]" data-name="BG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 902.069 1037">
        <g id="BG">
          <path d={svgPaths.p278eb900} fill="url(#paint0_linear_2_635)" id="Rectangle 2" />
          <path d={svgPaths.p24a81b80} fill="var(--fill-0, white)" id="Rectangle 1" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_635" x1="364" x2="567.5" y1="-2.12792e-05" y2="19">
            <stop stopColor="#3878C2" />
            <stop offset="1" stopColor="#4BAD40" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute contents left-[126px] top-[41px]" data-name="Logo">
      <div className="absolute h-[133px] left-[126px] top-[41px] w-[188px]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Changed src to look in your public folder for logo.png */}
          <img alt="Logo" className="absolute h-[248.86%] left-[-36.29%] max-w-none top-[-36.36%] w-[176.61%]" src="/logo.png" />
        </div>
      </div>
      <div className="absolute h-[35px] left-[168px] top-[174px] w-[105px]" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Changed src to look in your public folder for logo.png */}
          <img alt="Text Logo" className="absolute h-[393.09%] left-[-14.82%] max-w-none top-[-211.98%] w-[131.12%]" src="/logo.png" />
        </div>
      </div>
    </div>
  );
}

export default function LogInStaff() {
  // 1. React State to hold typed input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. The function to talk to your NestJS Backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Success! Welcome ${data.name}. Your role is: ${data.role}`);
        // Later we will redirect the user to the Staff Dashboard here
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Is NestJS running?');
    }
  };

  return (
    <div className="relative size-full min-h-screen" data-name="Log in (Staff)" style={{ backgroundImage: "linear-gradient(88.7631deg, rgb(143, 219, 255) 3.9489%, rgb(61, 173, 226) 99.513%)" }}>
      <Bg />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[43px] justify-center leading-[0] left-[228.5px] not-italic text-[#184e8d] text-[32px] text-center top-[415.5px] tracking-[1.6px] w-[293px]">
        <p className="leading-[50px]">Welcome Back!</p>
      </div>
      <Logo />

      {/* 3. The actual working Form */}
      <form onSubmit={handleLogin} className="absolute contents left-[73px] top-[478px]">
        
        {/* Email Input */}
        <input 
          type="email" 
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="absolute left-[73px] top-[478px] w-[307px] bg-transparent border-b-2 border-[#F2F2F2] font-['Poppins:Medium',sans-serif] text-[15px] outline-none text-[#3878c2] pb-1"
          required 
        />

        {/* Password Input */}
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="absolute left-[73px] top-[543px] w-[307px] bg-transparent border-b-2 border-[#EEEEEE] font-['Poppins:Medium',sans-serif] text-[15px] outline-none text-[#3878c2] pb-1"
          required 
        />

        {error && <p className="absolute left-[73px] top-[580px] text-red-500 text-sm">{error}</p>}

        <p className="-translate-x-full absolute decoration-solid font-['Poppins:Medium',sans-serif] leading-[normal] left-[380px] not-italic text-[#4bad40] text-[12px] text-right top-[605px] underline whitespace-nowrap cursor-pointer">Forgot Password?</p>
        
        {/* Submit Button */}
        <button type="submit" className="absolute left-[45px] top-[664px] bg-gradient-to-r from-[#20a9ea] to-[#006c9f] via-[#118cc6] h-[47px] rounded-[30px] w-[352px] font-['Poppins:SemiBold',sans-serif] text-white text-[16px] tracking-[0.8px] shadow-md hover:opacity-90 transition">
          Log in as Staff
        </button>
      </form>
    </div>
  );
}