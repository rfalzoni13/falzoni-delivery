import { CContainer, CRow, CCol, CTable, CLink, CTableHead, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CButton } from "@coreui/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

function convertDate(date: any) {
    return dayjs(date).format("DD/MM/YYYY")
}

export default function DeliveryList() {
    const [rows, setRows] = useState<any[]>([])

    function loadData() {
        fetch(`https://localhost:7121/api/delivery`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                data.forEach((d: any) => {
                    list.push(
                        <CTableRow key={d.id}>
                            <CTableHeaderCell scope="row">{d.id}</CTableHeaderCell>
                            <CTableDataCell width={150}>{d.customer}</CTableDataCell>
                            <CTableDataCell width={100}>{convertDate(d.data)}</CTableDataCell>
                            <CTableDataCell width={350}>{d.address}</CTableDataCell>
                            <CTableDataCell width={200}>{d.order}</CTableDataCell>
                            <CTableDataCell>
                                <CLink className="btn btn-sm btn-success" href={`/entregas/form/${d.id}`}>Editar</CLink>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton className="btn btn-sm" color="danger" onClick={() => deleteDelivery(d.id)}>Remover</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    )
                })
                setRows(list)
            })
    }

    function deleteDelivery(id: number) {
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
                fetch(`https://localhost:7121/api/delivery/${id}`, options)
                    .then((body) => {
                        return body.text()
                    })
                    .then((r) => {
                        loadData()
                        return MySwal.fire(<p>{r || "Registro removido com sucesso"}</p>)

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
                        <h2>Entregas</h2>
                        <small className="mt-0">Cadastro de entregas</small>
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol xxl>
                        <CLink className="btn btn-primary" href="entregas/form" color="primary">Inserir</CLink>
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol>
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Endereço</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Encomenda</CTableHeaderCell>
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