// function BookCtrl($scope){
//         $scope.books = [
//                 {'name': 'Effective Java', 'author':'Joshua Bloch'},
//                 {'name': 'Year without Pants', 'author':'Scott Berkun'},
//                 {'name':'Confessions of public speaker','author':'Scott Berkun'},
//                 {'name':'JavaScript Good Parts','author':'Douglas Crockford'}
//         ]
// }

//迭代器模式
// var agg = (function() {
//     var index = 0;
//     var data = [1, 2, 3, 4, 5];
//     var length = data.length;

//     return {
//     next: function() {
//     var element;

//     if (!this.hasNext()) {
//     return null;
//     }
//     element = data[index];
//     index = index + 2;
//     return element;
//     },
//     hasNext: function() {
//     return index < length;
//     },
//     rewind: function() {
//     index = 0;
//     },
//     current: function() {
//     return data[index];
//     },
//     }
// }());

//装饰者模式
// function Sale(price){
//     this.price=price||100;
// }

// Sale.prototype.getPrice=function(){
//     return this.price;
// }

// Sale.decorators={};

// Sale.decorators.fedtax={
//     getPrice:function(){
//     var price=this.uber.getPrice();
//     price+=price*0.05;
//     return price;
//     }
// }

// Sale.decorators.quebec={
//     getPrice:function(){
//     var price=this.uber.getPrice();
//     price+=price*0.075;
//     return price;
//     }
// }

// Sale.prototype.decorate=function(decorator){
//     var F=function(){};
//     var overrides=this.constructor.decorators[decorator];
//     var i;
//     var newobj;
//     F.prototype=this;
//     newobj=new F();
//     newobj.uber=F.prototype;
//     for (i in overrides){
//     if(overrides.hasOwnProperty(i)){
//     newobj[i]=overrides[i];
//     }
//     }
//     return newobj;
// }

//装饰者模式2
// var Sale = function() {
//     this.price = 100;
//     this.decoratorsList = [];
// }

// Sale.decorators = {};
// Sale.decorators.fedtax = {
//     getPrice: function(price) {
//     return price + price * 0.05;
//     }
// }

// Sale.prototype.decorate = function(decorator) {
//     this.decoratorsList.push(decorator);
// }

// Sale.prototype.getPrice = function() {
//     var price = this.price;
//     for (var i = 0; i < this.decoratorsList.length; i++) {
//     price = Sale.decorators[this.decoratorsList[i]].getPrice(price);
//     }
//     return price;
// } 

// var sale = new Sale();
// 
// 装饰者模式，自己版本
var decoratorPattern = (function() {
    var obj = {};
    obj.word = $('<p>Hello,world</p>');
    obj.decoratorsList = [];
    obj.init = function() {
        var word = obj.word.clone();

        for (var i in obj.decoratorsList) {
            word = obj.decoratorsList[i](word);
        }

        $("#decorator-p").append(word)
    }
    obj.origin = function(word) {
        $("#decorator-p").append(obj.word)
    }
    obj.decorate = function(decorator) {
        obj.decoratorsList.push(decorator);
        return obj
    }
    obj.undecorate = function(decorator) {
        for (var i in obj.decoratorsList) {
            if (decorator === obj.decoratorsList[i]) {
                obj.decoratorsList.splice(i, 1)
            }
        }
        return obj
    }
    return obj
}())

var decorators = (function(){
    var obj={}
    obj.red = function(word) {
        return word.css('color', 'red')
    }
    obj.bold = function(word) {
        return word.css('font-weight', 900)
    }
    obj.big = function(word) {
        return word.css('font-size', '2em')
    }
    return obj
}())

// //策略模式
var strategyPattern = {
    messages: [],
    config: {
        name: 'isNonEmpty',
        num: 'isNum',
    },
    hasErrors: function(data) {
        return this.messages.length !== 0;
    },
    validate: function(data) {
        var i, j, msg, config, checker, ok;
        this.messages = [];

        for (i in data) {

            if (data.hasOwnProperty(i)) {
                config = this.config[i].split(',');

                for (j in config) {
                    checker = strategies[config[j]];

                    // if (!config[j]) {
                    //     continue
                    // }

                    if (!checker) {
                        console.log('no handler called ' + config[j])
                        continue
                    }

                    ok = checker.validate(data[i]);

                    if (!ok) {
                        msg = i + ' ' + checker.instructions;
                        this.messages.push(msg);
                    }
                }
            }
        }
        if (this.hasErrors()) {
            alert(this.messages.join("\n"));
        }
    }
}

