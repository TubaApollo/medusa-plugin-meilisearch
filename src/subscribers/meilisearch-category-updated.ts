import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import categoryUpdatedWorkflow from '../workflows/category-updated'

export default async function meilisearchCategoryUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await categoryUpdatedWorkflow.run({
    input: {
      id: data.id,
    },
    container,
  })
}

export const config: SubscriberConfig = {
  event: 'product_category.updated',
}
