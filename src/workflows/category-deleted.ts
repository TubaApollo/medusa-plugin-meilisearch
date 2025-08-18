import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk'
import { deleteCategoryStep } from './steps/delete-category'

type WorkflowInput = {
  id: string
}

const categoryDeletedWorkflow = createWorkflow('category-deleted', ({ id }: WorkflowInput) => {
  deleteCategoryStep({ id })

  return new WorkflowResponse({})
})

export default categoryDeletedWorkflow
