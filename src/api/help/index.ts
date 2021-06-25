//*************************
//  帮助
//*************************
import Ajax from '~@/utils/ajax';
import { FAQSchema } from '~@/schemas/helpSchemas';
class Help {
  getFAQ(params) {
    return Ajax.query(params, FAQSchema);
  }
}
const instance = new Help();
export { Help };
export default instance;
