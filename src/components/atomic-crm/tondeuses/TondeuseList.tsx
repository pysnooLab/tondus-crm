import { useTranslate } from "ra-core";
import { CreateButton } from "@/components/admin/create-button";
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { Badge } from "@/components/ui/badge";

import { TopToolbar } from "../layout/TopToolbar";
import type { Tondeuse } from "../types";

/**
 * List screen for the Tondeuse resource.
 * Displays nom, prix, and actif columns with Badge for active status.
 */
export const TondeuseList = () => {
  return (
    <List
      title={false}
      actions={<TondeuseListActions />}
      perPage={25}
      sort={{ field: "nom", order: "ASC" }}
    >
      <DataTable<Tondeuse> rowClick="show" bulkActionButtons={false}>
        <DataTable.Col<Tondeuse> source="nom" />
        <DataTable.Col<Tondeuse>
          source="prix"
          headerClassName="text-right"
          cellClassName="text-right"
        />
        <DataTable.Col<Tondeuse>
          source="actif"
          render={(record) => <ActifBadge actif={record.actif} />}
        />
      </DataTable>
    </List>
  );
};

/** Renders an actif status as a colored Badge. */
const ActifBadge = ({ actif }: { actif: boolean }) => {
  const translate = useTranslate();
  return (
    <Badge
      variant={actif ? "default" : "destructive"}
      className={actif ? "bg-green-600 hover:bg-green-600" : ""}
    >
      {actif
        ? translate("resources.tondeuses.actif_status.active")
        : translate("resources.tondeuses.actif_status.inactive")}
    </Badge>
  );
};

const TondeuseListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
