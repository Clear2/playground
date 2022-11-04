import { Link } from 'react-router-dom'

import { Menu } from 'antd';
const { SubMenu } = Menu;

const getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
        return [];
    }
    return menusData.map(item => {
            const itemDom = getSubMenuOrItem(item, parent)
            return itemDom
        }).filter(item => item && !item.hideInMenu)
}

const getSubMenuOrItem = (item) => {
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        console.log('0mmmm--->>', item)

        return getNavMenuItems(item.children)
    }

    console.log('1mmmm--->>', item)
    const itemPath = conversionPath(item.path)

    return {
        label: item.name,
        key: itemPath
    }    // return <Menu items={getMenuItemPath(item)}></Menu>
}

const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
        return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
};
const getMenuItemPath = (item) => {
    const itemPath = conversionPath(item.path)
    //
    // const { target } = item
    // if (/^https?:\/\//.test(itemPath)) {
    //     return (
    //         <a href={itemPath} target={target}>
    //             <span>{name}</span>
    //         </a>
    //     )
    // }
    //
    // return (
    //     <Link key={itemPath} to={itemPath} target={target} replace={itemPath === location.pathname}>
    //         <span>{name}</span>
    //     </Link>
    // )
    return {
        label: item.name,
        key: itemPath
    }
}

const BaseMenu = (props) => {
    const { openKeys, menuData, theme, mode } = props;
    // console.log('--->>', props)

    const handleOpenChange = () => {

    }
    const items = [
        { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
        { label: '菜单项二', key: 'item-2' },
        {
            label: '子菜单',
            key: 'submenu',
            children: [{ label: '子菜单项', key: 'submenu-item-1' }],
        },
    ];

    const onClick = ({ item, key, keyPath, domEvent }) => {

    }
    const test =  getNavMenuItems(menuData)
    console.log('1-->', getNavMenuItems(menuData))
    return (
        <Menu items={items} mode={mode} theme={theme} onOpenChange={handleOpenChange} onClick={onClick}>
            {/*{getNavMenuItems(menuData)}*/}
        </Menu>
    )
}

export default BaseMenu