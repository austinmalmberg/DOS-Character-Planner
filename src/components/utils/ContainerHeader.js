
function ContainerHeader({ name, children }) {
    return (
        <div className="text-center">
            <h3>{ name }</h3>
            { children }
        </div>
    );
}


export default ContainerHeader;
