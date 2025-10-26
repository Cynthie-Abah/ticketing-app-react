import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <section className="overflow-y-scroll h-screen">
          <Outlet/>
    </section>
  )
}

export default DashboardLayout