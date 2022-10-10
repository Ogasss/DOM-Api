let test = dom.create('<div id="test">test</div>')
console.log(test)


dom.before(root,test)
dom.after(root,test)
dom.append(root,test)
dom.wrap(root,test)

dom.attr(test,'style','color: gray')
dom.text(test,'测试')
dom.html(test,'<div>测试</div>')

dom.style(test,{color: 'red'})
dom.style(test,'color','gray')
console.log(dom.style(test,'color'))

dom.class.add(test,'border')
console.log(dom.class.has(test,'border'))
dom.class.remove(test,'border')

let fn = function(){
    console.log('点击了')
}
dom.on(test,'click',fn)
dom.off(test,'click',fn)

console.log(dom.find('#test')[0])

let test1 = dom.create('<div>父级</div>')
dom.wrap(test,test1)
console.log(dom.parent(test1))
console.log(dom.children(test1))

let test2 = dom.create('<div>前置同级</div>')
dom.before(test,test2)

let test3 = dom.create('<div>后置同级</div>')
dom.after(test,test3)

console.log(dom.siblings(test))
console.log(dom.previous(test))
console.log(dom.next(test))

console.log('————————————')

const divList = dom.find('div')
dom.each(divList,(n) => console.log(n))

console.log(dom.index(test))