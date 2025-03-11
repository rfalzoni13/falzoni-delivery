import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import AddressList from "../pages/address/List"
import AddressForm from "../pages/address/Form"

function Content() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="enderecos">
                    <Route index element={<AddressList />} />
                    <Route path={"form/:id?"} element={<AddressForm />} />
                </Route>
            </Routes>
        </>
    )
}

export default Content