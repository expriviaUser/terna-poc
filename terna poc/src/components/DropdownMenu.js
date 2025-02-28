import {Dropdown, DropdownButton, Form} from 'react-bootstrap';

export const DropdownMenu = ({children, value, onSelect}) => {
    return (
        <DropdownButton  title={children} onSelect={e => onSelect(parseInt(e))}  variant='link'>
            <Dropdown.Item eventKey="5">
                <Form.Check
                    type="radio"
                    label="Ultimi 5 minuti"
                    name="dropdownRadio"
                    checked={value === 5}
                />
            </Dropdown.Item>
            <Dropdown.Item eventKey="15">
                <Form.Check
                    type="radio"
                    label="Ultimo quarto d’ora"
                    name="dropdownRadio"
                    checked={value === 15}
                />
            </Dropdown.Item>
        </DropdownButton>
    );
};

