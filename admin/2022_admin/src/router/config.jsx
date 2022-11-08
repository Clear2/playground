import Analysis from '@/pages/DashBoard/Analysis'
import Workplace from '@/pages/DashBoard/Workplace'
import SearchList from '@/pages/List/SearchList'
import TableList from '@/pages/List/TableList'

export default  [
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
  },
  {
    path: '/list',
    name: 'list',
    children: [
      {
        path: '/list/table-list',
        name: 'tablelist',
        element: <TableList />
      },
      {
        path: '/list/search',
        name: 'searchlist',
        element: <SearchList />
      }
    ]
  }
]