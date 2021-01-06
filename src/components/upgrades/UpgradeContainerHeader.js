import ContainerHeader from '../utils/ContainerHeader';

function UpgradeContainerHeader({ name, availablePoints }) {
    return (
        <ContainerHeader name={ name }>
            <h5>Available: { availablePoints }</h5>
        </ContainerHeader>
    );
}


export default UpgradeContainerHeader;
