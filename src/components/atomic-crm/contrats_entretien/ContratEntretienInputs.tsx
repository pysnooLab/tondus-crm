import { required, useTranslate } from "ra-core";
import { DateInput } from "@/components/admin/date-input";
import { NumberInput } from "@/components/admin/number-input";
import { ReferenceInput } from "@/components/admin/reference-input";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { SelectInput } from "@/components/admin/select-input";
import { TextInput } from "@/components/admin/text-input";

/**
 * Shared form inputs for ContratEntretien create and edit screens.
 * Renders all contrat fields with appropriate input types.
 */
export const ContratEntretienInputs = () => {
  const translate = useTranslate();

  const periodiciteChoices = [
    {
      id: "semestrielle",
      name: translate(
        "resources.contrats_entretien.periodicite_choices.semestrielle",
      ),
    },
    {
      id: "annuelle",
      name: translate(
        "resources.contrats_entretien.periodicite_choices.annuelle",
      ),
    },
  ];

  const statutChoices = [
    {
      id: "actif",
      name: translate("resources.contrats_entretien.statut_choices.actif"),
    },
    {
      id: "expire",
      name: translate("resources.contrats_entretien.statut_choices.expire"),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-1">
      <h6 className="text-lg font-semibold">
        {translate("resources.contrats_entretien.name", { smart_count: 1 })}
      </h6>
      <TextInput source="nom" validate={required()} helperText={false} />
      <SelectInput
        source="periodicite"
        choices={periodiciteChoices}
        validate={required()}
        helperText={false}
      />
      <NumberInput
        source="prix"
        validate={required()}
        helperText={false}
        min={0}
        step={0.01}
      />
      <DateInput source="date_debut" validate={required()} helperText={false} />
      <DateInput source="date_fin" validate={required()} helperText={false} />
      <SelectInput
        source="statut"
        choices={statutChoices}
        validate={required()}
        helperText={false}
      />
      <ReferenceInput source="tondeuse_id" reference="tondeuses">
        <AutocompleteInput optionText="nom" helperText={false} />
      </ReferenceInput>
    </div>
  );
};
