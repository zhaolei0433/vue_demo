import axios from 'axios'

let base_url = 'http://192.168.20.130:8001';
let manageInfoLogin_url = '/managerInfo/login';
let areaTree_url = '/area/tree/';

// 管理员用户登录
export const LoginUser = (userInfo) => {
  return axios.post(`${base_url}${manageInfoLogin_url}`, userInfo)
};

//查询区域树（当前区域以及所有子区域）
export const AreaTree = () => {
  return axios.get(`${base_url}${areaTree_url}`)
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
