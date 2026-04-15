import { CreateBase, Form } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";

import { ContratEntretienInputs } from "./ContratEntretienInputs";
import { FormToolbar } from "../layout/FormToolbar";

/**
 * Create screen for the ContratEntretien resource.
 * Defaults statut to "actif" for new contracts.
 */
export const ContratEntretienCreate = () => {
  return (
    <CreateBase redirect="show">
      <div className="mt-2 flex lg:mr-72">
        <div className="flex-1">
          <Form
            defaultValues={{
              statut: "actif",
            }}
          >
            <Card>
              <CardContent>
                <ContratEntretienInputs />
                <FormToolbar />
              </CardContent>
            </Card>
          </Form>
        </div>
      </div>
    </CreateBase>
  );
};
