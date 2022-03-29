# Frontend

## Dependencies

1. react

- React is a JavaScript library for creating user interfaces.

2. react-dom

- This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.

3. react-router-dom

- The react-router-dom package contains bindings for using React Router in web applications. Please see the Getting Started guide for more information on how to get started with React Router.

4. parcel

- Parcel is a zero configuration build tool for the web. It combines a great out-of-the-box development experience with a scalable architecture that can take your project from just getting started to massive production application.

Add these in package.json scripts

```js
"start": "parcel src/public/index.html",
"build": "parcel build"
```

## Initial setup

0. Project structure:

   - components (folder with reusable components)
   - context (folder with all contexts that will be used in react app)
   - pages (folder with components that represent pages in the app)
   - public (folder with public files such as html, css, favicon etc)
   - App.js (initial component for react application)

1. Create an `index.html` file with div in body, create an `App.jsx` file and render html that is returned from App component in div with `ReactDOM.render`.

2. Create routes on `/`, `/signin`, `/signup`. We will use `react-router-dom` V6

3. First things first, we want to connect your app to the browser's URL: import BrowserRouter and render it around your whole app.

4. Create Routes to render different components in different paths

- Use cors on our backend server

```js
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);
```

5. Create Signup component, create states for our email, password, name etc. Create `handleSubmit` function that will create a user object with our states as properties, if there are no required states for our user to be created, then throw an error. We will need `handleSubmit` in our `onSubmit` event handler on our form. Create a fetch request to our backend signup route, and send our created user object as json by using `JSON.stringify(user)` to backend. If `res.ok` then navigate to `/signin` by using `navigate` function from `useNavigate` hook imported from react-router-dom. Make sure that our jsx inputs set our states to what is typed into them by using `onChange` event handler.

6. Create Signin component, create states for our email and password. Create `handleSubmit` function that will create a user object with our states as properties, if there are no required states for our user to be created, then throw an error. We will need `handleSubmit` in our `onSubmit` event handler on our form. Create a fetch request to our backend signin route and send our created user object as json by using `JSON.stringify(user)` to backend. If `res.ok` then navigate to `/` by using `navigate` function from `useNavigate` hook imported from react-router-dom. Make sure that our jsx inputs set our states to what is typed into them by using `onChange` event handler.

7. Create authContext file that will have our authentication context. We need context so that all children that will be rendered inside of Provider will have access to our context. Create AuthContext with default values `React.createContext({authUser: null, loading: true})`. Create AuthUserProvider component that will take `{ children }` as a property. Create authUser state to save user info in the state so we can refer to it whenever we want within our app. Create loading state so that we know when the user is loaded and which page we need to show.
   Logout user
   We need this since our token cookie is httpOnly. This protects the cookie from being accessed through JS. Thus, only the server is able to confirm whether user is logged in or not. This useEffect will run as soon as it is mounted and will change the loading state to true whenever it is done. We will use this loading state to determine when we can show our app to the user. This will make sure that we have our user loaded and we can show the correct page. Create `useEffect` hook that will take in an `immediately invoked` async function that will make a fetch request to `/token` route to our backend route to check if token that we have in our cookies is valid. If we have a successful response then take our user from `res.json()` with destructuring, and set our `authUser` state to our user from response, then we will set our `loading` state to false. We will run this useEffect every time our component mounts, therefore we will use [] as second argument in useEffect. Create a logout async function that will make a fetch request to `/logout`, if we have a successful response then set our `authUser` state to null. Create a signin async function that will take `user` as a parameter and make a fetch request to `/signin`, and will send our `user` parameter as json using `body: JSON.stringify(user)`. If we have a successful response then take our user from `res.json()` with destructuring, and set our `authUser` state to our user from response. Create an object called `auth` with all values that we want to share within our app through Provider. Final return of AuthUserProvider component will be `AuthContext.Provider` component that will take our `auth` object with values that we want to share as `value={auth}` attribute and will take our `{children}` property as component children inside `AuthContext.Provider` component. At the end we will export a custom hook `export const useAuth = () => React.useContext(AuthContext)` that will allow us to not repeatedly call `React.useContext` in multiple files.

8. Create RequireAuth component that will check if we are authenticated to access `/home` route, if we are not authenticated then we will be navigated to `/signin` route. RequireAuth will take `{ children }` as property, and use `authUser` and `loading` context values from our `useAuth` hook by destructuring them `const { authUser, loading } = useAuth();`. We will use `useEffect` hook that will navigate us to `/signin` if our `loading` is false and our `authUser` is false, meaning that we are not authenticated. This `useEffect` hook will run every time we navigate, every time our `loading` or `authUser` state changes, so it will take `[navigate, loading, authUser]` as second argument. After `useEffect` hook is done we create an if statement again that will return `null` if our `loading` is false and our `authUser` is false, we need it again to make sure that our page will not load before our component mounts, `useEffect` only runs after the component is mounted. And final return of `RequireAuth` component will be `<>{children}</>` that we passed in as property.

9. Create RequireUnauth component that will do the opposite of RequireAuth. It will make sure we are not authenticated to access `/signin` and `/signup` routes, if we are authenticated then we will be navigated to `/` route. RequireUnauth will take `{ children }` as property, and use `authUser` and `loading` context values from our `useAuth` hook by destructuring them `const { authUser, loading } = useAuth();`. We will use `useEffect` hook that will navigate us to `/` if our `loading` is false and our `authUser` is true, meaning that we are authenticated. This `useEffect` hook will run every time we navigate, every time our `loading` or `authUser` state changes, so it will take `[navigate, loading, authUser]` as second argument. After `useEffect` hook is done we create an if statement again that will return `null` if our `loading` is false and our `authUser` is true, we need it again to make sure that our page will not load before our component mounts, `useEffect` only runs after the component is mounted. And final return of `RequireUnauth` component will be `<>{children}</>` that we passed in as property.
