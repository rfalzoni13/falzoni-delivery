import { CButton, CCol, CContainer, CForm, CFormLabel, CFormSelect, CLink, CRow } from "@coreui/react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CFormFieldDatePicker from "../../components/ui/CFormFieldDatePicker";
import dayjs from "dayjs";

interface IDelivery {
    id?: number,
    addressId?: number,
    customerId?: number
    orderId?: number,
    data: any | null
}

function setDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD')
}

export default function DeliveryForm() {
    // Hooks
    const navigate = useNavigate()
    const { id } = useParams()
    const [addresses, setAddresses] = useState<any[]>([])
    const [customers, setCustomers] = useState<any[]>([])
    const [orders, setOrders] = useState<any[]>([])
    const [validated, setValidated] = useState(false)
    const [Delivery, setDelivery] = useState<IDelivery>({
        id: 0,
        addressId: 0,
        customerId: 0,
        orderId: 0,
        data: null
    })

    function loadData() {
        if (+id! > 0) {
            fetch(`https://localhost:7121/api/delivery/${id}`)
                .then((body) => body.json())
                .then((data) => {
                    setDelivery({
                        id: data.id,
                        addressId: data.addressId,
                        orderId: data.orderId,
                        customerId: data.customerId,
                        data: data.data
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    function loadAddresses() {
        fetch(`http://localhost:8080/api/address`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                list.push({label: "Selecione..."})
                data.forEach((d: any) => {
                    list.push({ label: `${d.name}, ${d.number} - ${d.neighborhood} - ${d.city}/${d.state}`, value: d.id })
                })
                setAddresses(list)
            })
    }

    function loadCustomers() {
        fetch(`http://localhost:8000/api/customer`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                list.push({label: "Selecione..."})
                data.forEach((d: any) => {
                    list.push({ label: `${d.name} ${d.lastname}`, value: d.id })
                })
                setCustomers(list)
            })
    }

    function loadOrders() {
        fetch(`http://localhost:3000/api/order`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                list.push({label: "Selecione..."})
                data.forEach((d: any) => {
                    list.push({ label: d.name, value: d.id })
                })
                setOrders(list)
            })
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        const form = event.currentTarget
        event.preventDefault()

        setValidated(false)

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        } else {
            const obj = {
                id: Delivery.id,
                addressId: Delivery.addressId,
                customerId: Delivery.customerId,
                orderId: Delivery.orderId,
                data: setDate(Delivery.data!)
            }

            const options = {
                method: obj.id == 0 ? "POST" : "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            }

            const MySwal = withReactContent(Swal)
            MySwal.fire({
                didOpen: () => {
                    MySwal.showLoading()
                    fetch("https://localhost:7121/api/delivery", options)
                        .then((body) => {
                            if (body.status == 201 || body.status == 204) {
                                navigate("/entregas");
                            }
                            return body.text()
                        })
                        .then((res) => {
                            const message = obj.id == 0 ? "Registro incluído com sucesso" : "Registro atualizado com sucesso"
                            return MySwal.fire(<p>{res || message}</p>)

                        })
                        .catch((err) => console.error(err))
                }
            })
        }
    }

    function updateForm(event: any) {
        const id = event.target.id
        setDelivery({
            id: Delivery.id,
            addressId: id == 'addressId' ? event.target.value : Delivery.addressId,
            customerId: id == 'customerId' ? event.target.value : Delivery.customerId,
            orderId: id == 'orderId' ? event.target.value : Delivery.orderId,
            data: Delivery.data
        })
    }

    function updateDate(event: any) {
        setDelivery({
            id: Delivery.id,
            addressId: Delivery.addressId,
            customerId: Delivery.customerId,
            orderId: Delivery.orderId,
            data: event
        })
    }

    useEffect(() => {
        return (() => {
            loadOrders();
            loadCustomers();
            loadAddresses();
            loadData()
        })
    }, [])

    return (
        <CContainer xxl className="px-5 mt-4">
            <CRow>
                <CCol xxl>
                    <h2>{id === undefined ? "Cadastrar entrega" : "Editar entrega"}</h2>
                    <small className="mt-0">{id === undefined ? "Realiza o cadastro da entrega" : "Realiza a edição do entrega"}</small>
                </CCol>
            </CRow>
            <CForm noValidate validated={validated} onSubmit={onSubmit}>
                <CRow className="mt-4">
                    <CCol md={5}>
                        <CFormLabel>Cliente</CFormLabel>
                        <CFormSelect
                            options={customers}
                            required
                            id="customerId"
                            feedbackInvalid="O Cliente é obrigatório"
                            feedbackValid="Cliente preencido com sucesso"
                            value={Delivery.customerId}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={7}>
                        <CFormLabel>Endereço</CFormLabel>
                        <CFormSelect
                            options={addresses}
                            required
                            id="addressId"
                            feedbackInvalid="O Endereço é obrigatório"
                            feedbackValid="Endereço preencido com sucesso"
                            value={Delivery.addressId}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol md={3}>
                        <CFormLabel>Data da entrega</CFormLabel>
                        <CFormFieldDatePicker
                            value={Delivery.data == null ? null : dayjs(Delivery.data)}
                            onChange={(e) => updateDate(e)}
                        />
                    </CCol>
                    <CCol md={5}>
                        <CFormLabel>Encomenda</CFormLabel>
                        <CFormSelect
                            options={orders}
                            required
                            id="orderId"
                            feedbackInvalid="A Encomenda é obrigatória"
                            feedbackValid="Encomenda preencida com sucesso"
                            value={Delivery.orderId}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-3">
                    <CCol className="d-flex justify-content-end">
                        <CLink className="btn btn-warning mx-3" href="/entregas" >Voltar</CLink>
                        <CButton color="primary" type="submit">Salvar</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </CContainer>
    )
}
