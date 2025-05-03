import { CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormSelect, CLink, CRow } from "@coreui/react";
import { useMask } from "@react-input/mask";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CFormFieldDatePicker from "../../components/ui/CFormFieldDatePicker";
import dayjs from "dayjs";

interface ICustomer {
    id?: number,
    name?: string
    lastname?: string
    datebirth: any | null
    document?: string
    email?: string
    phoneNumber?: string
    marital?: string
}

function setDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD')
}

export default function CustomerForm() {
    // Hooks
    const celMask = useMask({
        mask: '(__) _____-____',
        replacement: { _: /\d/ },
    })
    const documentMask = useMask({
        mask: '___.___.___-__',
        replacement: { _: /\d/ },
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const [validated, setValidated] = useState(false)
    const [Customer, setCustomer] = useState<ICustomer>({
        id: 0,
        name: '',
        lastname: '',
        datebirth: null,
        document: '',
        email: '',
        phoneNumber: '',
        marital: '',
    })

    function loadData() {
        if (+id! > 0) {
            fetch(`http://localhost:8000/api/customer/${id}`)
                .then((body) => body.json())
                .then((data) => {
                    setCustomer({
                        id: data.id,
                        name: data.name,
                        lastname: data.lastname,
                        datebirth: data.datebirth,
                        document: data.document,
                        email: data.email,
                        phoneNumber: data.phone_number,
                        marital: data.marital
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
            const obj = {
                id: Customer.id,
                name: Customer.name,
                lastname: Customer.lastname,
                document: Customer.document,
                datebirth: setDate(Customer.datebirth!),
                email: Customer.email,
                phone_number: Customer.phoneNumber,
                marital: Customer.marital
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
                    fetch("http://localhost:8000/api/customer", options)
                        .then((body) => {
                            if (body.status == 200 || body.status == 201) {
                                navigate("/clientes");
                            }
                            return body.text()
                        })
                        .then((res) => {
                            return MySwal.fire(<p>{res}</p>)

                        })
                        .catch((err) => console.error(err))
                }
            })
        }
    }

    function updateForm(event: any) {
        const id = event.target.id
        setCustomer({
            id: Customer.id,
            name: id == 'name' ? event.target.value : Customer.name,
            lastname: id == 'lastname' ? event.target.value : Customer.lastname,
            datebirth: Customer.datebirth,
            document: id == 'document' ? event.target.value : Customer.document,
            email: id == 'email' ? event.target.value : Customer.email,
            phoneNumber: id == 'phoneNumber' ? event.target.value : Customer.phoneNumber,
            marital: id == 'marital' ? event.target.value : Customer.marital
        })
    }

    function updateDate(event: any) {
        setCustomer({
            id: Customer.id,
            name: Customer.name,
            lastname: Customer.lastname,
            datebirth: event,
            document: Customer.document,
            email: Customer.email,
            phoneNumber: Customer.phoneNumber,
            marital: Customer.marital
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
                    <h2>{id === undefined ? "Cadastrar cliente" : "Editar cliente"}</h2>
                    <small className="mt-0">{id === undefined ? "Realiza o cadastro do cliente" : "Realiza a edição do cliente"}</small>
                </CCol>
            </CRow>
            <CForm noValidate validated={validated} onSubmit={onSubmit}>
                <CRow className="mt-4">
                    <CCol md={3}>
                        <CFormLabel>Nome</CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            required
                            feedbackInvalid="O Nome é obrigatório"
                            feedbackValid="Nome preencido com sucesso"
                            value={Customer.name}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel>Sobrenome</CFormLabel>
                        <CFormInput
                            type="text"
                            id="lastname"
                            required
                            feedbackInvalid="O Sobrenome é obrigatório"
                            feedbackValid="Sobrenome preencido com sucesso"
                            value={Customer.lastname}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel>Data de nascimento</CFormLabel>
                        <CFormFieldDatePicker
                            value={Customer.datebirth == null ? null : dayjs(Customer.datebirth)}
                            onChange={(e) => updateDate(e)}
                            />
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol md={3}>
                        <CFormLabel>CPF</CFormLabel>
                        <CFormInput
                            ref={documentMask}
                            type="text"
                            id="document"
                            required
                            feedbackInvalid="O CPF é obrigatório"
                            feedbackValid="CPF preencido com sucesso"
                            value={Customer.document}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel>Celular</CFormLabel>
                        <CFormInput
                            ref={celMask}
                            type="text"
                            id="phoneNumber"
                            required
                            feedbackInvalid="O Celular é obrigatório"
                            feedbackValid="Celular preenchida com sucesso"
                            value={Customer.phoneNumber}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={5}>
                        <CFormLabel>E-mail</CFormLabel>
                        <CFormInput
                            type="text"
                            id="email"
                            required
                            feedbackInvalid="O Email é obrigatório"
                            feedbackValid="Email preencido com sucesso"
                            value={Customer.email}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                <CCol md={3}>
                        <CFormLabel>Estado Civíl</CFormLabel>
                        <CFormSelect
                            options={[
                                { label: 'Selecione...' },
                                { label: 'Solteiro', value: 'solteiro' },
                                { label: 'Casado', value: 'casado' }
                            ]}
                            required
                            id="marital"
                            feedbackInvalid="O Estado Civíl é obrigatório"
                            feedbackValid="Estado Civíl preencido com sucesso"
                            value={Customer.marital}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-3">
                    <CCol className="d-flex justify-content-end">
                        <CLink className="btn btn-warning mx-3" href="/clientes" >Voltar</CLink>
                        <CButton color="primary" type="submit">Salvar</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </CContainer>
    )
}
