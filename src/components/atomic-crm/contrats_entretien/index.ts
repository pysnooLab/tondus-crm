import type { ContratEntretien } from "../types";
import { ContratEntretienCreate } from "./ContratEntretienCreate";
import { ContratEntretienEdit } from "./ContratEntretienEdit";
import { ContratEntretienList } from "./ContratEntretienList";
import { ContratEntretienShow } from "./ContratEntretienShow";

export default {
  list: ContratEntretienList,
  show: ContratEntretienShow,
  edit: ContratEntretienEdit,
  create: ContratEntretienCreate,
  recordRepresentation: (record: ContratEntretien) => record?.nom,
};
