const a = 'RAM-1TB-2TB-4TB,color-blue-red'
console.log(a.split(","))

a.split(",").reduce((acc, item)=>{
    if(item){
        let a = item.split("-")
        console.log(a)
        let values = [...a]
        console.log(values)
        values.shift()
        console.log(values)
        let a1 = {
            attrs: {$elemMatch: {key: a[0], value: [{$in: values}]}}
        }
        console.log(a1)
        acc.push(a1)
        return acc
    }
    else return acc
}, [])

// in reduce (callbackfn, initialValue) initial value from which we want to start
// initialy accumulator has value of arr[0] and currValue arr[1] until we have
// not provided initialVal
