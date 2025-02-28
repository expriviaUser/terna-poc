import MisurazioniPage from "./App";
import Misuratori from "./Misuratori";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ReportisticaPage} from "./reportistica/ReportisticaPage";
import {AppLayout} from "./AppLayout";
import {LoginPage} from "./LoginPage";

export function AppRouter() {
    return <BrowserRouter>
        <AppLayout>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/misurazioni" element={<MisurazioniPage/>}/>
                <Route path="/misuratore" element={<Misuratori/>}/>
                <Route path="/reportistica/:id/:reportId?" element={<ReportisticaPage/>}/>
                <Route path="/reportistica" element={<ReportisticaPage/>}/>
            </Routes>
        </AppLayout>
    </BrowserRouter>
}
