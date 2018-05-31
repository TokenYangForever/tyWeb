
class fatherClass {
  // ...
  constructor(props) {
  	this.fatherValue = 'papa'
  }
}

function testable (a) {
  a.a = 123
  class newClass extends a {
        constructor(props) {
            super(props)
            this.testClass = 'wtf'
        }
  }
  return newClass
}

@testable
class MyTestableClass extends fatherClass {
  // ...
  constructor(props) {
    super(props)
  	this.testClass = 'MyTestableClass'
  }
}


console.log(new MyTestableClass().testClass, new MyTestableClass().fatherValue)