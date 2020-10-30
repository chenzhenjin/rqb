## computed说明

### 当作函数进行传参时

- 需要设置闭包
- 闭包的匿名函数可接收参数
- _this闭包变量存this

```
  conputed:{
    showPrice(){
      const _this = this
      return function(type){
        return _this.price[type]
      }
    }
  }
```
