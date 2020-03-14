import axios from './axios' //  倒入 api
import qs from 'qs' //  序列化请求数据，视服务端的要求
//  import fetch from '@/utils/fetch' //  序列化请求数据，视服务端的要求

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 此处的数据依然来自 Easy Mock
 */

//  单独倒出

// 新增用户
export const addUser = data => {
  return axios({
    url: '/user/add',
    method: 'Put',
    data
  })
}

// 添加用户角色关系
export const assignRoles = params => {
  return axios({
    url: '/user/assignRoles',
    method: 'Put',
    params
  })
}

// 分页获取所有用户
export const getAllUser = params =>  {
  return axios({
    url: '/user/getAll',
    method: 'Get',
    params
  })
}

// 删除用户信息
export const deleteUser = params => {
  return axios({
    url: '/user/delete',
    method: 'Delete',
    params
  })
}

// 修改用户
export const editUser = data => {
  return axios({
    url: '/user/modify',
    method: 'Post',
    data
  })
}

// 获取用户信息（比对密码）
export const getByPW = params => {
  return axios({
    url: '/user/getByPW',
    method: 'Get',
    params
  })
}

// 修改密码
export const changePassword = params => {
  return axios({
    url: '/user/passWord',
    method: 'Post',
    params
  })
}


// 根据用户id查询用户是否存在
export const checkUnique = data => {
  return axios({
    url: '/user/checkUnique/userId',
    method: 'Post',
    data
  })
}

// 模糊查询用户
export const searchquery = params => {
  return axios({
    url: '/user/query',
    method: 'Post',
    params
  })
}

// 权限分配
export const getByUserId = data => {
  return axios({
    url: '/userSystemRelation/getByUserId',
    method: 'Get',
    data
  })
}

// 保存用户-系统关系 userSystemRelation/saveUserSystem
export const userSystemRelation = data => {
  return axios({
    url: '/userSystemRelation/saveUserSystem',
    method: 'Get',
    data
  })
}

// 新增角色
export const  addRole = data =>  {
  return axios({
    url: '/role/add',
    method: 'Put',
    data
  })
}


// 删除角色
export const delRole = params => {
  return axios({
    url: '/role/delete',
    method: 'Delete',
    params
  })
}


// 分页获取所有角色
export const getAllRole = params => {
  return axios({
    url: '/role/getAllByPage',
    method: 'Post',
    params
  })
}


// 新增机构
export const  addOrg = data =>  {
  return axios({
    url: '/org/add',
    method: 'Put',
    data
  })
}


// 删除机构
export const deleteOrg = params => {
  return axios({
    url: '/org/delete',
    method: 'Delete',
    params
  })
}


// 修改机构
export const editOrg = data => {
  return axios({
    url: '/org/editOrg',
    method: 'Post',
    data
  })
}

// 模糊查询机构
export const msearchOrg = params => {
  return axios({
    url: '/org/query',
    method: 'Post',
    params
  })
}

// 按照机构id查询
export const isearchOrg = params => {
  return axios({
    url: '/org/checkUnique/orgId',
    method: 'Post',
    params
  })
}

// 获取所有机构
export const getAllOrg = params => {
  return axios({
    url: '/org/getAll',
    method: 'Post',
    params
  })
}

//  根据机构代码id判断唯一性
export const getByID = params => {
  return axios({
    url: '/org/checkUnique/orgId',
    method: 'Post',
    params
  })
}

// 根据机构名称判断唯一性
export const getByName = params => {
  return axios({
    url: '/org/checkOrgNameUnique/name',
    method: 'Post',
    params
  })
}
// 添加字段方法
export const addAttr = data => {
  return axios({
    url: '/attFunction/add',
    method: 'Post',
    data
  })
}

//  模糊查询字段/ attFunction /query
export const findAttr = params => {
  return axios({
    url: '/attFunction/query',
    method: 'Post',
    params
  })
}

// 根据id删除字段/ attFunction /deletes
export const deleteAttr = params => {
  return axios({
    url: '/attFunction/deletes',
    method: 'Delete',
    params
  })
}


// 添加字段参数/ attFuncParam /add
export const attFuncParam = data => {
  return axios({
    url: '/attFuncParam/add',
    method: 'Post',
    data
  })
}

// 根据字段处理方法id查询参数
export const getParams = params => {
  return axios({
    url: '/attFuncParam/getByFuncId',
    method: 'Get',
    params
  })
}



// ESB服务器管理  获取服务器列表/esbServer/getServerList
export const getServerList = data => {
  return axios({
    url: '/esbServer/getServerList',
    method: 'Get',
    data
  })
}

