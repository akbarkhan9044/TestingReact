import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
    <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/customer">Customer</Link>
            <Link to="/setting">Setting</Link>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
