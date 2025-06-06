import { CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormSelect, CLink, CRow } from "@coreui/react"
import { useMask } from "@react-input/mask"
import { FormEvent, useEffect, useState } from "react"
import { CurrencyInput } from "react-currency-mask"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface IOrder {
    id?: number,
    name?: string
    price?: number
    quantity?: number
    unity?: string
}

export default function OrderForm() {
    // Hooks
    const inputRef = useMask({
        mask: '___,__',
        replacement: { _: /\d/ },
        separate: true
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const [validated, setValidated] = useState(false)
    const [order, setOrder] = useState<IOrder>({
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        unity: 'UN'
    })

    function loadData() {
        if (+id! > 0) {
            fetch(`http://localhost:3000/api/order/${id}`)
                .then((body) => body.json())
                .then((data) => {
                    setOrder({
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        quantity: data.quantity,
                        unity: data.unity
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        const form = event.currentTarget
        event.preventDefault()

        setValidated(false)

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        } else {
            const obj = order

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
                    fetch("http://localhost:3000/api/order", options)
                        .then((body) => {
                            if (body.status == 201 || body.status == 204) {
                                navigate("/encomendas");
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
        setOrder({
            id: order.id,
            name: id == 'name' ? event.target.value : order.name,
            price: order.price,
            quantity: id == 'quantity' ? event.target.value : order.quantity,
            unity: id == 'unity' ? event.target.value : order.unity
        })
    }

    function updatePrice(price: number) {
        setOrder({
            id: order.id,
            name: order.name,
            price: price,
            quantity: order.quantity,
            unity: order.unity
        })
    }

    useEffect(() => {
        return (() => {
            loadData()
        })
    }, [])

    return (
        <CContainer xxl className="px-5 mt-4">
            <CRow>
                <CCol xxl>
                    <h2>{id === undefined ? "Cadastrar encomenda" : "Editar encomenda"}</h2>
                    <small className="mt-0">{id === undefined ? "Realiza o cadastro da encomenda" : "Realiza a edição da encomenda"}</small>
                </CCol>
            </CRow>
            <CForm noValidate validated={validated} onSubmit={onSubmit}>
                <CRow className="mt-4">
                    <CCol md={5}>
                        <CFormLabel>Nome</CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            required
                            feedbackInvalid="O Nome é obrigatório"
                            feedbackValid="Nome preencido com sucesso"
                            value={order.name}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel>Preço</CFormLabel>
                        <CurrencyInput
                            onChangeValue={(event, originalValue, maskedValue) => {
                                updatePrice(+originalValue)
                                console.log(event, originalValue, maskedValue)
                            }}
                            defaultValue={order.price || "0"}
                            InputElement={<CFormInput
                                type="text"
                                id="price"
                                ref={inputRef}
                                required
                                feedbackInvalid="O Preço é obrigatório"
                                feedbackValid="Preço preencido com sucesso"
                                value={order.price}
                            />}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol md={2}>
                        <CFormLabel>Quantidade</CFormLabel>
                        <CFormInput
                            type="number"
                            id="quantity"
                            required
                            feedbackInvalid="A Quantidade é obrigatória"
                            feedbackValid="Quantidade preencida com sucesso"
                            value={order.quantity}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel>Unidade de medida</CFormLabel>
                        <CFormSelect
                            options={[
                                { label: 'UN', value: 'UN' },
                                { label: 'KG', value: 'KG' }
                            ]}
                            id="unity"
                            feedbackValid="Unidade de medida preencida com sucesso"
                            value={order.unity}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-3">
                    <CCol className="d-flex justify-content-end">
                        <CLink className="btn btn-warning mx-3" href="/encomendas" >Voltar</CLink>
                        <CButton color="primary" type="submit">Salvar</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </CContainer>
    )
}