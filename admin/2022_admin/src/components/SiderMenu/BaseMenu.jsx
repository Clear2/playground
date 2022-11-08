import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd';

const getNavMenuItems = (menuData, parent) => {
    if (!menuData) {
        return [];
    }
    return menuData.map((item, idx) => {
        const ItemDom = getSubMenuOrItem(item, parent);

        return ItemDom
    })
}

const getSubMenuOrItem = (item) => {
    if (item.children) {

        // return <SubMenu
        //     title={item.name}
        //     key={item.path}>
        //     {getNavMenuItems(item.children)}
        // </SubMenu>
        return {
            label: item.name,
            key: item.path,
            children: getNavMenuItems(item.children)
        }
    }
    return {
        label: item.name,
        key: item.path,
    }
    // return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
}

const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
        return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
};
const getMenuItemPath = (item) => {
    const itemPath = conversionPath(item.path)
    const { target } = item
    if (/^https?:\/\//.test(itemPath)) {
        return (
            <a href={itemPath} target={target}>
                <span>{item.name}</span>
            </a>
        )
    }
    return (
        <Link key={itemPath} to={itemPath} target={target} replace={itemPath === location.pathname}>
            <span>{item.name}</span>
        </Link>
    )

}

const BaseMenu = (props) => {
    let navigate = useNavigate();

    const { openKeys, menuData, theme, mode } = props;

    const handleOpenChange = () => {

    }

    const onClick = ({ item, key, keyPath, domEvent }) => {
        console.log('-->',  key, keyPath)
        navigate(key);

    }
    console.log(getNavMenuItems(menuData))
    return (
        <Menu items={getNavMenuItems(menuData)} mode={mode} theme='dark' onOpenChange={handleOpenChange} onClick={onClick}>
        </Menu>
    )
}

export default BaseMenu