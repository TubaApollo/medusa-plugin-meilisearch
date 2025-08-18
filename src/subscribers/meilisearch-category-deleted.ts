import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import categoryDeletedWorkflow from '../workflows/category-deleted'

export default async function meilisearchCategoryDeletedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await categoryDeletedWorkflow.run({
    input: {
      id: data.id,
    },
    container,
  })
}

export const config: SubscriberConfig = {
  event: 'product_category.deleted',
}
