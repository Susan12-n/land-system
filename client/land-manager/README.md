🌍 LandWise
LandWise is a modern land listing and management platform designed to connect users with available land properties across counties in Kenya. It includes user authentication, admin panel for land uploads, detailed listings, and contact features.

🚀 Features
🔐 User Registration & Login (with Role-based Access)

🧑‍💼 Admin Panel to upload, view, and delete land records

📋 Detailed Land Listings with:

Name, Description, Area, Price, Status, Size, and Image(s)

📞 Contact Us Form

📄 About Page with Vision, Mission & Affiliate Partners

🌐 Responsive UI with Tailwind CSS

🔗  Navbar and Footer with social links

🛠️ Tech Stack
Technology	Description
React	Frontend Framework (Vite or CRA)
Tailwind	Styling Framework
Axios	HTTP Client
Node.js	Backend Runtime
Express.js	Backend Framework
MongoDB	NoSQL Database
JWT	User Authentication
Multer	Image Uploads

📁 Folder Structure (Frontend)
bash
Copy
Edit
src/
├── assets/            # Static images/logos
├── components/        # Reusable UI components (Navbar, Footer, ProtectedRoute)
├── pages/             # Page components (Home, Login, Register, Admin, LandDetails, Contact, About)
├── api.js             # Axios configuration
├── App.jsx            # Main routing file
└── main.jsx           # React DOM root
🔧 Getting Started
📦 Prerequisites
Node.js

MongoDB

(Optional) Vite for React setup

🧪 Installation
bash
Copy
Edit
# Clone the repository
git clone https://github.com/your-username/landwise.git
cd landwise

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
⚙️ Environment Variables
Create a .env file in both client/ and server/ folders:

Frontend (client/.env)

bash
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
Backend (server/.env)

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_secret
🧼 Usage
bash
Copy
Edit
# Start Backend
cd server
npm run dev

# Start Frontend (in a new terminal)
cd client
npm run dev
Open your browser at http://localhost:5173 (Vite default).

✨

📬 Contact
Need help or want to contribute?

Email: ngesasuzan@gmail.com
