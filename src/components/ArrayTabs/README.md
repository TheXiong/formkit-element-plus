# FormKit Element Plus - ArrayTabs 组件

ArrayTabs 组件是一个基于标签页的数组管理组件，用于管理数组类型的表单数据。它提供了类似于 Formily 的 ArrayTabs 组件的功能，包括添加、删除、复制标签页等操作。

## 基本用法

```vue
<FormKit type="elArrayTabs" name="tabs" label="我的标签页">
  <FormKit type="elInput" name="name" label="姓名" />
  <FormKit type="elInput" name="age" label="年龄" />
  <FormKit type="elSelect" name="gender" label="性别" :options="[
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ]" />
</FormKit>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| min | Number | 0 | 最小标签页数 |
| max | Number | Infinity | 最大标签页数 |
| tabPosition | String | 'top' | 标签页位置, 可选值: top/right/bottom/left |
| tabType | String | '' | 标签页类型, 可选值: ''/'card'/'border-card' |
| stretch | Boolean | false | 标签页是否自适应宽度 |
| closable | Boolean | false | 标签页是否可关闭 |
| showIndex | Boolean | true | 是否显示索引号 |
| showCopy | Boolean | true | 是否显示复制按钮 |
| showRemove | Boolean | true | 是否显示删除按钮 |
| showAdd | Boolean | true | 是否显示添加按钮 |
| addLabel | String | 'Add Tab' | 添加按钮文本 |
| addAttrs | Object | {} | 添加按钮额外属性 |

## 插槽

ArrayTabs 组件使用 ElTabs 和 ElTabPane 组件作为容器，每个标签页内的内容都是通过插槽传入的。

## 对比 Formily ArrayTabs

与 Formily 的 ArrayTabs 组件相比，本组件提供了类似的功能：

1. 标签页形式管理数组数据
2. 添加/删除标签页
3. 复制标签页
4. 自定义标签页样式和位置
5. 最小/最大标签页数限制

本组件采用 FormKit 的架构和渲染机制，与 Element Plus 设计风格保持一致。 