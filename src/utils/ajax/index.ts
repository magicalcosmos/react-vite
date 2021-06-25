import axios from 'axios';
import qs from 'qs';
import log from '~@/utils/log';
import localStorage from '~@/utils/localStorage';
import { LOGIN } from '~@/utils/dict';
import { IEnvConfig, IAjaxParams } from '~@/interface';
class Ajax {
  /**
   * Get config
   */
  getConfig() {
    return new Promise((resolve, reject) => {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const config: IEnvConfig = RUN_ENV;
      if (config.API_ENDPOINT && config.WS_ENDPOINT) {
        resolve({
          API_BASE: config.API_ENDPOINT,
          WS_ENDPOINT: config.WS_ENDPOINT
        });
      } else {
        const URL = `${protocol}//${host}/config.json`;
        axios
          .get(URL)
          .then((data) => {
            let newEnv: IEnvConfig = {};
            const configData = data.data;
            if (configData.enable) {
              newEnv = {
                API_ENDPOINT: configData.API_ENDPOINT,
                WS_ENDPOINT: configData.WS_ENDPOINT
              };
            } else {
              if (config) {
                newEnv = {
                  // for develop
                  API_ENDPOINT:
                    typeof config.API_ENDPOINT === 'function'
                      ? config.API_ENDPOINT(window)
                      : config.API_ENDPOINT,
                  WS_ENDPOINT:
                    typeof config.WS_ENDPOINT === 'function'
                      ? config.WS_ENDPOINT(window)
                      : config.WS_ENDPOINT
                };
              }
              if (!newEnv.API_ENDPOINT) {
                // in case
                const lastHost = host.split(':')[0];
                newEnv = {
                  API_ENDPOINT: `${protocol}//${lastHost}:8006/api/v2`,
                  WS_ENDPOINT: `ws://${lastHost}:8006`
                };
              }
            }
            resolve(newEnv);
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    });
  }

  /**
   * restful style common request
   * @param type
   * @param ajaxParams
   * @param isQueryString
   * @param isFormData
   */
  restfulCommon(
    type: string,
    ajaxParams: IAjaxParams,
    isQueryString?: boolean,
    isFormData = false,
    responseType = 'json'
  ) {
    return axios
      .all([localStorage.getTokenSync(), this.getConfig()])
      .then(
        axios.spread(function(AUTH_TOKEN, config) {
          if (AUTH_TOKEN) {
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + AUTH_TOKEN;
          }
          axios.defaults.responseType = responseType;
          axios.defaults.headers[type]['Content-Type'] = !isFormData
            ? 'application/x-www-form-urlencoded'
            : 'multipart/form-data';

          //================== interceptors request   ====================
          axios.interceptors.request.use(
            (config) => {
              //==========  all config before request  ==============
              return config;
            },
            (err) => {
              //==================  error handle  ====================
              return Promise.resolve(err);
            }
          );
          let axiosURL =
            (typeof config.API_BASE === 'function'
              ? config.API_BASE(window)
              : config.API_BASE) + ajaxParams.url;
          let axiosParams = ajaxParams.params || {};
          if (isQueryString && Object.keys(ajaxParams.params).length) {
            // request parameters concat to url for put, delete
            axiosURL +=
              (axiosURL.indexOf('?') < 0 ? '?' : '&') +
              qs.stringify(Object.assign(ajaxParams.params));
            axiosParams = {};
          }
          const result = axios[type](axiosURL, axiosParams);
          result.catch((error: Error) => {
            if (
              error &&
              error.response &&
              error.response.status === 401 &&
              ajaxParams.url.indexOf('access-token.json') < 0
            ) {
              localStorage.remove(LOGIN.TOKEN);
              window.location.reload();
            }
            return error;
          });
          return !ajaxParams.callback
            ? result
            : result
              .then((data: any) => {
                ajaxParams.callback('', data);
              })
              .catch((error: Error) => {
                ajaxParams.callback(error);
              });
        })
      )
      .catch((err: Error) => {
        return ajaxParams.callback
          ? ajaxParams.callback(err)
          : new Promise((resolve, reject) => {
            reject(err);
          });
      });
  }

  /**
   * query
   * @param ajaxParams
   * @param isQueryString
   */
  get(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('get', ajaxParams, isQueryString);
  }
  /**
   * Submit data
   * @param ajaxParams
   * @param isQueryString
   */
  post(ajaxParams: IAjaxParams, isQueryString = false) {
    return this.restfulCommon('post', ajaxParams, isQueryString);
  }
  /**
   * Modified data
   * @param ajaxParams
   * @param isQueryString
   */
  put(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('put', ajaxParams, isQueryString);
  }
  /**
   * Delete data
   * @param ajaxParams
   * @param isQueryString
   */
  delete(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('delete', ajaxParams, isQueryString);
  }
  /**
   * Submit file to server
   * @param ajaxParams
   * @param isQueryString
   */
  formData(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('post', ajaxParams, isQueryString, true);
  }
  /**
   * Download file from server
   * @param ajaxParams
   * @param isQueryString
   */
  download(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon(
      'get',
      ajaxParams,
      isQueryString,
      false,
      'arraybuffer'
    );
  }
  /**
   * common function for data operate
   * @param params variables
   * @param graphQL string type
   */
  common(graphQL: string, variables = {}) {
    axios.defaults.headers.common['Authorization'] =
      'Bearer YZRMMTC1MJKTNJUWNY0ZZDGWLWFKMMITNMVJZJK0NMVKYZBL';
    return axios({
      url: RUN_ENV.API_ENDPOINT,
      method: 'post',
      data: {
        operationName: this.getAPIName(graphQL),
        variables: variables || {},
        query: graphQL
      }
    });
  }
  /**
   * Get API name
   * @param graphQL string type
   */
  getAPIName(graphQL: string) {
    if (!graphQL) {
      log.Error('parameter graphQL is required');
    }
    const graphQLStrArray = graphQL.split(' ');
    return graphQLStrArray[1];
  }
  /**
   * query
   * @param graphQL
   * @param variables
   */
  query(graphQL: string, variables = {}) {
    return this.common(graphQL, variables);
  }
  /**
   * persist data
   * @param graphQL
   * @param variables
   */
  mutation(graphQL: string, variables = {}) {
    return this.common(graphQL, variables);
  }
}
const ajax = new Ajax();
export { Ajax };
export default ajax;
