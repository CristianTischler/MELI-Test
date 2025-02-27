const express = require("express");
import { getItemDetails, searchItems } from "../repository/ItemRepository";

const router = express.Router();

const handleError = (res: any, errorMessage: string, statusCode = 500) => {
  res.status(statusCode).json({ error: errorMessage });
};

router.get("/items", async (req: any, res: any) => {
  try {
    const searchQuery =
      typeof req.query.q === "string" ? req.query.q.trim() : "";

    if (!searchQuery) {
      return handleError(res, "Error: La búsqueda no puede estar vacía.", 400);
    }

    const result = await searchItems(searchQuery);
    res.json(result);
  } catch (error) {
    console.error("Error en /items:", error);
    handleError(res, "Error al tratar de encontrar los items.");
  }
});

router.get("/items/:id", async (req: any, res: any) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      return handleError(res, "Error: El ID del item es obligatorio.", 400);
    }

    const result = await getItemDetails(itemId);
    res.json(result);
  } catch (error) {
    console.error(`Error en /items/${req.params.id}:`, error);
    handleError(res, `Error al obtener detalles del item ${req.params.id}.`);
  }
});

module.exports = router;
