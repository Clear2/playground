import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export const BasicLayout = ({children}) => {
    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <div>{children}</div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}