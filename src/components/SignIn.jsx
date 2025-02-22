import React, { useState } from 'react';
import { Github, Facebook, Linkedin, Mail } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth , db } from '../components/firebase';
import { setDoc , doc } from 'firebase/firestore';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
    const [signinemail, setSigninemail] = useState("");
    const [signinpassword, setSigninpassword] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        signInWithEmailAndPassword(auth, signinemail, signinpassword);
        window.location.href = "/profile";
        console.log("Signed In");
    } catch (error) {
        
    }
  }

  const handleRegister = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if(user) {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                firstname: fname,
                uid: user.uid
            })
        }
        console.log("Signed Up");
      } catch (error) {
        console.log(error.message);
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 flex items-center justify-center p-4">
      <div className={`bg-white rounded-[30px] shadow-xl relative overflow-hidden w-full max-w-[768px] min-h-[480px] ${isSignUp ? 'active' : ''}`}>
        
        {/* Sign Up Form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out
          ${isSignUp ? 'translate-x-[100%] opacity-100 z-50' : 'opacity-0 z-10'} w-1/2`}>
          <form className="bg-white h-full flex flex-col items-center justify-center px-10 py-0" onSubmit={handleRegister}>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex gap-3 mb-5">
              <SocialIcon Icon={Mail} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Github} />
              <SocialIcon Icon={Linkedin} />
            </div>
            <span className="text-sm mb-4">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 mb-2 text-sm outline-none"
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 mb-2 text-sm outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 mb-2 text-sm outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-indigo-700 text-white px-11 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mt-4 hover:bg-indigo-800 transition-colors">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out
          ${isSignUp ? 'translate-x-[100%]' : ''} left-0 w-1/2 z-20`}>
          <form className="bg-white h-full flex flex-col items-center justify-center px-10 py-0" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="flex gap-3 mb-5">
              <SocialIcon Icon={Mail} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Github} />
              <SocialIcon Icon={Linkedin} />
            </div>
            <span className="text-sm mb-4">or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 mb-2 text-sm outline-none"
              onChange={(e) => setSigninemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 mb-2 text-sm outline-none"
              onChange={(e) => setSigninpassword(e.target.value)}
            />
            <a href="#" className="text-sm text-gray-700 hover:text-indigo-700 transition-colors">
              Forgot Your Password?
            </a>
            <button className="bg-indigo-700 text-white px-11 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mt-4 hover:bg-indigo-800 transition-colors">
              Sign In
            </button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out
          ${isSignUp ? '-translate-x-full rounded-r-[150px] rounded-l-none' : 'rounded-l-[150px]'} z-[1000]`}>
          <div className={`bg-gradient-to-r from-indigo-500 to-indigo-700 text-white relative -left-full h-full w-[200%]
            transform ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'} transition-transform duration-600 ease-in-out`}>
            
            {/* Toggle Left Panel */}
            <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center
              transform ${isSignUp ? 'translate-x-0' : '-translate-x-[200%]'} transition-transform duration-600 ease-in-out`}>
              <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-sm mb-4">Enter your personal details to use all site features</p>
              <button
                onClick={toggleForm}
                className="bg-transparent border-2 border-white text-white px-11 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mt-4 hover:bg-white/10 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Toggle Right Panel */}
            <div className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center
              transform ${isSignUp ? 'translate-x-[200%]' : 'translate-x-0'} transition-transform duration-600 ease-in-out`}>
              <h1 className="text-2xl font-bold mb-2">Hello, Friend!</h1>
              <p className="text-sm mb-4">Register with your personal details to use all site features</p>
              <button
                onClick={toggleForm}
                className="bg-transparent border-2 border-white text-white px-11 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mt-4 hover:bg-white/10 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ Icon }) {
    return (
      <a
        href="#"
        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Icon size={20} />
      </a>
    );
  }



export default SignIn;