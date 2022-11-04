import * as AntdIcons from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { useState } from 'react'
import { categories } from './Fields'

import './index.less'

const allIcons = AntdIcons
const { TabPane } = Tabs

export default ({ onConfirm }) => {
  const [theme] = useState('Outlined')
  const icons = Object.keys(categories)
    .map((key) => ({
      category: key,
      icons: categories[key]
        .map((iconName) => iconName + theme)
        .filter((iconName) => allIcons[iconName]),
    }))
    .filter(({ icons }) => icons.length)

  return (
    <Tabs>
      {icons.map(({ category, icons }) => {
        return (
          <TabPane tab={category} key={category}>
            <ul className="anticons-list">
              {icons.map((name) => (
                <li key={name} onClick={() => onConfirm(name)}>
                  {React.createElement(allIcons[name], {
                    className: 'anticon',
                    key: name,
                  })}
                </li>
              ))}
            </ul>
          </TabPane>
        )
      })}
    </Tabs>
  )
}
