import type { Tondeuse } from "../types";
import { TondeuseCreate } from "./TondeuseCreate";
import { TondeuseEdit } from "./TondeuseEdit";
import { TondeuseList } from "./TondeuseList";
import { TondeuseShow } from "./TondeuseShow";

export default {
  list: TondeuseList,
  show: TondeuseShow,
  edit: TondeuseEdit,
  create: TondeuseCreate,
  recordRepresentation: (record: Tondeuse) => record?.nom,
};
