import {useState} from 'react'
import { pathToRegexp } from 'path-to-regexp'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import BaseMenu from './BaseMenu'

import './index.scss'

const { Sider } = Layout

export const getMenuMatches = (flatMenuKeys, path) =>
    flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));

function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
const getFlatMenuKeys = menu => menu.reduce((keys, item) => {
        keys.push(item.path);
        if (item.children) {
            return keys.concat(getFlatMenuKeys(item.children));
        }
        return keys;
}, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
    paths.reduce(
        (matchKeys, path) =>
            matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
        []
    );

// 获取菜单子节点
const getDefaultCollapsedSubMenus = (props) => {
    const {
        location: { pathname },
        flatMenuKeys,
    } = props;
    return urlToList(pathname)
        .map(item => getMenuMatches(flatMenuKeys, item)[0])
        .filter(item => item);
}
const Menu = (props) => {
    const {
        collapsed,
        collapsedWidth,
        theme,
        width,
    } = props
    const [openKeys, setOpenKeys] = useState([])
    const defaultProps = collapsed ? {} : { openKeys };
    // 展开-收起时的回调函数
    const onCollapse = () => {

    }

    const handleOpenChange = () => {

    }
    const onOpenChange = () => {

    }
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={onCollapse}
            width={256}
        >
            <div className='logo' key="logo" id="logo">
                <Link to="/">
                    <img src='./logo.jpg' alt="logo" />
                    <h1>Design Pro</h1>
                </Link>
            </div>
            <BaseMenu
                key="Menu"
                mode="inline"
                handleOpenChange={handleOpenChange}
                onOpenChange={onOpenChange}
                style={{ padding: '16px 0', width: '100%' }}
                {...props}
                {...defaultProps}
            >

            </BaseMenu>
        </Sider>
    )
}

export default Menu