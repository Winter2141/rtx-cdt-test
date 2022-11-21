'use strict'

import { Router } from 'express';

// 4. Import routes

import externalRouter from './externalAPI.js';

const router = Router({
  caseSensitive: true
})

// 5. Use imported routes in router
router.use(externalRouter)

export default router;