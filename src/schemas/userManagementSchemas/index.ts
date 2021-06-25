import { IUserPage } from '~@/interface';
/**
 * 分页获取 用户列表
 * @param params
 */
const usersByPageSchema = (params: IUserPage) => {
  const schema = `query usersByPage {
usersByPage(paging:{pageIndex: ${params.pageIndex || 0}, pageSize: ${
  params.pageSize || 10
}, sortKey: "${params.sortKey || 'username'}", isAsc: ${
  params.isAsc
}},filter: {onlineOrNot:${params.onlineOrNot || -1}, roleIds: [${
  params.roleIds || [0, 1]
}], keyword:"${params.keyword || ''}"}) {
  edge{
      id
      name
      username
      roleIds
      createAt
      modifyAt
      deletedAt
      isOnline
      }
    total
    onlineTotal
    roleCounts{
       roleId
       total
    }
  }
}`;
  return schema;
};
const userSelfSchema = () => {
  const schema = `query userSelf{
    userSelf() {
      id
      name
      nick
      username
      roleIds
      }
    }`;
  return schema;
};
const changePwdSchema = (params) => {
  // 修改密码
  const schema = `mutation changePwd {
changePwd(input:{password:"${params.oldpass}",newPassword:"${params.newpass}"})
}
`;
  return schema;
};

const createUserSchema = (params) => {
  // 用户新建
  const schema = `mutation createUser{
    createUser(input:{username: "${params.username}", password: "${params.password}", roleIds: [${params.roleIds}], name:"", nick:""}) {
      id
      name
      nick
      username
      roleIds
    }
  }`;
  return schema;
};

const changeUserShema = (params) => {
  // 编辑用户
  const schema = `mutation updateUser {
    updateUser(id:${params.id},changes:{password:"${params.changes.password}",name:"${params.changes.name}",username:"${params.changes.username}",nick:"${params.changes.nick}",roleIds:[${params.changes.roleIds}]}) {
      id
      name
      username
      roleIds
      nick
    }
  }`;
  return schema;
};

const deleteUserSchema = (params) => {
  // 删除用户
  const schema = `mutation deleteUser{
    deleteUser(id:${params.id})
  }`;
  return schema;
};
const userExitSchema = () => {
  // 用户退出
  const schema = `query userExit{
      userExit
   }`;
  return schema;
};
export {
  usersByPageSchema,
  userSelfSchema,
  changeUserShema,
  createUserSchema,
  changePwdSchema,
  deleteUserSchema,
  userExitSchema
};
