//*************************
//  用户管理
//*************************
import Ajax from '~@/utils/ajax';
import {
  usersByPageSchema,
  userSelfSchema
} from '~@/schemas/userManagementSchemas';
class UserManagement {
  userSelf(params) {
    const variables = {};
    return Ajax.query(userSelfSchema(params), variables);
  }
  userList(params) {
    const variables = {};
    return Ajax.query(usersByPageSchema(params), variables);
  }
}
const instance = new UserManagement();
export { UserManagement };
export default instance;
