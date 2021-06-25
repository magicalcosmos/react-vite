//*************************
// 验证项目
//*************************
import Ajax from '~@/utils/ajax';
import { FAQSchema } from '~@/schemas/helpSchemas';
class VerifyProject {
  getFAQ(params) {
    return Ajax.query(params, FAQSchema);
  }
}
const instance = new VerifyProject();
export { VerifyProject };
export default instance;
