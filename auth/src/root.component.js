// import SharedAPIClient from '@fcx/api-client';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login/Login";

// SharedAPIClient.getInstance({
//   name: 'products-service', 
//   baseURL: 'http://localhost:9090',
//   resources: ['PRODUCTS', 'CATEGORIES'],
// });

export default function Root(props) {
  return (
    <Router>
      <Login />
    </Router>
  );
}
