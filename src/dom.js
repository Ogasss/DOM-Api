window.dom = {
    create(string){
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },//创建节点，接受的参数为HTML文本字符串

    before(node,node2){
        node.parentNode.insertBefore(node2,node)
    },//在节点node前，创建节点node2

    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling)
    },//在节点node后，创建节点node2

    append(parent,node){
        parent.appendChild(node)
    },//在节点parent内，创建子节点node

    wrap(node,parent){
        dom.before(node,parent)
        dom.append(parent,node)
    },//在节点node外，创建父节点parent





    remove(node){
        node.parentNode.removeChild(node)
        return node
    },//删除节点node，从树中删除，保留在内存中

    empty(node){
        const {childNodes} = node
        const arr = []
        let theFirstChild = node.firstChild
        while(theFirstChild){
            arr.push(dom.remove(node.firstChild))
            theFirstChild = node.firstChild
        }
        return arr
    },//删除节点node及其子代衍生，并返回删除的节点引用




    attr(node,name,value){
        if(arguments === 3){
            node.setAttribute(name,value)
        }else if(arguments === 2){
            return node.getAttribute(name)
        }
    },//接受前两个参数时，读取节点的属性值
    //接受三个参数时，将节点的属性值更改为参数属性值

    text(node,string){
        if(arguments === 2){
            if('innerText' in node){
                node.innerText = string
            }else{
                node.textContent = string
            }
        }else if(arguments === 1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },//接受两个参数时，更改节点的文本内容为参数字符串
    //接受一个参数时，读取节点的文本内容

    html(node,string){
        if(arguments === 2){
            node.innerHTML = string
        }else if(arguments === 1){
            return node.innerHTML
        }
    },//接受两个参数，更改节点的html内容为参数字符串
    //接受一个参数，读取节点的html内容

    style(node,name,value){
        if(arguments.length === 3){
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                return node.style[name]
            }else if(name instanceof Object){
                for(let key in name){
                    node.style[key] = name[key]
                }
            }
        }
    },//接受三个参数，对应：dom.style(node,'color','red')
    //将节点的属性更改为参数值
    //接受两个参数，第二参数为字符串,对应：dom.style(node,'color')
    //读取节点的属性
    //接受两个参数，第二参数为对象，对应：dom.style(node,{color: 'red'})
    //将参数对象作为样式加入到节点中

    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.has(className)
        }
    },//对节点进行选择器操作
    //add()，向节点增加选择器
    //remove()，移除节点的选择器
    //has()，确认节点内是否有选择器

    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },//向节点绑定事件与触发函数，函数需要以变量形式存储

    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },//接触节点的事件与触发函数的绑定





    find(selector,scope){
        return (scope||document).querySelectorAll(selector)
    },//仅有一个参数，则查找document下满足选择器的元素
    //有两个参数时，在scope节点内查找满足选择器的元素
    //返回满足选择器条件的伪数组

    parent(node){
        return node.parentNode
    },//返回节点的父节点

    children(node){
        return node.children
    },//返回节点的子节点，伪数组

    siblings(node){
        Array.from(node.parentNode.children).filter(n => n !== node)
    },//返回节点的同级节点

    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },//返回节点的下一个元素节点

    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },//返回节点的上一个元素节点

    each(nodeList,fn){
        for(let i =0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },//接受一个节点列表，并对节点列表内的每个节点执行fn函数
    //fn函数接受的参数为节点列表内的节点

    index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i =0; i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    },//获取节点在同级节点列表中的序列
};  
