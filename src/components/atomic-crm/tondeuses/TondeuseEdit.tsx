import { EditBase, Form, useEditContext } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";

import type { Tondeuse } from "../types";
import { TondeuseInputs } from "./TondeuseInputs";
import { FormToolbar } from "../layout/FormToolbar";

/**
 * Edit screen for the Tondeuse resource.
 * Pre-populates the form with existing tondeuse data.
 */
export const TondeuseEdit = () => (
  <EditBase redirect="show">
    <TondeuseEditContent />
  </EditBase>
);

const TondeuseEditContent = () => {
  const { isPending, record } = useEditContext<Tondeuse>();
  if (isPending || !record) return null;

  return (
    <div className="mt-2 flex gap-8">
      <Form className="flex flex-1 flex-col gap-4">
        <Card>
          <CardContent>
            <TondeuseInputs />
            <FormToolbar />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};
