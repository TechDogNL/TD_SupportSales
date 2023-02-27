import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import HomePage from "./Components/Admin/HomePage";
import ChangePasswords from "./Components/Admin/ChangePasswords";

// deals
import Deals from "./Components/Admin/Deals/Deals";
import EditDeal from "./Components/Admin/Deals/EditDeal";
import NewDeal from "./Components/Admin/Deals/NewDeal";

// users
import Users from "./Components/Admin/Users/Users";
import EditUser from "./Components/Admin/Users/EditUser";
import NewUser from "./Components/Admin/Users/NewUser";

// bonuses
import Bonuses from "./Components/Admin/Bonuses/Bonuses";
import EditBonus from "./Components/Admin/Bonuses/EditBonus";
import NewBonus from "./Components/Admin/Bonuses/NewBonus";

// products
import Products from "./Components/Admin/Products/Products";
import EditProduct from "./Components/Admin/Products/EditProduct";
import NewProduct from "./Components/Admin/Products/NewProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard/:month/:year" element={<Dashboard />}></Route>
        <Route path="/admin" element={<HomePage />}></Route>
        <Route path="/admin/deals" element={<Deals />}></Route>
        <Route path="/admin/deals/:id" element={<EditDeal />}></Route>
        <Route path="/admin/deals/new" element={<NewDeal />}></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/admin/users/:id" element={<EditUser />}></Route>
        <Route path="/admin/users/new" element={<NewUser />}></Route>
        <Route path="/admin/bonuses" element={<Bonuses />}></Route>
        <Route path="/admin/bonuses/:id" element={<EditBonus />}></Route>
        <Route path="/admin/bonuses/new" element={<NewBonus />}></Route>
        <Route path="/admin/products" element={<Products />}></Route>
        <Route path="/admin/products/:id" element={<EditProduct />}></Route>
        <Route path="/admin/products/new" element={<NewProduct />}></Route>
        <Route path="/admin/changePasswords" element={<ChangePasswords />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
