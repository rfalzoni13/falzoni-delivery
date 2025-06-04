import { CContainer, CRow, CCol, CTable, CLink, CTableHead, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CButton } from "@coreui/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

function convertDate(date: any) {
    return dayjs(date).format("DD/MM/YYYY")
}

export default function CustomerList() {
    const [rows, setRows] = useState<any[]>([])

    function loadData() {
        fetch(`http://localhost:8000/api/customer`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                data.forEach((d: any) => {
                    list.push(
                        <CTableRow key={d.id}>
                            <CTableHeaderCell scope="row">{d.id}</CTableHeaderCell>
                            <CTableDataCell width={150}>{`${d.name} ${d.lastname}`}</CTableDataCell>
                            <CTableDataCell>{convertDate(d.datebirth)}</CTableDataCell>
                            <CTableDataCell width={150}>{d.document}</CTableDataCell>
                            <CTableDataCell>{d.email}</CTableDataCell>
                            <CTableDataCell>{d.marital[0].toUpperCase() + d.marital.slice(1)}</CTableDataCell>
                            <CTableDataCell>
                                <CLink className="btn btn-sm btn-success" href={`/clientes/form/${d.id}`}>Editar</CLink>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton className="btn btn-sm" color="danger" onClick={() => deleteCustomer(d.id)}>Remover</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    )
                })
                setRows(list)
            })
    }

    function deleteCustomer(id: number) {
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
                fetch(`http://localhost:8000/api/customer/${id}`, options)
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
                        <h2>Clientes</h2>
                        <small className="mt-0">Cadastro de clientes</small>
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol xxl>
                        <CLink className="btn btn-primary" href="clientes/form" color="primary">Inserir</CLink>
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol>
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Data de nascimento</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Estado Civíl</CTableHeaderCell>
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