import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.scss'

const Login = () => {
  const onFinish = (values) => {
    postLogin(values).then((res) => {
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem(
            'jx_user',
            JSON.stringify({
                userId: res.user_id,
                userName: res.user_name,
            }),
        )
        message.success('🎉 🎉 🎉  登录成功！')
        navigate('/', {
            replace: true
        })
    })
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

  return (
    <div className="login">
    <div className="header">
        <h1 className="logo">管理系统</h1>
        <div className="form">
            <Form
                size="large"
                initialValues={{
                    username: '4482',
                    password: '!jsWmm6240',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password
                        placeholder="请输入密码"
                        prefix={<LockOutlined />}
                        autoComplete={'on'}
                        name={'password'}
                    />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>

    <div className="bottom">
        <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
        >
            <defs>
                <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
            </defs>
            <g className="parallax">
                <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use
                    href="#gentle-wave"
                    x="48"
                    y="3"
                    fill="rgba(255,255,255,0.5)"
                />
                <use
                    href="#gentle-wave"
                    x="48"
                    y="5"
                    fill="rgba(255,255,255,0.3)"
                />
                <use href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
        <div className="footer">
            <p> ©2022 Created by clear</p>
        </div>
    </div>
</div>
  )
}

export default Login
