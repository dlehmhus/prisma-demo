import { objectType } from "nexus";

export const IngredientCategory = objectType({
  name: "IngredientCategory",
  definition(t) {
    t.model.id();
    t.model.position();
    t.model.name();
    t.model.createdAt();
    t.model.ingredients({ pagination: false });
  }
});
