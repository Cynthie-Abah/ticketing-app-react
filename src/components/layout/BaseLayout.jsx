import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

const BaseLayout = () => {
  return (
    <div className="relative">
        <Header />

        <main className="min-h-screen">
          <Outlet />
        </main>

        <Footer />
    </div>
  )
}

export default BaseLayout