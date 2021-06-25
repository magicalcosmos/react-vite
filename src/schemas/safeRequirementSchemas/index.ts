const safeRequirementSchema = () => {
  // 安全需求下拉框
  const schema = `query safeRequirements {
    safeRequirements{
      id
      name
      description
    }
  }`;
  return schema;
};
const projectFileUploadSchema = (params) => {
  // 文件上传
  const schema = `mutation projectFile{
      projectFile(input:{projectid: "${params.projectid}", file: "${params.file}"}) {projectid,file}}`;
  return schema;
};

const licenseInfoSchema = () => {
  // 获取许可证信息
  const schema = `query licenseInfo {
    licenseInfo {
      id
      userLimit
      companyName
      description
      expireTime
      status
    }
  }`;
  return schema;
};
const machineInfoPassSchema = () => {
  // 许可证机器码！！！
  const schema = `query machineInfo {
    machineInfo {
      code
    }
  }`;
  return schema;
};
const licenseUploadSchema = () => {
  const schema = `{"query":"mutation($file:Upload!){licenseUpload(file:$file){
    id
    expireTime
    userLimit
  }
}",
"variables":{"file":null}}`;
  return schema;
};

export {
  safeRequirementSchema,
  projectFileUploadSchema,
  licenseInfoSchema,
  machineInfoPassSchema,
  licenseUploadSchema
};
