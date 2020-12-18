import ContainerHeader from '../utils/ContainerHeader';

function UpgradeContainerHeader({ name, points }) {
    return (
        <ContainerHeader name={ name }>
            <h5>Available: { points }</h5>
        </ContainerHeader>
    );
}


export default UpgradeContainerHeader;
