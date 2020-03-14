/**
 * Created by apple on 2019/7/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../src/api/config'

// 让ajax携带cookie
axios.defaults.withCredentials = true
Vue.use(Vuex)

const state = {
  baseURL: config.baseURL,
  getMoreDataGet: (url, data, response, _self) => {
    axios.get(state.baseURL + url, {params: data})
      .then(res => {
        let resultFirst = res.data
        let result
        //let type = typeof resultFirst
        //console.log(resultFirst.data)
        result = resultFirst
        console.log(result)

        if (result.returnCode === 200) {
          response(result)
        } else if (result.returnCode === 401) {
          if (_self) {
            _self.$router.push({name: 'login'})
          }
        } else {
          if (_self) {
            _self.$message.warn(result.returnMsg)
          }
        } }, err => {
        console.log(err)
      })
  },
  getMoreDataPost: (url, data, response, _self) => {
    return axios({
      url: state.baseURL + url,
      method: 'Post',
      data
    }).then(res => {
      let result = res.data

      if (result.returnCode === 200) {
        response(result)
      } else if (result.returnCode === 401) {
        if (_self) {
          _self.$router.push({name: 'login'})
        }
      } else {
        if (_self) {
          _self.$message.warn(result.returnMsg)
        }
      }},err => {
      console.log(err)
    })
  },
  getMoreDataStringPost: (url, params, response, _self) => {
    return axios({
      url: state.baseURL + url,
      method: 'Post',
      params
    }).then(res => {
      let result = res.data

      if (result.returnCode === 200) {
        response(result)
      } else if (result.returnCode === 401) {
        if (_self) {
          _self.$router.push({name: 'login'})
        }
      } else {
        if (_self) {
          _self.$message.warn(result.returnMsg)
        }
      }},err => {
      console.log(err)
    })
  },
  getMoreDataDelete: (url, params, response, _self) => {
    return axios({
      url: state.baseURL + url,
      method: 'Delete',
      params
    }).then(res => {
      let result = res.data

      if (result.returnCode === 200) {
        response(result)
      } else if (result.returnCode === 401) {
        if (_self) {
          _self.$router.push({name: 'login'})
        }
      } else {
        if (_self) {
          _self.$message.warn(result.returnMsg)
        }
      }},err => {
      console.log(err)
    })
  },
  getMoreDataDownload: (url, params, response, _self) => {
    return axios({
      url: state.baseURL + url,
      method: 'Post',
      responseType: 'blob',
      params
    }).then(res => {
      response();
    },err => {
      console.log(err)
    })
  },

  getMoreDataPut: (url, data, response, _self) => {
    return axios({
      url: state.baseURL + url,
      method: 'Put',
      data
    }).then(res => {
      let result = res.data

      if (result.returnCode === 200) {
        response(result)
      } else if (result.returnCode === 401) {
        if (_self) {
          _self.$router.push({name: 'login'})
        }
      } else {
        if (_self) {
          _self.$message.warn(result.returnMsg)
        }
      }},err => {
      console.log(err)
    })
  },
  getUploadPost: (url, data, response, _self) => {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(state.baseURL + url, data, config)
      .then(res => {
        let result = res.data

        if (result.returnCode === 200) {
          response(result)
        } else if (result.returnCode === 401) {
          if (_self) {
            _self.$router.push({name: 'login'})
          }
        } else {
          // console.log(result.returnMsg)
          if (_self) {
            _self.$message.warn(result.returnMsg)
          }
        }}, err => {
        console.log(err)
      })
  },
  // 删除日志
  deleteLogList (logInfos, delrespFunc) {
    let url = '/log/delete'
    let params = {
      logInfos: logInfos
    }
    let response = (res) => {
      delrespFunc()
    }
    state.getMoreDataDelete(url, params, response)
  },
  // 清空日志
  emptyLogList (type, emptyRespfunc) {
    let url = '/log/deleteByType'
    let params = {
      type: type
    }
    let response = (res) => {
      emptyRespfunc()
    }
    state.getMoreDataDelete(url, params, response)
  }
}

const mutations = {}

export default new Vuex.Store({
  state,
  mutations
})
