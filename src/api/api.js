import axios from 'axios'

let base_url = 'http://119.29.175.180:8001';
/*登录url*/
let manageInfoLogin_url = '/managerInfo/login';
/*区域url*/
let area_areaTree_url = '/area/tree';
let area_addArea_url = '/area';
let area_deleteArea_url = '/area/';
let area_updateArea_url = '/area/';

// 管理员用户登录
export const LoginUser = (userInfo) => {
  return axios.post(`${base_url}${manageInfoLogin_url}`, userInfo)
};

//查询区域树（当前区域以及所有子区域）
export const areaTree = () => {
  return axios.get(`${base_url}${area_areaTree_url}`)
};
//添加区域
export const addArea = (addAreaReq) => {
  return axios.post(`${base_url}${area_addArea_url}`, addAreaReq)
};
//删除区域
export const deleteArea = (areaId) => {
  return axios.delete(`${base_url}${area_deleteArea_url}${areaId}`)
};
//更新区域
export const updateArea = (areaId,updateAreaReq) => {
  return axios.put(`${base_url}${area_updateArea_url}${areaId}`, updateAreaReq)
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
