
import Spell from './Spell';

function SpellLevelContainer({ level, spells }) {

    return (
        <div>
            <h6 className="mb-0 mt-2 text-center font-weight-bold">{ level }</h6>
            <div className="d-flex flex-wrap justify-content-center">
                {
                    spells.map(spell => <Spell spell={ spell } />)
                }
            </div>
        </div>
    );
}

export default SpellLevelContainer;
