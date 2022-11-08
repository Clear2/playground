2022.11 
左侧菜单栏-

11.04
路由表 怎么映射到左侧菜单?
就是过滤菜单中的含有名称的

```
    const items = [
        { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
        { label: '菜单项二', key: 'item-2' },
        {
            label: '子菜单',
            key: 'submenu',
            children: [{ label: '子菜单项', key: 'submenu-item-1' }],
        },
    ];
```

11.08 完成路由菜单的配置，未添加权限


把scss改为less