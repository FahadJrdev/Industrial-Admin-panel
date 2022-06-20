import React from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './generateStatement.css';

const GenerateStatement = ({title}) => {
  return (
      <>
        <div className="adding-investor-overlay"></div>
        <div className="adding-investor generate">
            <div className="investor-add">
                <div className="header-add">
                    <ButtonWithArrow text={`Back`} background={`var(--primary-color)`} />
                    <h1>{title}</h1>
                </div>
                <form action='' method='POST' className="generate-body">
                    <p>Select the type of statement you want to generate</p>
                    <input type="radio" name='generate-statement' value='Individual'/>
                    <label htmlFor="individual">Individual</label>
                    <br />
                    <input type="radio" name='generate-statement' value='Massive' />
                    <label htmlFor="massive">Massive</label>
                    <div className="submit-generate-option">
                        <Button text={`Generate`} background={`var(--tartiary-color)`} />
                    </div>
                </form>
            </div>
        </div>
      </>
  )
}

export default GenerateStatement;

  