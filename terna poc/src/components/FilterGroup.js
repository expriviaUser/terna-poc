import React, {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

export function FilterGroup(props) {
    const [show, setShow] = useState(true);

    return <div className="filter-group">
        <div className='filter-group-header' onClick={() => setShow(!show)}>
            <h3>{props.title}</h3>
            {show ? <ChevronDown size={24}/> : <ChevronUp size={24}/>}
        </div>
        {show && props.children}
    </div>
}