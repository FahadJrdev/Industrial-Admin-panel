import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './ci.css';
import { VscChevronDown } from "react-icons/vsc";
const initialState = {
    Projected_date_of_release: '',
    Project_name: '',
    aprobado: '',
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const CS = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Projected_date_of_release, Project_name, aprobado } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <form className='information' action="" method='POST' onSubmit={handleSubmit}>
                    <div className="submit-button">
                        <Button text={language.global.accept} background={`var(--primary-color)`} types={`button`} click={Option} />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default CS;