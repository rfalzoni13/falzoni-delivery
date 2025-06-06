import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import AddressList from "../pages/address/List"
import AddressForm from "../pages/address/Form"
import CustomerList from "../pages/customer/List"
import CustomerForm from "../pages/customer/Form"
import OrderList from "../pages/order/List"
import OrderForm from "../pages/order/Form"
import DeliveryForm from "../pages/delivery/Form"
import DeliveryList from "../pages/delivery/List"

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
                <Route path="encomendas">
                    <Route index element={<OrderList />} />
                    <Route path={"form/:id?"} element={<OrderForm />} />
                </Route>
                <Route path="entregas">
                    <Route index element={<DeliveryList />} />
                    <Route path={"form/:id?"} element={<DeliveryForm />} />
                </Route>
            </Routes>
        </>
    )
}

export default Content