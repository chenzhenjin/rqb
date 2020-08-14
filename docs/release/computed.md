# computed

### 当作函数进行传参时

- 需要设置闭包
- 闭包的匿名函数接收参数
- this 指向

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
