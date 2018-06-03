//import {moduleInfo} from './helper';
import '../css/main.scss';
import 'jquery';


console.log("this is app.js");

const imgObj=$("img");
console.log('jquery功能');
console.log(imgObj);

console.log("开始调用下面模块功能：");
let title=$('.title');
title.text("独占我的英雄");
//moduleInfo();

if(module.hot){
    module.hot.accept();
}