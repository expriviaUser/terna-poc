import MisurazioniPage from "./App";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ReportisticaPage} from "./reportistica/ReportisticaPage";
import {AppLayout} from "./AppLayout";

export function AppRouter() {
    return <BrowserRouter>
        <AppLayout>
            <Routes>
                <Route path="/" element={<MisurazioniPage/>}/>
                <Route path="/misuratore" element={<MisurazioniPage/>}/>
                <Route path="/reportistica" element={<ReportisticaPage/>}/>
            </Routes>
        </AppLayout>
    </BrowserRouter>
}
