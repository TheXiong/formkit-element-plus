# FormKit Element Plus - ArrayItems 组件

ArrayItems 组件是一个列表型输入组件，用于管理数组类型的表单数据。它提供了类似于 Formily 的 ArrayItems 组件的功能，包括添加、删除、复制、上移、下移等操作。

## 基本用法

```vue
<FormKit type="elArrayItems" name="items" label="我的列表">
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
| min | Number | 0 | 最小项目数 |
| max | Number | Infinity | 最大项目数 |
| showIndex | Boolean | true | 是否显示索引 |
| showCopy | Boolean | true | 是否显示复制按钮 |
| showRemove | Boolean | true | 是否显示删除按钮 |
| showMoveUp | Boolean | true | 是否显示上移按钮 |
| showMoveDown | Boolean | true | 是否显示下移按钮 |
| showAdd | Boolean | true | 是否显示添加按钮 |
| addLabel | String | 'Add Item' | 添加按钮文本 |
| addAttrs | Object | {} | 添加按钮额外属性 |
| controlAttrs | Object | {} | 操作按钮额外属性 |

## 插槽

ArrayItems 组件内部使用 ElCard 组件包装每个项目，支持内容插槽和 header 插槽。

## 对比 Formily ArrayItems

与 Formily 的 ArrayItems 组件相比，本组件提供了类似的功能：

1. 添加/删除项目
2. 复制项目
3. 上移/下移项目
4. 自定义索引显示
5. 最小/最大项目限制

本组件采用 FormKit 的架构和渲染机制，与 Element Plus 设计风格保持一致。 