var strategies={
    isNonEmpty: {
        validate: function(value) {
            return value !== '';
        },
        instructions: 'can not be empty',
    },
    isNum: {
        validate: function(value) {
            return !isNaN(value);
        },
        instructions: 'should be number',
    }
}
//观察者模式

// var publisher = {
//     subscribers: {
//         any: []
//     },
//     subscribe: function(fn, type) {
//         type = type || 'any';
//         if (typeof this.subscribers[type] === 'undefined') {
//             this.subscribers[type] = [];
//         }
//         this.subscribers[type].push(fn);
//     },
//     unsubscribe: function(fn, type) {
//         this.visitSubscribers('unsubscribe', fn, type);
//     },
//     publish: function(publication, type) {
//         this.visitSubscribers('publish', publication, type);
//     },
//     visitSubscribers: function(action, arg, type) {
//         var pubtype = type || 'any',
//             subscribers = this.subscribers[pubtype],
//             i, max = subscribers.length;

//         for (i = 0; i < max; i++) {
//             if (action === "publish") {
//                 subscribers[i](arg);
//             } else {
//                 if (subscribers[i] === arg) {
//                     subscribers.splice(i, 1);
//                 }
//             }
//         }
//     }
// }

// function makePublisher(o) {
//     var i;
//     for (i in publisher) {
//         if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
//             o[i] = publisher[i];
//         }
//     }
//     o.subscribers = {
//         any: []
//     };
// }

// var paper = {
//     daily: function() {
//         console.log('daily publish!!!!')
//         this.publish("big news today");
//     },
//     monthly: function() {
//         this.publish("interesting analysis", 'monthly');
//     }
// };

// makePublisher(paper);

// var joe = {
//     drinkCoffee: function(paper) {
//         console.log("just read" + paper);
//     },
//     sundayPreNap: function(monthly) {
//         console.log("about to fall asleep reading this " + monthly);
//     }
// };

// paper.subscribe(joe.drinkCoffee);
// paper.subscribe(joe.sundayPreNap, 'monthly');

// paper.daily();
// paper.monthly();

// //我自己写的观察者模式
// var publisher={
//     subscribers:[],
//     subscribe:function(fn){
//         this.subscribers.push(fn)
//     },
//     publish:function(args){
//         for (var i in this.subscribers){
//             this.subscribers[i](args)
//         }
//     }
// }

// var head=$.extend(publisher,{},true)

// head.greet=function(){
//     console.log('hello, I am head')
//     this.publish({name:'head',word:'hello'})
// }
// head.fuck=function(){
//     console.log('fuck you, I am head')
//     this.publish({name:'head',word:'fuck'})
// }

// var div1=(function(){
//     var obj={
//         greet:function(name){
//             console.log('hello, '+name+',I'+"'"+'m div1!')
//         },
//         fuck:function(name){
//             console.log('Fuck you too, '+name+', this is div1!')
//         },
//         brain:function(args){//订阅者是对象中的brian，由brain判断究竟应该做什么
//             if(args.word==="fuck"){
//                 obj.fuck(args.name)
//             }
//             else{
//                 obj.greet(args.name)
//             }
//         }
//     }
//     return obj
// }())

// var div2=$('#div2')
// div2.say=function(name){
//     console.log('hello, '+name+',I'+"'"+'m div2!')
// }

//我自己写的观察者模式
var publisher = (function() {
    var obj = {}
    var count=0
    obj.subscribers = [],
        obj.subscribe = function(fn) {
            for(var i in obj.subscribers){
                if(fn===obj.subscribers[i]){
                    return
                }
            }
            obj.subscribers.push(fn)
        },
        obj.unsubscribe=function(fn){
            for(var i in obj.subscribers){
                if(fn===obj.subscribers[i]){
                    obj.subscribers.splice(i,1)
                }
            }
        }
        obj.publish = function(args) {
            for (var i in obj.subscribers) {
                obj.subscribers[i](args)
            }
        },
        obj.greet = function() {
            count++
            var msg='hello, I am publisher! '+'*' +count
            console.log(msg)
            obj.publish({
                name: 'publisher',
                word: 'hello'
            })
            $("#observer-publisher-p").text(msg)
        }
    return obj
}())

