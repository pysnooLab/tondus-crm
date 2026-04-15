import { useTranslate } from "ra-core";
import { CreateButton } from "@/components/admin/create-button";
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { Badge } from "@/components/ui/badge";

import { TopToolbar } from "../layout/TopToolbar";
import type { ContratEntretien } from "../types";

/**
 * List screen for the ContratEntretien resource.
 * Displays nom, periodicite, prix, date_debut, date_fin, statut, and
 * tondeuse (via ReferenceField) columns.
 */
export const ContratEntretienList = () => {
  return (
    <List
      title={false}
      actions={<ContratEntretienListActions />}
      perPage={25}
      sort={{ field: "nom", order: "ASC" }}
    >
      <DataTable<ContratEntretien> rowClick="show" bulkActionButtons={false}>
        <DataTable.Col<ContratEntretien> source="nom" />
        <DataTable.Col<ContratEntretien>
          source="periodicite"
          render={(record) => <PeriodiciteBadge value={record.periodicite} />}
        />
        <DataTable.Col<ContratEntretien>
          source="prix"
          headerClassName="text-right"
          cellClassName="text-right"
        />
        <DataTable.Col<ContratEntretien> source="date_debut" />
        <DataTable.Col<ContratEntretien> source="date_fin" />
        <DataTable.Col<ContratEntretien>
          source="statut"
          render={(record) => <StatutBadge statut={record.statut} />}
        />
        <DataTable.Col<ContratEntretien>
          source="tondeuse_id"
          render={() => (
            <ReferenceField source="tondeuse_id" reference="tondeuses" />
          )}
        />
      </DataTable>
    </List>
  );
};

/** Renders a periodicite value as a colored Badge. */
const PeriodiciteBadge = ({
  value,
}: {
  value: ContratEntretien["periodicite"];
}) => {
  const translate = useTranslate();
  return (
    <Badge variant="outline">
      {translate(
        `resources.contrats_entretien.periodicite_choices.${value}`,
      )}
    </Badge>
  );
};

/** Renders a statut value as a colored Badge. */
const StatutBadge = ({ statut }: { statut: ContratEntretien["statut"] }) => {
  const translate = useTranslate();
  return (
    <Badge
      variant={statut === "actif" ? "default" : "destructive"}
      className={statut === "actif" ? "bg-green-600 hover:bg-green-600" : ""}
    >
      {translate(`resources.contrats_entretien.statut_choices.${statut}`)}
    </Badge>
  );
};

const ContratEntretienListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
