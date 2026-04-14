import { required, useTranslate } from "ra-core";
import { BooleanInput } from "@/components/admin/boolean-input";
import { NumberInput } from "@/components/admin/number-input";
import { TextInput } from "@/components/admin/text-input";

/**
 * Shared form inputs for Tondeuse create and edit screens.
 * Renders nom (required), prix (required), description, and actif fields.
 */
export const TondeuseInputs = () => {
  const translate = useTranslate();

  return (
    <div className="flex flex-col gap-4 p-1">
      <h6 className="text-lg font-semibold">
        {translate("resources.tondeuses.name", { smart_count: 1 })}
      </h6>
      <TextInput source="nom" validate={required()} helperText={false} />
      <NumberInput
        source="prix"
        validate={required()}
        helperText={false}
        min={0}
        step={0.01}
      />
      <TextInput source="description" multiline helperText={false} />
      <BooleanInput source="actif" helperText={false} />
    </div>
  );
};
