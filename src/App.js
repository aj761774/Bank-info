import Bank from "./component/Bank.js"
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import BankDetails from './component/BankDetails';
import Favorites from './component/Favorites';
import SideBar from "./component/SideBar"
import './App.css'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <SideBar/>
      <Routes>
      <Route path = "/allBank" element = {<Bank/>}/>
      <Route path="*" element={<Navigate to="/allBank" replace />} />
      <Route path='/bank-details/:ifsc' element= {<BankDetails/>}/>
      <Route path='/favorites' element= {<Favorites/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
