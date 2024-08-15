import Dashboard from '../app/(app)/dashboard/page';

function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-12 w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
            <p className="mb-4">
            welcome to true feedback app here you can take anonymous feedback from unkhown users.
            
            </p>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
            <ul>
              <li>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-white transition-colors duration-300"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/sign-in"
                  className="hover:text-white transition-colors duration-300"
                >
                  Log in
                </a>
              </li>
              <li>
                <a
                  href="/sign-up"
                  className="hover:text-white transition-colors duration-300"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
            <p>Jhansi UP, India</p>
            <p>UP 10001</p>
            <p>Email:piyushkhare671@gmail.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          </div>
          <p className="text-center text-xl pt-8"> © 2023 True Feedback. All rights reserved.</p>
      </footer>
    )
  }
  
  export default Footer