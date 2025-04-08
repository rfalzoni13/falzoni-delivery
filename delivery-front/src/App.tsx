import { BrowserRouter } from 'react-router-dom'
import Menu from './components/Menu'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br';

function App() {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                <BrowserRouter>
                    <Menu />
                </BrowserRouter>
            </LocalizationProvider>
        </>
    )
}

export default App
