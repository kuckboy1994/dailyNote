/**
 * 直接插入排序
 * @param {array} arr 将要被排序的数组
 * @return {array} 排序完成的数组
 */
function InsertSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) { //若第i个元素大于i-1元素，直接插入。小于的话，移动有序表后插入
            var j = i - 1;
            var x = arr[i]; //复制为哨兵，即存储待排序元素
            arr[i] = arr[i - 1]; //先后移一个元素
            while (x < arr[j]) { //查找在有序表的插入位置
                arr[j + 1] = arr[j];
                j--; //元素后移
            }
            arr[j + 1] = x; //插入到正确位置
        }
    }
    return arr;
}

var arr = [3, 1, 5, 7, 2, 4, 9, 6];
var sortArr = InsertSort(arr);
console.log(sortArr);
