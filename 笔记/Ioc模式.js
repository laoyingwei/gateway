// 1 ioc 模式 依赖注入: 解耦 功能 
// 例子：
class a {
    constructor (params) {
        this.params = params
    }
}

class b {
    constructor (params) {
        this.params = params
    }
}

class Container {
    constructor () {
        this.container = {}
    }
    register (key,value) {
        this.container[key] = value
    }
    get (key) {
        return this.container[key]
    }
}

const Content = new Container()

const A = new a('我是A')

const B = new b('我是b')

Container.register('A',A)

Container.register('B',B)

class C {
    constructor (container) {
        this.a = container.get('A')
        this.b = container.get('B')
    }
    run () {
        console.log(this.a.params,this.b.params)
    }
}

