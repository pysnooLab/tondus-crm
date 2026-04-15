import { EditBase, Form, useEditContext } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";

import type { ContratEntretien } from "../types";
import { ContratEntretienInputs } from "./ContratEntretienInputs";
import { FormToolbar } from "../layout/FormToolbar";

/**
 * Edit screen for the ContratEntretien resource.
 * Pre-populates the form with existing contract data.
 */
export const ContratEntretienEdit = () => (
  <EditBase redirect="show">
    <ContratEntretienEditContent />
  </EditBase>
);

const ContratEntretienEditContent = () => {
  const { isPending, record } = useEditContext<ContratEntretien>();
  if (isPending || !record) return null;

  return (
    <div className="mt-2 flex gap-8">
      <Form className="flex flex-1 flex-col gap-4">
        <Card>
          <CardContent>
            <ContratEntretienInputs />
            <FormToolbar />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};
