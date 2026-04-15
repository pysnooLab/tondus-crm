import { CreateBase, Form } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";

import { TondeuseInputs } from "./TondeuseInputs";
import { FormToolbar } from "../layout/FormToolbar";

/**
 * Create screen for the Tondeuse resource.
 * Defaults actif to true for new tondeuses.
 */
export const TondeuseCreate = () => {
  return (
    <CreateBase redirect="show">
      <div className="mt-2 flex lg:mr-72">
        <div className="flex-1">
          <Form
            defaultValues={{
              actif: true,
            }}
          >
            <Card>
              <CardContent>
                <TondeuseInputs />
                <FormToolbar />
              </CardContent>
            </Card>
          </Form>
        </div>
      </div>
    </CreateBase>
  );
};
