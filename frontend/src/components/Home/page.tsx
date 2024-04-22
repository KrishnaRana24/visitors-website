"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Function to handle login based on user role
  const handleLogin = (role: any) => {
    if (role === "user") {
      router.push("/heroSection");
    } else if (role === "admin") {
      router.push("/auth/adminSignin");
    }
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/images/logo1.png"
                alt="visitor logo"
                width="170"
                height="170"
              />
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="text-blue-950 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-blue-950 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-blue-950 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                  {/* Login Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handleLogin("user")}
                      className="bg-purple-600 hover:bg-purple-900 text-white font-semibold py-2 px-8 rounded-md text-sm transition duration-300 ml-100 "
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleLogin("admin")}
                      className="bg-purple-600 hover:bg-purple-900 ms-2 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-300 ml-150 "
                    >
                      Admininstration
                    </button>
                    {/* <button onClick={() => handleLogin("admin")}>
                      Login as Admin
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to VisitorVault
          </h1>

          <p className="text-lg md:text-xl text-white">
            Unlock the gateway to seamless visitor management with VisitorVault.
            From touchless check-ins to real-time notifications, we redefine the
            visitor experience, ensuring every arrival is greeted with
            efficiency and security. Join us as we revolutionize the way spaces
            welcome guests, one digital interaction at a time.
          </p>
        </div>
      </div>

      {/* Features Section */}

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-4">
          <div className="text-center text-blue py-6">
            <h2 className="text-3xl font-bold text-blue-950">
              Features Of <span className="text-purple-600">VisitorVault</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center transition duration-300 hover:bg-indigo-100 hover:shadow-lg rounded-lg p-6 border border-gray-200">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Your SVG icon */}
              </svg>
              <div>
                <Image
                  src="/images/Otp-base.png"
                  alt=""
                  width="600"
                  height="600"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 text-blue-950">
                <strong>OTP-Based Authentication</strong>
              </h2>
              <p className="text-graydark">
                By using OTP-based authentication, visitors can easily and
                automatically verify their identity.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center transition duration-300 hover:bg-indigo-100 hover:shadow-lg rounded-lg p-6 border border-gray-200">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Your SVG icon */}
              </svg>
              <div>
                <Image
                  src="/images/paperless.png"
                  alt=""
                  width="400"
                  height="400"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 text-blue-950">
                <strong>Touchless & Paperless</strong>
              </h2>
              <p className="text-graydark">
                A touchless check-in process consumes less time & enhances the
                visit experience by going completely paperless.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center transition duration-300 hover:bg-indigo-100 hover:shadow-lg rounded-lg p-6 border border-gray-200">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Your SVG icon */}
              </svg>
              <div>
                <Image
                  src="/images/Otp-base.png"
                  alt=""
                  width="400"
                  height="400"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 text-blue-950">
                <strong>Real-Time Notifications</strong>
              </h2>
              <p className="text-graydark">
                Gives you the exact updates in real-time, thus offering maximum
                security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* action auth */}

      <section className="bg-gradient-to-r from-purple-600 to-indigo-800 py-20 ">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            A Visual Guide to Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <img
                src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_921,h_518/https://visitorz.io/wp-content/uploads/2023/05/img-video.png"
                alt="Visitor vault, Visitor management system"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="col-span-2">
              <div className="text-white mb-4">No hardware required</div>
              <p className="text-white mb-6">
                Simply print out the QR code that uniquely identifies your
                workspace and the VisitorVault Management system will take care
                of onboarding your visitors! Use advanced features like setting
                expiry for your QR code and be sure that it is not misused.
              </p>
              <div className="text-center">
                <Link
                  href="/heroSection"
                  className="bg-white text-purple-600 px-6 py-3 rounded-full inline-block font-semibold transition duration-300 hover:bg-purple-600 hover:text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* finish action auth */}
    </>
  );
}
