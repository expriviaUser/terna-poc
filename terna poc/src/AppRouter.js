import MisurazioniPage from "./App";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ReportisticaPage} from "./ReportisticaPage";

export function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<MisurazioniPage/>}/>
            <Route path="/misure" element={<MisurazioniPage/>}/>
            <Route path="/misuratore" element={<MisurazioniPage/>}/>
            <Route path="/reportistica" element={<ReportisticaPage/>}/>
        </Routes>
    </BrowserRouter>
}
