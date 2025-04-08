import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import AddressList from "../pages/address/List"
import AddressForm from "../pages/address/Form"
import CustomerList from "../pages/customer/List"
import CustomerForm from "../pages/customer/Form"

function Content() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="enderecos">
                    <Route index element={<AddressList />} />
                    <Route path={"form/:id?"} element={<AddressForm />} />
                </Route>
                <Route path="clientes">
                    <Route index element={<CustomerList />} />
                    <Route path={"form/:id?"} element={<CustomerForm />} />
                </Route>
            </Routes>
        </>
    )
}

export default Content