var Observer = function(id) {
    var count=0
    this.greet = function(name) {
        count++
        var msg = 'hello, ' + name.name + ',I' + "'" + 'm ' + id + '! ' +'*' +count
        console.log(msg)
        $("#" + id).text(msg)
    }
}

var observer1 = new Observer('observer-p1')
var observer2 = new Observer('observer-p2')
var observer3 = new Observer('observer-p3')

// 代理模式
function selfIntro(id) {
    console.log('I am ' + id)
}

var proxySelfIntro = (function() {
    var cache = []
    var func = function(id) {
        cache.push(id)
        console.log('receive your id :' + id)
        if (cache.length === 4) {
            for (var i in cache) {
                selfIntro(cache[i])
            }
            cache = []
        }
    }
    return func
}())

// 职责连
var Chain = function(fn) {
    this.fn = fn
    this.setNext = function(chainNode) {
        this.successor = chainNode
    }
    this.pass = function() {
        var result = this.fn.apply(this, arguments)
        if (result === 'pass' && this.successor !== undefined) {
            this.successor.pass.apply(this.successor, arguments);
        } else {
            console.log('no function set yet')
        }
    }
}
var f1 = function(arg) {
    if (arg === 1) {
        console.log('I am f1')
    } else {
        return 'pass'
    }
}
var f2 = function(arg) {
    if (arg === 2) {
        console.log('I am f2')
    } else {
        return 'pass'
    }
}

var f3 = function(arg) {
    if (arg === 3) {
        console.log('I am f3')
    } else {
        return 'pass'
    }
}

var f4 = function(arg) {
    if (arg === 4) {
        console.log('I am f4')
    } else {
        return 'pass'
    }
}

var c1 = new Chain(f1)
var c2 = new Chain(f2)
var c3 = new Chain(f3)
var c4 = new Chain(f4)

c1.setNext(c2);
c2.setNext(c3);
c3.setNext(c4);


$(function() {
    $("#decorator-init").click(decoratorPattern.init)

    $("#decorator-origin").click(decoratorPattern.origin)

    $("#decorator-red").click(function() {
        decoratorPattern.decorate(decorators.red)
    })

    $("#decorator-big").click(function() {
        decoratorPattern.decorate(decorators.big)
    })

    $("#decorator-bold").click(function() {
        decoratorPattern.decorate(decorators.bold)
    })

    $("#decorator-unred").click(function() {
        decoratorPattern.undecorate(decorators.red)
    })

    $("#decorator-unbig").click(function() {
        decoratorPattern.undecorate(decorators.big)
    })

    $("#decorator-unbold").click(function() {
        decoratorPattern.undecorate(decorators.bold)
    })

    $("#strategy-submit").click(function(event) {
        event.preventDefault()
        var data = {
            num: $("#strategy-num").val(),
            name: $("#strategy-name").val()
        }
        strategyPattern.validate(data)
    })

    $('input[type="checkbox"]').change(function() {
        proxySelfIntro(this.id);
    })

    $("#observer-publisher-greet").click(publisher.greet)

    $("#observer-subscribe-p1").click(function(){
        publisher.subscribe(observer1.greet)
    })

    $("#observer-subscribe-p2").click(function(){
        publisher.subscribe(observer2.greet)
    })

    $("#observer-subscribe-p3").click(function(){
        publisher.subscribe(observer3.greet)
    })

    $("#observer-unsubscribe-p1").click(function(){
        publisher.unsubscribe(observer1.greet)
    })

    $("#observer-unsubscribe-p2").click(function(){
        publisher.unsubscribe(observer2.greet)
    })

    $("#observer-unsubscribe-p3").click(function(){
        publisher.unsubscribe(observer3.greet)
    })

})