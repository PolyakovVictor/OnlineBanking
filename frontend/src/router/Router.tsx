import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home-page/home-page'


const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<HomePage />} path='/' />

            <Route element={<div>Not found</div>} path='*'/>
        </Routes>
    </BrowserRouter>
}

export default Router