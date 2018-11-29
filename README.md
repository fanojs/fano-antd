# fano-antd

## 安装

```sh
npm i fano-antd -S
```

## 配置

需安装按需加载插件`babel-plugin-import`，调整`babel`配置如下：

```json
[
  "import",
  {
    "libraryName": "fano-antd",
    "style": true,
    "camel2DashComponentName": false
  }
]
```

## 示例：使用表格组件

### 第一步：创建配置

```json
{
  "name": "user",
  "listUrl": "https://api.example.com/api/v1/user",
  "columns": [
    {
      "title": "账号",
      "dataIndex": "username"
    },
    {
      "title": "姓名",
      "dataIndex": "name",
      "tip": true
    },
    {
      "title": "邮箱",
      "dataIndex": "email",
      "width": 200
    }
  ]
}
```

### 第二步：创建动态组件

```js
import { FanoTable } from 'fano-antd'
import user from './user.json'
const UserTable = FanoTable.fromJson(user)
```

### 第三步：使用动态组件

```js
export default props => <UserTable />
```
