import {Button} from "react-bootstrap";
import './PromptInput.css'
import {useState} from "react";
import star from '../assets/star-outline.svg';
import myPrompts from '../assets/my-prompts.svg';

export function PromptInput({onClick}) {
    const [touched, setTouched] = useState(false)
    return (
        <div className="prompt-input-containerone">
            <div className="my-prompts">
                <img src={myPrompts}/>
                I miei prompt</div>
            <div className="prompt-input-container">
                {!touched &&
                    <div className='prompt-input prompt-input-placeholder' onClick={() => setTouched(true)}>
                        Es. Mostrami tutti i misuratori che hanno avuto almeno 10 Spike durante le ore notturne</div>}
                {touched &&
                    <div className='prompt-input'>Mostrami i misuratori che hanno trasmesso dei flussi di dati con buchi
                        di misuri contigui di almeno 7 minuti.</div>}
                <img src={star}/>
                <Button disabled={!touched} onClick={onClick}>Invio</Button>
            </div>
        </div>
    )
}