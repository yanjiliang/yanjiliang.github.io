# 排序

## 常见的排序算法

### Low B 三人组

#### 冒泡排序 Bubble Sort
- 列表每两个相邻的数，如果前面的比后面打，则交换这两个数
- 一趟顺序排序完成后，则无序区域减少一个数，有序区域增加一个数

```python
def bubbl_sort(li):
    for i in range(len(li) - 1): # 第I遍排序
        for j in range(len(li) - i - 1):
            if li[j] > li[j+1]:
                li[j],li[j+1] = li[j+1],li[j]
```

优化点：
如果某次循环，并无发生交换，说明列表的排序已经完成
```python
def bubble_sort(li):
    for i in range(len(ii) - 1):
        exchanged = False
        for j in range(len(li) - i - 1):
            if li[j] > li[j + 1]:
                li[j],li[j+1] = li[j+1],li[j]
                exchanged = True
                
        if not exchanged:
            return
```

#### 选择排序

- 每一趟排序记录当前最小的数，放到无序区域的第一个位置
- 有序区和无序区，无序区最小数的位置

```python
def select_sort(li):
    for i in range(len(li) - 1):
        min_idx = i
        for j in range(i, len(li)):
            if li[j] < li[min_idx]:
                min_idx = j
        if min_idx != i:     
            li[i],li[min_idx] = li[min_idx],li[i]
```

#### 插入排序 O(n ^ 2)

```python
def insert_sort(li):
    for i in range(1,len(li)):
        temp = li(i) # 无序区域每次的遍历的第一个
        j = i - 1 # 是有序区域的最后一个
        while j >= 0 and li[j] > temp: # 从右至左依次比较大小，比当前小的，则把当前右移一位
            li(j + 1) = li(i)
            j -= 1
        li[j + 1] = temp # 比当前大的，则放在右边
```

### NB 三人组

#### 快速排序

快速排序的思路：
- 取第一个元素P（第一个元素）
- left\right左右两个下标位置，从right位置开始，找比P元素小的放在left的空位置，找到后，right变为空位置，然后从left开始寻找比P元素大的，放置在right位置，直至left与right相等
- 分为左右两边，左边left放比P元素小的，右边right放比P元素大的
- 递归完成排序

时间复杂度 O(n * log(n))

快速排序的问题：
1. 最坏情况-倒序排列数据
2. 递归

```py
# 快速排序
def partition(data, left, right):
    tmp = li[left]
    while left < right:
        while left < right and li[right] >= tmp: # 找到比tmp要小的元素
            right -= 1 # right左移一位
        li[left] = li[right] # 将找到的比tmp小的元素，放置在left的位置上
        
        while left < right and li[left] <= tmp: # 找到比tmp大的元素
            left += 1 # left右移一位
        li[right] = li[left] # 找到比tmp大的元素li[left]放置在right位置上
    li[left] = tmp
    return left # 此时left与right相等，返回当前下标

def quick_sort(data, left, right):
    if left < right:
        mid = partition(data, left, right)
        quick_sort(data, left, mid - 1)
        quick_sort(data, mid + 1, right)
        
```

#### 堆排序

#### 归并排序

### 其他

#### 希尔排序

#### 基数排序

#### 计数排序
