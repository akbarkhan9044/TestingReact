import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/home/Home'
import Detail from './page/detail/Detail'
import Cart from './page/cart/Cart'
import Dashboard from './dashboard/Dashboard';
import Customer from './dashboard/Customer';
import Profile from './dashboard/Profile'
import ThemeToggle from './component/ThemeToggle'
import Counter from './page/counter/Counter'
import Setting from './page/setting/Setting'
import User from './page/user/User'
function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/user" element={<User />} />
        <Route
        path="/dashboard" element={<Dashboard/>}
        >
          <Route path="profile" element={<Profile/>} />
          <Route path="customer" element={<Customer/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
