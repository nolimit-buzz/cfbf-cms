import { generateUniqueRef } from '../../utils/ref';

// Every entry gets a short, human-quotable reference. The frontend never sends
// one, so it is filled in here rather than being required by the schema.
export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (!data.ref) {
      data.ref = await generateUniqueRef(strapi);
    }
  },
};
