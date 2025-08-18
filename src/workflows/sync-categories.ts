import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk'
import { syncCategoriesStep } from './steps/sync-categories'

type SyncCategoriesWorkflowInput = {
  filters?: Record<string, unknown>
  limit?: number
  offset?: number
}

export const syncCategoriesWorkflow = createWorkflow(
  'sync-categories',
  ({ filters, limit, offset }: SyncCategoriesWorkflowInput) => {
    const { categories } = syncCategoriesStep({ filters, limit, offset })

    return new WorkflowResponse({
      categories,
    })
  },
)
