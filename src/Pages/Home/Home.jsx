import { Link } from 'react-router';
import { ROUTES } from '../../Routes/Routes';

export default function Home() {
  return (
    <div>
      <h1>Welcome Home</h1>
      <nav>
        <Link to={ROUTES.LOGIN}>Login</Link> | 
        <Link to={ROUTES.SIGNUP}>Signup</Link> |
        <Link to={ROUTES.ABOUT}>About Us</Link>
      </nav>
    </div>
  );
}