// 添加服务器/esbServer/add
export const addesbServer = data => {
  return axios({
    url: '/esbServer/add',
    method: 'Post',
    data
  })
}
// 删除服务器
export const delesbServer = params => {
  return axios({
    url: '/esbServer/deleteById',
    method: 'Delete',
    params
  })
}

//  系统日志列表
export const getsystemLog = params => {
  return axios({
    url: '/systemLog/query',
    method: 'Get',
    params
  })
}
// 生成类管理
export const addGenerator = data => {// 新增类
  return axios({
    url: '/generator/add',
    method: 'Post',
    data
  })
}

// 生成类列表
export const getGeneratorList = data => {// 查询所有
  return axios({
    url: '/generator/getAll',
    method: 'Get',
    data
  })
}

//  英文单词及缩写/englishWord/query
export const englishWord = data => { // 查询所有英文单词
  return axios({
    url: '/englishWord/query',
    method: 'Post',
    data
  })
}


//  新增英文单词
export const englishWordAdd = data => { // 查询所有
  return axios({
    url: '/englishWord/add',
    method: 'Post',
    data
  })
}


// 修改英文单词
export const englishWordEdit = data => {// 查询所有
  return axios({
    url: '/englishWord/modify',
    method: 'Post',
    data
  })
}

// 删除英文单词
export const englishWordDel = params => {// 查询所有
  return axios({
    url: '/englishWord/delete',
    method: 'Post',
    params
  })
}



// 查询所类别词
export const categoryWord = data => {
  return axios({
    url: '/categoryWord/query',
    method: 'Post',
    data
  })
}


// 新增类别词
export const categoryWordAdd = data => {// 新增
  return axios({
    url: '/categoryWord/add',
    method: 'Post',
    data
  })
}

// 修改类别词
export const categoryWordEdit = data => {// 修改
  return axios({
    url: '/categoryWord/modify',
    method: 'Post',
    data
  })
}

// 批量删除类别词

export const categoryWordDel = params => {// 不支持批量
  return axios({
    url: '/categoryWord/delete',
    method: 'Post',
    params
  })
}

export const getProtocol = params => { // 不支持批量
  return axios({
    url: '/protocol/getSystemProtocol',
    method: 'Post',
    params
  })
}

//  根据条件查询元数据
export const metadataList = data => {
  return axios({
    url: '/metadata/queryAll',
    method: 'Post',
    data
  })
}

//  新增元数据
export const metadataAdd = data => {
  return axios({
    url: '/metadata/add',
    method: 'Post',
    data
  })
}

//  修改元数据
export const metadataEdit = params => {
  return axios({
    url: '/metadata/modify',
    method: 'Post',
    params
  })
}

// 删除元数据
export const metadataDelete = params => {
  return axios({
    url: '/metadata/deletes',
    method: 'Post',
    params
  })
}

export default {
  getAllUser,// 获取全部用户
  addUser,// 新增用户
  assignRoles,// 添加用户角色关系
  editUser,// 修改用户
  getByPW,// 比对密码
  changePassword,// 修改密码
  searchquery,// 搜索用户
  addOrg,// 增加机构
  deleteOrg,// 删除机构
  editOrg,// 修改机构
  msearchOrg,// 模糊查询机构
  isearchOrg,// 精准查询机构
  getAllOrg,// 获取所有机构
  getByID,// 根据机构ID判断唯一性
  getByName,// 根据机构name判断唯一性
  //  getpassword
  getAllRole, // 获取角色列表
  delRole,// 删除角色
  addRole,// 添加角色
  findAttr,// 查询字段方法
  addAttr,// 添加字段方法
  deleteAttr,// 根据id删除字段，可多选删除
  attFuncParam,// 添加字段
  getParams,// 根据字段处理方法id查询参数
  getServerList,// 获取esb服务器列表
  addesbServer,// 添加服务器
  delesbServer,//  删除服务器
  getsystemLog,// 获取系统日志，
  addGenerator,// 新增生成类
  getGeneratorList,// 获取生成类列表
  //  公共平台部分
  englishWord,//  英文单词及缩写管理
  englishWordAdd,// 添加英文单词
  englishWordEdit,// 修改英文单词
  englishWordDel,// 删除英文单词
  categoryWord,// 搜索类别词
  categoryWordAdd,// 添加类别词
  categoryWordEdit,// 修改类别词
  //  categoryWordAll,// 获取所有的类别词
  categoryWordDel,// 删除类别词
  metadataList,// 查询元数据
  metadataAdd,// 新增元数据
  metadataEdit,// 修改元数据
  metadataDelete // 删除元数据

}
