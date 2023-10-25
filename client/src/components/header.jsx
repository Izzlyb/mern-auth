
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='bg-slate-200 color: text-black'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/Home'>
            <li>Home</li>
          </Link>
          <Link to='/Profile'>
            <li>Profile</li>
          </Link>
          <Link to='/About'>
            <li>About</li>
          </Link>
          <Link to='/SignUp'>
            <li>Sign-Up</li>
          </Link>
          <Link to='/SignIn'>
            <li>Sign-In</li>
          </Link>
        </ul>
      </div>
    </div>
  ) 
};

export default Header;
