import { objectType } from "nexus";

export const Ingredient = objectType({
  name: "Ingredient",
  definition(t) {
    t.model.id();
    t.model.position();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.name();
    t.model.image();
    t.model.ingredientCategory({});
  }
});
