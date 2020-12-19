import { useContext } from 'react';

import ContainerHeader from '../utils/ContainerHeader';

import { PointContext } from './UpgradeUtils';

function UpgradeContainerHeader({ name }) {
    const points = useContext(PointContext);
    
    return (
        <ContainerHeader name={ name }>
            <h5>Available: { points.total - points.used }</h5>
        </ContainerHeader>
    );
}


export default UpgradeContainerHeader;
