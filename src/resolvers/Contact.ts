import { objectType } from "nexus";

export const Contact = objectType({
  name: "Contact",
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.phone();
    t.model.email();
    t.model.street();
    t.model.zipCode();
    t.model.city();
  }
});
