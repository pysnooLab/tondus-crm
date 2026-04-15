import { CanAccess, ShowBase, useShowContext, useTranslate } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditButton } from "@/components/admin/edit-button";
import { DeleteButton } from "@/components/admin/delete-button";

import type { Tondeuse } from "../types";

/**
 * Show/detail screen for the Tondeuse resource.
 * Displays all tondeuse fields and a delete button gated behind CanAccess.
 */
export const TondeuseShow = () => (
  <ShowBase>
    <TondeuseShowContent />
  </ShowBase>
);

const TondeuseShowContent = () => {
  const translate = useTranslate();
  const { record, isPending } = useShowContext<Tondeuse>();

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
                <CanAccess resource="tondeuses" action="delete">
                  <DeleteButton />
                </CanAccess>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.tondeuses.fields.nom")}
                </p>
                <p className="font-medium">{record.nom}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.tondeuses.fields.prix")}
                </p>
                <p className="font-medium">{record.prix}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {translate("resources.tondeuses.fields.actif")}
                </p>
                <Badge
                  variant={record.actif ? "default" : "destructive"}
                  className={
                    record.actif ? "bg-green-600 hover:bg-green-600" : ""
                  }
                >
                  {record.actif
                    ? translate("resources.tondeuses.actif_status.active")
                    : translate("resources.tondeuses.actif_status.inactive")}
                </Badge>
              </div>

              {record.description ? (
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">
                    {translate("resources.tondeuses.fields.description")}
                  </p>
                  <p className="font-medium whitespace-pre-line">
                    {record.description}
                  </p>
                </div>
              ) : null}

              {record.date_creation ? (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {translate("resources.tondeuses.fields.date_creation")}
                  </p>
                  <p className="font-medium">
                    {new Date(record.date_creation).toLocaleDateString()}
                  </p>
                </div>
              ) : null}

              {record.date_fin ? (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {translate("resources.tondeuses.fields.date_fin")}
                  </p>
                  <p className="font-medium">
                    {new Date(record.date_fin).toLocaleDateString()}
                  </p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
