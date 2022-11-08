const data = [
    {
        path: '/',
        children: [
            { path: '/', redirect: '/dashboard/analysis' },
            {
                path: '/dashboard',
                name: 'dashboard',
                children: [
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'workplace',
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
                    },
                    {
                        path: '/list/search',
                        name: 'searchlist'
                    }
                ]
            }
        ]
    }
]


const items = [
    { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
    { label: '菜单项二', key: 'item-2' },
    {
        label: '子菜单',
        key: 'submenu',
        children: [{ label: '子菜单项', key: 'submenu-item-1' }],
    },
];
const arr = []
// 把data里面有name的， 改成items 这种字段的
function formatter (data, result = [], level) {
    data.map((d1, idx) => {
        if (d1.children) {
            if (d1.name) {
                result.push({
                    id: level,
                    label: d1.name,
                    key: d1.path,
                    children: []
                })
            }
            level++
            formatter(d1.children, result, idx)
        } else {
            if (d1.name) {
              console.log('------>>>',result, level)
            }

        }
    })
    return result
}

function getMenu (data) {
    console.log('110-->', data)
    let m = data.map(item => {
        return getSub(item)
    })

    return m
}
function getSub (item) {
    if (item.children) {
        return getMenu(item)
    }
    return getMenuItemPath(item)
}
function getMenuItemPath (item) {
    return {
        label: item.name,
        path: item.path
    }
}
// formatter(data, arr)
// console.log(JSON.stringify(arr))
// console.log(formatter(data))
console.log(getMenu(data))