import { FaEnvelope, FaLock, FaGoogle, } from 'react-icons/fa';
export default function Register() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col gap-2.5 bg-[#1f1f1f] p-7 w-[450px] rounded-2xl font-sans">
            {/* Email Input */}
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
            Sign Up            </button>

            {/* Sign Up Link */}
            <p className="text-center text-white text-sm mt-2.5">
                Already have an account?{" "}
                <span className="text-[#2d79f3] font-medium cursor-pointer">
                    Sign In
                </span>
            </p>

            {/* Divider */}
            <p className="text-center text-white text-sm mt-2.5">Or</p>

            {/* Social Buttons */}
            {/* <div className="flex gap-2.5">
                
                <button className="flex justify-center items-center gap-2.5 w-full h-12 rounded-lg border border-[#333] bg-[#2b2b2b] text-white font-medium cursor-pointer transition-all duration-200 hover:border-[#2d79f3] ">
                    <FaGoogle className="text-white" size={20} />
                    Google
                </button>
                <button className="flex justify-center items-center gap-2.5 w-full h-12 rounded-lg border border-[#333] bg-[#2b2b2b] text-white font-medium cursor-pointer transition-all duration-200 hover:border-[#2d79f3]">
                    <FaApple className="text-white" size={20} />
                    Apple
                </button>
            </div> */}
            <div className="flex gap-2.5">
            <button className="flex justify-center items-center gap-2.5 w-full h-12 rounded-lg border border-[#333] bg-[#2b2b2b] text-white font-medium cursor-pointer transition-all duration-200 hover:border-[#2d79f3]">
            <FaGoogle size={20} />
            Continue with Google
        </button>
        </div>
        </div>
        </div>
    );
}