import React from "react";
import './ReportsInspector.css';
import {Button} from "react-bootstrap";
import pdf from "../assets/pdf.png";

export function ReportisticaInspector(props) {
    return (
        <div className='inspector-reports'>
            <div className="inspector-title">
                INSPECTOR
            </div>
            <div className="inspector-header">
                <Button variant='outline-primary'>PDF</Button>
                <Button variant='outline-primary'>MODIFICA</Button>
                <Button variant='outline-primary'>POWER BI</Button>
            </div>
            <img src={pdf} alt='pdf' />
            <div className="inspector-footer">
                {props.report.name}
            </div>
        </div>
    )
}