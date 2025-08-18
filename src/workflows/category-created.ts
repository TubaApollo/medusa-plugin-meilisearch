import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk'
import { upsertCategoryStep } from './steps/upsert-category'

type WorkflowInput = {
  id: string
}

const categoryCreatedWorkflow = createWorkflow('category-created', ({ id }: WorkflowInput) => {
  const { categories } = upsertCategoryStep({ id })

  return new WorkflowResponse({
    categories,
  })
})

export default categoryCreatedWorkflow
