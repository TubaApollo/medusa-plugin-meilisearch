import { SearchUtils as MedusaSearchUtils } from '@medusajs/utils'

export const SearchUtils = {
  ...MedusaSearchUtils,
  indexTypes: {
    ...MedusaSearchUtils.indexTypes,
    PRODUCT_CATEGORIES: 'product_categories',
  },
}
