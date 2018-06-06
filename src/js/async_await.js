console.log("------------------------------脚本代码开始------------------------------");
import '../css/async_await.scss';

const requestUrl="https://api.github.com/users/";
let imgList=document.querySelector("#imgList");

// 消费返回的promise
function consumeResultPromise(result) {
    result.then((data)=>{
        console.log(data);
        let myImage=new Image(100,100);
        myImage.src=data;
        imgList.appendChild(myImage);
    })
}
async function fetfetchAvatarUrl2(userId) {
    const response=await fetch(`${requestUrl}${userId}`);
    const resJsonObj=await response.json();
    return resJsonObj.avatar_url;
}

const asyncResult=fetfetchAvatarUrl2('mpj');
consumeResultPromise(asyncResult);

// get his cat

const reqCatUrl="https://catappapi.herokuapp.com/users/";

function getCatsInfoByUser(userId) {
  return fetch(`${reqCatUrl}${userId}`)
       .then(res=>res.json())
       .then(user=>{
           const promises= user.cats.map(catId=>{
               return fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
                   .then(res=>res.json())
                   .then(data=>data.imageUrl);
           });
           return Promise.all(promises);
       })
}

async function getCatsInfoByUser2(userId) {
    const response=await fetch(`${reqCatUrl}${userId}`);
    const user=await response.json();
    let resultData=[];

    for(const catId of user.cats){
        const cat=await fetch(`https://catappapi.herokuapp.com/cats/${catId}`);
        const catData=await cat.json();
        resultData.push(catData.imageUrl);
    }
    return resultData;
}

async function getCatsInfoByUser3(userId) {
    const response=await fetch(`${reqCatUrl}${userId}`);
    const user=await response.json();
    let resultData=[];

    return Promise.all(user.cats.map(async function (catId) {
        const cat=await fetch(`https://catappapi.herokuapp.com/cats/${catId}`);
        const catData=await cat.json();
        return catData.imageUrl;
    }));

}
const cats=getCatsInfoByUser3(123);
console.log("查看返回数据");
cats.then((res)=>{
    console.log('1111');
    console.log(res);
})

console.log("------------------------------脚本代码结束------------------------------")

if(module.hot){
    module.hot.accept();
}