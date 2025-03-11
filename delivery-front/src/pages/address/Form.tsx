import { CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CLink, CRow } from "@coreui/react";
import { useMask } from "@react-input/mask";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IAddress {
    id?: number,
    postalCode?: string
    name?: string
    number?: number
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
}

export default function AddressForm() {
    // Hooks
    const inputRef = useMask({
        mask: '_____-___',
        replacement: { _: /\d/ },
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const [validated, setValidated] = useState(false)
    const [address, setAddress] = useState<IAddress>({
        id: 0,
        postalCode: '',
        name: '',
        number: 0,
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
    })

    function loadData() {
        if (+id! > 0) {
            fetch(`http://localhost:8080/api/address/${id}`)
                .then((body) => body.json())
                .then((data) => {
                    setAddress({
                        id: data.id,
                        postalCode: data.postalCode,
                        name: data.name,
                        number: data.number,
                        complement: data.complement,
                        neighborhood: data.neighborhood,
                        city: data.city,
                        state: data.state
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    function getPostalCode(event: any) {
        const postalCode = event.target.value

        if (postalCode.length == 0) return

        fetch(`http://viacep.com.br/ws/${postalCode}/json/`)
            .then((body) => body.json())
            .then((data) => {
                setAddress({
                    id: address.id,
                    postalCode: event.target.value,
                    name: data.logradouro,
                    number: address.number,
                    complement: data.complemento,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf
                })
            })
            .catch((error) => console.error(error))
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        const form = event.currentTarget
        event.preventDefault()

        setValidated(false)

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        } else {
            const obj = address

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
                    fetch("http://localhost:8080/api/address", options)
                        .then((body) => {
                            if (body.status == 200) {
                                navigate("/enderecos");
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
        setAddress({
            id: address.id,
            postalCode: id == 'postalCode' ? event.target.value : address.postalCode,
            name: id == 'name' ? event.target.value : address.name,
            number: id == 'number' ? event.target.value : address.number,
            complement: id == 'complement' ? event.target.value : address.complement,
            neighborhood: id == 'neighborhood' ? event.target.value : address.neighborhood,
            city: id == 'city' ? event.target.value : address.city,
            state: id == 'state' ? event.target.value : address.state
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
                    <h2>{id === undefined ? "Cadastrar endereço" : "Editar endereço"}</h2>
                    <small className="mt-0">{id === undefined ? "Realiza o cadastro do endereço" : "Realiza a edição do endereço"}</small>
                </CCol>
            </CRow>
            <CForm noValidate validated={validated} onSubmit={onSubmit}>
                <CRow className="mt-4">
                    <CCol md={3}>
                        <CFormLabel>CEP</CFormLabel>
                        <CFormInput
                            ref={inputRef}
                            type="text"
                            id="postalCode"
                            required
                            feedbackInvalid="O CEP é obrigatório"
                            feedbackValid="CEP preencido com sucesso"
                            value={address.postalCode}
                            onChange={(e) => updateForm(e)}
                            onBlur={(e) => getPostalCode(e)}
                        />
                    </CCol>
                    <CCol md={7}>
                        <CFormLabel>Rua</CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            required
                            feedbackInvalid="O Endereço é obrigatório"
                            feedbackValid="Endereço preencido com sucesso"
                            value={address.name}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel>Número</CFormLabel>
                        <CFormInput
                            type="text"
                            id="number"
                            required
                            feedbackInvalid="O Número é obrigatório"
                            feedbackValid="Número preencido com sucesso"
                            value={address.number}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol md={3}>
                        <CFormLabel>Complemento</CFormLabel>
                        <CFormInput
                            type="text"
                            id="complement"
                            feedbackValid="O Complemento é opcional"
                            value={address.complement}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel>Bairro</CFormLabel>
                        <CFormInput
                            type="text"
                            id="neighborhood"
                            required
                            feedbackInvalid="O Bairro é obrigatório"
                            feedbackValid="Bairro preencido com sucesso"
                            value={address.neighborhood}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel>Cidade</CFormLabel>
                        <CFormInput
                            type="text"
                            id="city"
                            required
                            feedbackInvalid="A Cidade é obrigatória"
                            feedbackValid="Cidade preenchida com sucesso"
                            value={address.city}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel>Estado</CFormLabel>
                        <CFormInput
                            type="text"
                            id="state"
                            required
                            feedbackInvalid="O Estado é obrigatório"
                            feedbackValid="Estado preencido com sucesso"
                            value={address.state}
                            onChange={(e) => updateForm(e)}
                        />
                    </CCol>
                </CRow>
                <CRow className="mt-3">
                    <CCol className="d-flex justify-content-end">
                        <CLink className="btn btn-warning mx-3" href="/enderecos" >Voltar</CLink>
                        <CButton color="primary" type="submit">Salvar</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </CContainer>
    )
}