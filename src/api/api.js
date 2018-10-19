import axios from 'axios'

let base_url = 'http://192.168.20.130:8001';
/*登录url*/
let manageInfoLogin_url = '/managerInfo/login';
/*区域url*/
let areaTree_url = '/area/tree/';
let addArea_url = '/area/';

// 管理员用户登录
export const LoginUser = (userInfo) => {
  return axios.post(`${base_url}${manageInfoLogin_url}`, userInfo)
};

//查询区域树（当前区域以及所有子区域）
export const areaTree = () => {
  return axios.get(`${base_url}${areaTree_url}`)
};

export const addArea = (addAreaReq) => {
  return axios.post(`${base_url}${addArea_url}`, addAreaReq)
};
//post请求的另一种写法
/*export const LoginUser = data =>{
  return axios({
    method: 'post',
    url: base+manageInfoLogin,
    data: data,
    headers:{"Content-Type": "application/json;charset=UTF-8"}
  })
}*/
