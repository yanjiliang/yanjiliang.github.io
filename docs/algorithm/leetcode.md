<!-- leetcode热题 -->
# leetcode热题100
1. 两数之和
```js
function(nums, target) {
    if(nums.length < 2) return [];
    // 1 暴力解法
    // const len = nums.length;
    // for(let i = 0; i <= len; i++){
    //     for(let j = i + 1; j <= len; j++){
    //         // 把i以后的每一个值跟第i项组合与target对比
    //         let sum = nums[i] + nums[j];
    //         if(sum == target){
    //             return [i, j]
    //         }
    //     }
    // }

    // 2 使用Map
    const numsMap = new Map();
    nums.forEach((num, idx) => numsMap.set(num, idx));
    nums.forEach((num, idx) => {
        let diff = target - num;
        if(numsMap.has(diff) && numsMap.get(diff) !== idx) {
            return [idx, numsMap.get(diff)]
        }
    })
}
```