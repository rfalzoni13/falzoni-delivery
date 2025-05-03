import { CTableRow, CTableHeaderCell, CTableDataCell, CLink, CButton, CCol, CContainer, CRow, CTable, CTableBody, CTableHead } from "@coreui/react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function OrderList() {
    const [rows, setRows] = useState<any[]>([])

    function loadData() {
        fetch(`http://localhost:3000/api/order`)
            .then((body) => body.json())
            .then((data) => {
                const list: any[] = []
                data.forEach((d: any) => {
                    list.push(
                        <CTableRow key={d.id}>
                            <CTableHeaderCell scope="row">{d.id}</CTableHeaderCell>
                            <CTableDataCell>{d.name}</CTableDataCell>
                            <CTableDataCell>{`R$ ${d.price.replace('.', ',')}`}</CTableDataCell>
                            <CTableDataCell>{d.quantity}</CTableDataCell>
                            <CTableDataCell>{d.unity}</CTableDataCell>
                            <CTableDataCell>
                                <CLink className="btn btn-sm btn-success" href={`/encomendas/form/${d.id}`}>Editar</CLink>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton className="btn btn-sm" color="danger" onClick={() => deleteOrder(d.id)}>Remover</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    )
                })
                setRows(list)
            })
    }

    function deleteOrder(id: number) {
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
                fetch(`http://localhost:3000/api/order/${id}`, options)
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
                        <h2>Encomendas</h2>
                        <small className="mt-0">Cadastro de encomendas</small>
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol xxl>
                        <CLink className="btn btn-primary" href="encomendas/form" color="primary">Inserir</CLink>
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol>
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Quantidade</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Unidade de medida</CTableHeaderCell>
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