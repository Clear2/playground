import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BasicLayout  from '@/layout/BasicLayout'
import Analysis from '@/pages/DashBoard/Analysis'
import Workplace from '@/pages/DashBoard/Workplace'

export default [
  {
    path: '/',

    element: <BasicLayout />,
    children: [
      // { name: 'x', path: '/', redirect: '/dashboard/analysis' },

      {
        path: '/dashboard',
        name: 'dashboard',
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            element: <Analysis />,
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            element: <Workplace />,
          },
        ]
      }
    ]
  }
]