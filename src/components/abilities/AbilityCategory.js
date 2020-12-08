import AbilityListItem from './AbilityListItem';

function AbilityCategory({ abilityCategory }) {
    const collapseId =  abilityCategory.name + '_list';

    return (
        <div className="my-2">
            <a
                className="h4 text-primary font-weight-bold bg-light d-block p-2"
                data-toggle="collapse"
                href={ '#' + collapseId }
                role="button"
                aria-expanded="true"
                aria-controls={ collapseId }>
                { abilityCategory.name }
            </a>
            <ul id={ collapseId } className="list-group list-group-flush collapse show">
                {
                    abilityCategory.abilities.map(ability => (
                        < AbilityListItem key={ ability.name } ability={ ability } />
                    ))
                }
            </ul>
        </div>
    );
}

export default AbilityCategory;
