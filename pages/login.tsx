import { auth, firestore } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, } from 'react-icons/fa';
// const [showPassword, setShowPassword] = useState(false);
//   const [email, SetEmail] = useState('')
//   const [password, SetPassword] = useState('')
//   const [btnloading, setbtnloading] = useState()



interface ErrorPros  {
    message: string;
}
export default function Login() {

    const [error, SetError] = useState< ErrorPros | null>(null)
    const router = useRouter();
    const GoggleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const userCredential = await signInWithPopup(auth, provider);
          const user = userCredential.user;
          const userId = user.uid;
      
         
          const userDocRef = doc(firestore, "users", userId); 
          const userDoc = await getDoc(userDocRef); 
      
          if (!userDoc.exists()) {
    
            await setDoc(userDocRef, {
              email: user.email,
              userId,
            });
            console.log("User  data saved to Firestore");
          } else {
            console.log("User  already exists in Firestore");
          }
      
          
          router.push('/');
        } catch (error) {

          console.error("Error signing in:", error);
        }
      };
    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col gap-2.5 bg-[#1f1f1f] p-7 w-[450px] rounded-2xl font-sans">
            {/* Email Input */}
            {error && <p>{error.message}</p>}
            <div className="flex flex-col">
                <label className="text-white font-semibold">Email</label>
            </div>
            <div className="flex items-center border border-[#333] rounded-lg h-12 pl-2.5 transition-all duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
                <FaEnvelope className="text-white" size={20} />
                <input
                    type="text"
                    className="ml-2.5 bg-transparent w-full h-full text-white focus:outline-none"
                    placeholder="Enter your Email"
                />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
                <label className="text-white font-semibold">Password</label>
            </div>
            <div className="flex items-center border border-[#333] rounded-lg h-12 pl-2.5 transition-all duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
                <FaLock className="text-white" size={20} />
                <input
                    type="password"
                    className="ml-2.5 bg-transparent w-full h-full text-white focus:outline-none"
                    placeholder="Enter your Password"
                />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                    <input type="radio" />
                    <label className="text-white text-sm">Remember me</label>
                </div>
                <span className="text-sm text-[#2d79f3] font-medium cursor-pointer">
                    Forgot password?
                </span>
            </div>

            {/* Sign In Button */}
            <button className="mt-5 bg-[#2d79f3] text-white font-medium rounded-lg h-12 w-full cursor-pointer">
                Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-white text-sm mt-2.5">
                Don&apos;t have an account?{" "}
                <span className="text-[#2d79f3] font-medium cursor-pointer">
                    Sign Up
                </span>
            </p>

            {/* Divider */}
            <p className="text-center text-white text-sm mt-2.5">Or</p>

        
            <div className="flex gap-2.5">
            <button
            onClick={GoggleRegister}
            className="flex justify-center items-center gap-2.5 w-full h-12 rounded-lg border border-[#333] bg-[#2b2b2b] text-white font-medium cursor-pointer transition-all duration-200 hover:border-[#2d79f3]">
            <FaGoogle size={20} />
            Continue with Google
        </button>
        </div>
        </div>
        </div>
    );
}