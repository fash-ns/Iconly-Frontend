# Iconly.pro test project front-end
This project is the response of the given test task

## What you should do in order to run the code
Just clone this repository, use yarn package manager (or npm by the way!) to download
the application dependencies and use `yarn dev` or `npm run dev` in order to run the
development server.  
NOTE: Since I have used `vite` as the project's bundler, development server is served
at 127.0.0.1:5173 instead of 127.0.0.1:3000. you can also check the production build
by running `yarn build` and `yarn preview`. Production preview will be served at port
4173

### Using a custom port for serving back-end project
If you have decided to use a port other than 80 for serving backend project, you need
to change the requests baseURL parameter inside `App.tsx`. You can change
`axios.defaults.baseURL` value inside the `App.tsx` file to the URL of the back-end
project. Just be careful not to delete the `/api` at the end of the route.
For example, if the back-end project is being served at `localhost:8000` the value of
`axios.defaults.baseURL` should be `http://localhost:8000/api`

## What did I do
There is two directories inside the `src/` directory:
1. modules in which all the components, stylesheets, hooks and helper functions are
stored.
2. pages which holds the JSX components for pages.

There is two TSX files in `src/` directory as well. `App.tsx` is the core of project
and `main.tsx` that is a component in which React root is created.

React context API is preferred in this project above `redux` since It's available
out of the box with React and, is a part of it's core. Another reason that I picked
React context is the project is small sized and redux advance features are not
useful in this project.  
I have also used CSS modules for styling because installing additional UI libraries
were forbidden according to the project definition. I usually use CSS in JS libraries
like `emotion`.

### Stateful authentication
Since authentication process is stateful, I need to retrieve user information from
server everytime. I have implemented a wrapper called `AuthGate` for getting users'
authentication status and data on each page refresh.

### Routing
This project needed conditional routes since some routes are open just for guest
users (login and register routes) and some other is just for authenticated users.
In order to satisfy this need, I have implemented a `route` module. containing a
route object in `routes.tsx`, protectRoutes helper function in
`utils/projectRoutes.tsx` and the main router logic for registering routes in
`RouteBootstrapper.tsx`

### Using loaders and actions
`react-router-dom` added some cool new features to the latest version. actions and
loaders are two of them. I wanted to use the action feature in auth routes. But if
I wanted to do so, I needed to implement three routes for authentication:

1. Route for entering email.
2. Route for entering password if the email address is existed,
3. Route for entering user data if the email address is new.

If there are three separate routes, How to handle user direct route entrance?
For example how to detect when user directly opens `/auth/login` route which holds
a form for entering a password for a previously entered email? We can use the 
`react-router-dom`'s state ability and pass email from the first step to other steps.
So, We can have 3 different routes with no technical problem. But we cannot handle
form submits using `action` feature as functions executed as action can change the
route using `redirect` function (There's no place for using `useNavigate` hook
since the function is neither a component nor a hook). So states cannot be set using
`redirect` function. And that's why actions are not handy in this situation.

### User context
As it previously mentioned, I have used React context for managing global states.
This project only needs user status to be global. So I have implemented two contexts.
One for holding the user's data and second for holding the user's data mutator
function. Two hooks also implemented for accessing each context's data.