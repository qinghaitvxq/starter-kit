console.log("------------------------------脚本代码开始------------------------------");

const requestUrl="https://api.github.com/users/";
let imgList=document.querySelector("#imgList");

// promise 用法
function fetchAvatarUrl(userId) {
    return fetch(`${requestUrl}${userId}`)
        .then(response=>response.json())
        .then(data=>data.avatar_url);
}
const result=fetchAvatarUrl('qinghaitvxq');

result.then((data)=>{
    console.log(data);
    let myImage=new Image(200,200);
    myImage.src=data;
    imgList.appendChild(myImage);

});

// 改写为async
async function fetfetchAvatarUrl2(userId) {
    const response=await fetch(`${requestUrl}${userId}`);
    const resJsonObj=await response.json();
    return resJsonObj.avatar_url;
}
console.log("使用async 获取");
const myImageUrl=fetfetchAvatarUrl2('qinghaitvxq');
myImageUrl.then((data)=>{
    console.log(data);
    let myImage=new Image(200,200);
    myImage.src=data;
    imgList.appendChild(myImage);
})

console.log("------------------------------脚本代码结束------------------------------")

if(module.hot){
    module.hot.accept();
}