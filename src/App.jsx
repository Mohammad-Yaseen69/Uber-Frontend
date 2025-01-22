import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { pathname } = useLocation();

  return (
    <div id='app-toast-container"' className='w-[340px] overflow-hidden bg-white relative h-[40rem] rounded-3xl border-[8px] border-black m-auto'>

      <div className='absolute left-1/2 -translate-x-1/2 bg-black h-4 w-16 rounded-full top-3'></div>
      {(pathname !== "/home" && pathname !== "/") &&
        <img className='w-14 my-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
          position: "absolute", // Ensure it aligns with the container
          bottom: 0,
          right: 0,
          zIndex: 10, // Stay above other content inside the container
          height: "fit-content"
        }}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        transition={Slide}
        stacked={false}

      />

      <div className='absolute left-1/2 -translate-x-1/2 bottom-1 bg-black h-1 rounded-xl w-24'></div>
    </div>
  );
};

export default App;
