import { createStep, StepResponse } from '@medusajs/workflows-sdk'
import { SearchUtils } from '@medusajs/utils'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../../modules/meilisearch'

type StepInput = {
  id: string
}

export const deleteCategoryStep = createStep('delete-categories', async ({ id }: StepInput, { container }) => {
  const meilisearchService: MeiliSearchService = container.resolve(MEILISEARCH_MODULE)

  const categoryIndexes = await meilisearchService.getIndexesByType(SearchUtils.indexTypes.PRODUCT_CATEGORIES)

  await Promise.all(
    categoryIndexes.map((indexKey) => meilisearchService.deleteDocument(indexKey, id)),
  )

  return new StepResponse()
})
