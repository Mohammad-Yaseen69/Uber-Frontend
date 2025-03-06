import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from './apis/api';
import { useDispatch } from "react-redux"
import { login as LoginUser } from './store/user.slice';
import { login as LoginDriver } from "./store/driver.slice"
import { useEffect } from 'react';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    const loggedIn = document.cookie.includes('loggedIn=true')
    const loggedInAs = document.cookie.includes("loggedInAs=driver") ? "driver" : document.cookie.includes("loggedInAs=user") ? "user" : null

    if (loggedIn) {
      if (pathname.includes("login") || pathname.includes("register") || pathname.includes("set-info")) {
        console.log("here")
        navigate("/")
      }

      const getData = async () => {
        try {
          const response = await fetchData('users/get-user')
          console.log(response)
          if (response.data.data.userType === "User") {
            if (loggedInAs !== "user") {
              dispatch(LoginUser({
                data: null,
                error: "Something went wrong please login again!",
              }))
            } else {
              dispatch(LoginUser({
                data: response.data.data,
                error: null,
              }))
            }
          } else {

            if (loggedInAs !== "driver") {
              dispatch(LoginDriver({
                data: null,
                error: "Something went wrong please login again!",
              }))
            } else {
              dispatch(LoginDriver({
                data: response.data.data,
                error: null,
              }))
            }
          }

          if (response.data.statusCode === 401) {
            dispatch(LoginUser({ error: "An error occurred" }))
            dispatch(LoginDriver({ error: "An error occurred" }))

            document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            document.cookie = "loggedInAs=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            navigate("/login")
          }

        } catch (error) {
          dispatch(LoginUser({ error: "An error occurred" }))
          dispatch(LoginDriver({ error: "An error occurred" }))
          console.log(error.response?.data)
        }
      }

      getData()
    }
    else {
      const isAuthPage = pathname.includes("login") || pathname.includes("register") || pathname.includes("set-info")
      if (!isAuthPage) {
        navigate("/")
      }
    }
  }, [])


  return (
    <div id='app-toast-container"' className='w-[340px] overflow-hidden bg-white relative h-[40rem] rounded-3xl border-[8px] border-black m-auto'>
      <div className='absolute z-[999] left-1/2 -translate-x-1/2 bg-black h-4 w-16 rounded-full top-3'></div>
      {(pathname !== "/home" && pathname !== "/") &&
        <img onClick={() => navigate("/")} className='w-14 cursor-pointer my-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      }
      <Outlet />

      {/* ToastContainer with containerId */}
      <ToastContainer
        containerId="app-toast-container"
        position="bottom-center"
        hideProgressBar
        closeOnClick
        draggable
        draggablePercent={60}
        pauseOnHover
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 10,
          height: "fit-content"
        }}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        transition={Slide}
        stacked={false}

      />

      <div className='absolute z-[999] left-1/2 -translate-x-1/2 bottom-1 bg-black h-1 rounded-xl w-24'></div>
    </div>
  );
};

export default App;
