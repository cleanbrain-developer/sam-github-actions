import { Router } from 'express'
import { deployController } from '../controllers/deploy.controller'

const router = Router()

router.get('', deployController.root)
router.post('/deploy', deployController.deploy)

export default router
