import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa";

export default function AboutPage() {
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-gray-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-blue-950 mb-6 text-center">
              About Us
            </h1>
            <div className="space-y-6 text-blue-950">
              <p>
                Welcome to our Visitor Management System, a comprehensive
                solution designed to streamline and enhance the way
                organizations manage and track visitors. Our system is built
                with the latest technologies to ensure security, efficiency, and
                a seamless user experience.
              </p>
              <p>
                Our mission is to provide an easy-to-use platform that helps
                businesses of all sizes to manage their visitor flow with
                minimal hassle. Whether you are a small office, a large
                corporation, or a public institution, our system is tailored to
                meet your needs.
              </p>
              <h2 className="text-xl font-semibold mb-4">Our Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Secure visitor registration and check-in</li>
                <li>Real-time visitor tracking and reporting</li>
                <li>Customizable visitor badges and notifications</li>
                <li>Integration with access control systems</li>
                <li>User-friendly interface and mobile support</li>
              </ul>
              <h2 className="text-xl font-semibold mb-4">Our Team</h2>
              <p>
                Our team is composed of experienced professionals in the fields
                of software development, security, and customer service. We are
                dedicated to providing top-notch support and continuous
                improvements to our system.
              </p>
              <p>
                Thank you for choosing our Visitor Management System. We are
                committed to helping you achieve a safe and efficient visitor
                management process.
              </p>
              <div className="mt-8 text-center">
                <p className="text-lg">Contact Us:</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="mailto:info@visitorsystem.com"
                    className="text-purple-900 hover:text-blue-950"
                    aria-label="Email"
                  >
                    <FaEnvelope size={24} />
                  </a>
                  <a
                    href="https://twitter.com/visitorsystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-900 hover:text-blue-950"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="https://instagram.com/visitorsystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-900 hover:text-blue-950"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://facebook.com/visitorsystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-900 hover:text-blue-950"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://telegram.me/visitorsystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-900 hover:text-blue-950"
                    aria-label="Telegram"
                  >
                    <FaTelegram size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
