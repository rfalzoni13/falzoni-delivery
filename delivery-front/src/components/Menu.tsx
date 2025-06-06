import { useState } from "react"
import { CSidebar, CSidebarHeader, CSidebarBrand, CImage, CSidebarNav, CNavTitle, CNavItem, CHeader, CContainer, CButton, CHeaderNav, CCardBody, CFooter, CLink } from "@coreui/react"
import { cilBuilding, cilGift, cilGroup, cilMenu, cilTruck } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import Content from './Content'

function Menu() {
    const [visible, setVisible] = useState(true)

    return (
        <>
            <CSidebar colorScheme='light' visible={visible} className='border-end' position='fixed'>
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand href='/'><CImage align='start' rounded src='/assets/logo.png' width={30} height={30} /><p className='text-title mb-0 float-end pl-8'>Renato Falzoni</p></CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Menu Principal</CNavTitle>
                    <CNavItem href="/enderecos">
                        <CIcon customClassName="nav-icon" icon={cilBuilding} /> Endereços
                    </CNavItem>
                    <CNavItem href="/clientes">
                        <CIcon customClassName="nav-icon" icon={cilGroup} /> Clientes
                    </CNavItem>
                    <CNavItem href="/encomendas">
                        <CIcon customClassName="nav-icon" icon={cilGift} /> Encomendas
                    </CNavItem>
                    <CNavItem href="/entregas">
                        <CIcon customClassName="nav-icon" icon={cilTruck} /> Entregas
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
            <div className="wrapper d-flex flex-column min-vh-100">
                <CHeader className='mt-2' position='sticky'>
                    <CContainer fluid>
                        <CButton
                            onClick={() => setVisible(!visible)}
                        ><CIcon icon={cilMenu} size='lg' /></CButton>
                        <CHeaderNav>
                        </CHeaderNav>
                    </CContainer>
                </CHeader>
                <CCardBody>
                    <Content />
                </CCardBody>
                <CFooter>
                    <div>
                        <strong>
                            <CLink target="_blank" className="text-decoration-none" href="https://github.com/rfalzoni13">Renato Falzoni&copy;</CLink>
                        </strong>
                        <span>Todos os direitos reservados</span>
                    </div>
                    <div>
                        <span>Versão 1.0.0</span>
                    </div>
                </CFooter>
            </div>
        </>
    )
}

export default Menu