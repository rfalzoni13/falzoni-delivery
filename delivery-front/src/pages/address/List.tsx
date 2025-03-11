import { CContainer, CRow, CCol, CTable, CLink, CTableHead, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CButton } from "@coreui/react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function Address() {
    const [rows, setRows] = useState<any[]>([])

    function loadData() {
        fetch(`http://localhost:8080/api/address`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                data.forEach((d: any) => {
                    list.push(
                        <CTableRow key={d.id}>
                            <CTableHeaderCell scope="row">{d.id}</CTableHeaderCell>
                            <CTableDataCell>{d.name}</CTableDataCell>
                            <CTableDataCell>{d.number}</CTableDataCell>
                            <CTableDataCell>{d.complement}</CTableDataCell>
                            <CTableDataCell>{d.neighborhood}</CTableDataCell>
                            <CTableDataCell>{d.city}</CTableDataCell>
                            <CTableDataCell>{d.state}</CTableDataCell>
                            <CTableDataCell>{d.postalCode}</CTableDataCell>
                            <CTableDataCell>
                                <CLink className="btn btn-sm btn-success" href={`/enderecos/form/${d.id}`}>Editar</CLink>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton className="btn btn-sm" color="danger" onClick={() => deleteAddress(d.id)}>Remover</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    )
                })
                setRows(list)
            })
    }

    function deleteAddress(id: number) {
        console.log("Id deletado: " + id)
        const options = {
            method: "DELETE"
        }

        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Tem certeza que deseja excluir o registro?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/api/address/${id}`, options)
                    .then((body) => {
                        return body.text()
                    })
                    .then((res) => {
                        loadData()
                        return MySwal.fire(<p>{res}</p>)

                    })
                    .catch((err) => console.error(err))
            }
        })
    }

    useEffect(() => {
        return (() => {
            loadData()
        })
    }, [])


    return (
        <>
            <CContainer md className="px-5 mt-4">
                <CRow>
                    <CCol xxl>
                        <h2>Endereços</h2>
                        <small className="mt-0">Cadastro de endereços</small>
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol xxl>
                        <CLink className="btn btn-primary" href="enderecos/form" color="primary">Inserir</CLink>
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol>
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Endereço</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Número</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Complemento</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Bairro</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cidade</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cep</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>{rows}</CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}