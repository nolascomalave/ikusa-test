import express from "express";
import { getAll, getByID, add, update, deleteById } from '../controllers/products';

// Validations Middlewares:
import { handlerAdd, handlerUpdate } from '../errorsHandlers/products';

// Inicialización del router:
const router = express.Router();

// ---------------------------------------------------------------------------------
// ----- Rutas:
// ---------------------------------------------------------------------------------

// Returns all products sorted by their names:
router.get('/', getAll);

// Return the product especified by its _id:
router.get('/:ID', getByID);

// Add new product and return the same product:
router.post('/', handlerAdd, add);

// Update the product and return the same updated:
router.put('/:ID', handlerUpdate, update);

// Update the product and return the same updated:
router.delete('/:ID', deleteById);

export default router;