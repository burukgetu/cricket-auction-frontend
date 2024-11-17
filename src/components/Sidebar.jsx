import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static z-50`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold">My Sidebar</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <a href="#home" className="block px-4 py-2 hover:bg-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block px-4 py-2 hover:bg-gray-700">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="block px-4 py-2 hover:bg-gray-700">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="block px-4 py-2 hover:bg-gray-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 bg-gray-100 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 lg:hidden focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Responsive Sidebar</h1>
        </header>

        {/* Content Area */}
        <main className="p-4 bg-gray-100 h-full overflow-y-auto">
          <h2 className="text-2xl font-semibold">Welcome to the Dashboard!</h2>
          <p className="mt-4">
            This is the main content area. Resize the window to see the
            responsive sidebar in action.
          </p>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
