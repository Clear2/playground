import LeftMenu from './LeftMenu'


const getFlatMenuKeys = menuData => {
    let keys = []
    menuData.forEach(item => {
        if (item.children) {
            keys = keys.concat(getFlatMenuKeys(item.children))
        }
        keys.push(item.path)
    })
    return keys
}
export default function (props) {
    const {
        menuData
    } = props

    return (
        <LeftMenu {...props} flatMenuKeys={getFlatMenuKeys(menuData)}></LeftMenu>
    )
}

