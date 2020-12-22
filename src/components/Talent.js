import React, { useState, useEffect, useContext } from 'react';

import { AttributesContext } from './CharacterPlanner';

export default function Talent({ talent, behavior }) {
    const [state, setState] = useState(talent);
    const Attributes = useContext(AttributesContext);

    useEffect(() => {
        setState(state =>
            state.prerequisites.every(fn => fn({ Attributes })) ?
            behavior.onPrerequisitesMet(state) :
            behavior.onPrerequisitesNotMet(state));
    }, [Attributes]);

    function toggleSelected() {
        setState(state => behavior.toggleSelect(state));
    }

    return (
        <div className="form-check">
            <input className="form-check-input"
                type="checkbox"
                id={ state.id }
                disabled={ state.disabled }
                checked={ state.selected }
                onChange={ toggleSelected } />
            <label className="form-check-label" htmlFor={ state.id }>{ state.name }</label>
        </div>
    );
}
