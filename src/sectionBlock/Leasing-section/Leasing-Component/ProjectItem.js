export const ProjectItem = ({Info}) => {
    return(
        <ul>
            <li className="item">{Info.item1}</li>
            <li className="item item2">{Info.item2}</li>
            <li className="item">{Info.item3}</li>
        </ul>
    )
}