import { Outlet, useLocation } from 'react-router-dom'

const App = () => {
  const {pathname} = useLocation()

  return (
    <div className='w-[340px] overflow-hidden bg-white relative h-[40rem] rounded-3xl border-[8px] border-black m-auto'>

      <div className='absolute left-1/2 -translate-x-1/2 bg-black h-4 w-16 rounded-full top-3'></div>
      {(pathname !== "/home" && pathname !== "/")  && <img className='w-14 my-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />}
      <Outlet />

      <div className='absolute left-1/2 -translate-x-1/2  bottom-1 bg-black h-1 rounded-xl w-24'></div>
    </div>
  )
}

export default App
