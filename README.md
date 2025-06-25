# JobSearch App (ReactJS)

Implemented Jobby App where users can log in and can see a list of jobs with search by Job title, filters based on Salary range and Employment type, etc 
● Implemented different pages like Login, Home, Jobs, Job item details using React components, props, state, lists, event handlers, form inputs.
● Authenticating by taking username, password and doing login post HTTP API Call.
● Persisted user login state by keeping jwt token in client storage, Sending it in headers of further API calls to authorize the user. 
● Implemented different routes for Login, Home, Jobs, Job item details pages by using React Router components Route, Switch, Link. 
● Implemented filters and search text by sending them as query parameters to jobs API calls.
● Redirecting to the login page if the user tries to open Home, Jobs, Job item details routes which need authentication by implementing protected Route. 

Technologies used: React JS, JS, CSS, Bootstrap, Routing, REST API Calls, Local Storage, JWT Token, Authorization, Authentication

## Features

- Search for jobs by title, company, or location
- View detailed job descriptions
- Save favorite jobs
- Responsive design for mobile and desktop
- User authentication (login/register)
- Apply to jobs directly from the app

## Login Credentials

- **Username:** lalit  
- **Password:** lalit@123

## Screenshots

![JobSearch App Screenshot](./screenshots/main.png)

## Live Demo

Check out the deployed app here: [jobsearch-app-react-js.vercel.app](https://jobsearch-app-react-js.vercel.app)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/JobSearch_App_ReactJs.git
    cd JobSearch_App_ReactJs
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

The project follows a standard ReactJS structure:

```
JobSearch_App_ReactJs/
├── public/                # Public assets
├── src/                   # Source code
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── styles/            # CSS styles
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
``` 

