import {
  CanAccess,
  ShowBase,
  useShowContext,
  useTranslate,
  useGetOne,
} from "ra-core";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditButton } from "@/components/admin/edit-button";
import { DeleteButton } from "@/components/admin/delete-button";

import type { ContratEntretien, Tondeuse } from "../types";

/**
 * Show/detail screen for the ContratEntretien resource.
 * Displays all contract fields and a delete button gated behind CanAccess.
 */
export const ContratEntretienShow = () => (
  <ShowBase>
    <ContratEntretienShowContent />
  </ShowBase>
);

const ContratEntretienShowContent = () => {
  const translate = useTranslate();
  const { record, isPending } = useShowContext<ContratEntretien>();

  const { data: tondeuse } = useGetOne<Tondeuse>(
    "tondeuses",
    { id: record?.tondeuse_id ?? "" },
    { enabled: !!record?.tondeuse_id },
  );

  if (isPending || !record) return null;

  return (
    <div className="mt-2 mb-2 flex gap-8">
      <div className="flex-1">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h5 className="text-xl font-semibold">{record.nom}</h5>
              <div className="flex items-center gap-2">
                <EditButton />
                <CanAccess resource="contrats_entretien" action="delete">
                  <DeleteButton />
                </CanAccess>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.contrats_entretien.fields.nom")}
                </p>
                <p className="font-medium">{record.nom}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate(
                    "resources.contrats_entretien.fields.periodicite",
                  )}
                </p>
                <Badge variant="outline">
                  {translate(
                    `resources.contrats_entretien.periodicite_choices.${record.periodicite}`,
                  )}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.contrats_entretien.fields.prix")}
                </p>
                <p className="font-medium">{record.prix}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.contrats_entretien.fields.statut")}
                </p>
                <Badge
                  variant={
                    record.statut === "actif" ? "default" : "destructive"
                  }
                  className={
                    record.statut === "actif"
                      ? "bg-green-600 hover:bg-green-600"
                      : ""
                  }
                >
                  {translate(
                    `resources.contrats_entretien.statut_choices.${record.statut}`,
                  )}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.contrats_entretien.fields.date_debut")}
                </p>
                <p className="font-medium">
                  {new Date(record.date_debut).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.contrats_entretien.fields.date_fin")}
                </p>
                <p className="font-medium">
                  {new Date(record.date_fin).toLocaleDateString()}
                </p>
              </div>

              {tondeuse ? (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {translate(
                      "resources.contrats_entretien.fields.tondeuse_id",
                    )}
                  </p>
                  <p className="font-medium">{tondeuse.nom}</p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
