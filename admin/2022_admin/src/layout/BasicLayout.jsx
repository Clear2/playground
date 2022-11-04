import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import routers from '../router/config.jsx'
import SiderMenu from '../components/SiderMenu'

function formatter(data) {
    return data.map(item => {
        const result = {
            ...item,
            authority: ''
        }
        if (item.routes) {
            const children = formatter(item.routes)
            result.children = children
        }
        delete result.routes
        return result
    })
}
// console.log(formatter(routers))
const getMenuData = () => {
    return formatter(routers)
}
const BasicLayout = ({children}) => {
    const menuData = getMenuData()
    return (
        <Layout style={{minHeight: '100vh'}}>
            <SiderMenu menuData={menuData}>
            </SiderMenu>
            {/*<Layout>*/}
            {/*    <Header>Header</Header>*/}
            {/*    <Content>*/}
            {/*        <div>{children}</div>*/}
            {/*    </Content>*/}
            {/*    <Footer>Footer</Footer>*/}
            {/*</Layout>*/}
        </Layout>
    )
}

export default BasicLayout