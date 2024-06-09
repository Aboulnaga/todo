import { Router } from "express";
import getAllCatsCN from "../Controllers/categories/getAllCatsCN.js";
import addNewCategoryCN from "../Controllers/categories/addNewCategoryCN.js";
import deleteCategoryByIdCN from "../Controllers/categories/deleteCategoryByIdCN.js";
import pathcCategoryByIdCN from "../Controllers/categories/pathcCategoryByIdCN.js";
import CatModel from "../Model/catModel.js";

const router = Router();
export default router;

// @Disc: get all cats list controller
// @From folder controllers > categories
router.get("/api/categories", getAllCatsCN);

// @Disc: add new category controller
// @From folder controllers > categories
router.post("/api/categories", addNewCategoryCN);

// @Disc: delete category by id
// @From folder controllers > categories
router.delete("/api/categories/:id", deleteCategoryByIdCN);

// @Disc: patch category by id
// @From folder controllers > categories
router.patch("/api/categories/:id", pathcCategoryByIdCN);
