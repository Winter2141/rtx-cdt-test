'use strict'

import { Router } from 'express';
import handler from './handlers/externalAPIHandler.js';

const externalRouter = Router();

externalRouter.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      // 6. Call handler to response with data
      const { getListFromAPI } = handler;
      const result = await getListFromAPI();
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
)

export default externalRouter;