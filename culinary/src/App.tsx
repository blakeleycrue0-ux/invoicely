import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import DishDetail from './routes/DishDetail'
import CookMode from './routes/CookMode'
import Saved from './routes/Saved'
import About from './routes/About'

// scroll to top on route change (except in-page anchors)
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Cook Mode is full-screen — no app chrome */}
        <Route path="/cook/:id" element={<CookMode />} />

        {/* everything else lives inside the Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dish/:id" element={<DishDetail />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </>
  )
}
