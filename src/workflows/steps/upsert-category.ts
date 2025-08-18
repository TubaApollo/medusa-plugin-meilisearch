import { createStep, StepResponse } from '@medusajs/workflows-sdk'
import { SearchUtils } from '@medusajs/utils'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../../modules/meilisearch'

type StepInput = {
  id: string
}

export const upsertCategoryStep = createStep('upsert-categories', async ({ id }: StepInput, { container }) => {
  const queryService = container.resolve('query')
  const meilisearchService: MeiliSearchService = container.resolve(MEILISEARCH_MODULE)

  const categoryFields = await meilisearchService.getFieldsForType(SearchUtils.indexTypes.PRODUCT_CATEGORIES)
  const categoryIndexes = await meilisearchService.getIndexesByType(SearchUtils.indexTypes.PRODUCT_CATEGORIES)

  const { data: categories } = await queryService.graph({
    entity: 'product_category',
    fields: categoryFields,
    filters: { id },
  })

  await Promise.all(
    categories.map(async (category) => {
      await Promise.all(categoryIndexes.map((indexKey) => meilisearchService.addDocuments(indexKey, [category])))
    }),
  )

  return new StepResponse({
    categories,
  })
})
