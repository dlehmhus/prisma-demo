import { objectType } from "nexus";

export const Store = objectType({
  name: "Store",
  definition(t) {
    t.model.id();
    t.model.districts();
    t.model.position();
    t.model.open();
    t.model.name();
    t.model.emails();
    t.model.contact();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
