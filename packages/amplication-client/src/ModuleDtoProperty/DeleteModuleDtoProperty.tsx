import { ConfirmationDialog, Snackbar } from "@amplication/ui/design-system";
import { useCallback, useState } from "react";
import { Button, EnumButtonStyle } from "../Components/Button";
import * as models from "../models";
import { formatError } from "../util/error";
import useModuleDtoProperty from "./hooks/useModuleDtoProperty";

const CONFIRM_BUTTON = { label: "Delete" };
const DISMISS_BUTTON = { label: "Dismiss" };

type Props = {
  moduleDtoProperty: models.ModuleDtoProperty;
  onPropertyDelete?: (property: models.ModuleDtoProperty) => void;
};

export const DeleteModuleDtoProperty = ({
  moduleDtoProperty,
  onPropertyDelete,
}: Props) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const { deleteModuleDtoProperty, deleteModuleDtoPropertyError } =
    useModuleDtoProperty();

  const hasError = Boolean(deleteModuleDtoPropertyError);
  const errorMessage = formatError(deleteModuleDtoPropertyError);

  const handleDelete = useCallback(
    (event) => {
      event.stopPropagation();
      setConfirmDelete(true);
    },
    [setConfirmDelete]
  );

  const handleDismissDelete = useCallback(() => {
    setConfirmDelete(false);
  }, [setConfirmDelete]);

  const handleConfirmDelete = useCallback(() => {
    setConfirmDelete(false);
    deleteModuleDtoProperty({
      variables: {
        where: {
          id: moduleDtoProperty.name,
        },
      },
    })
      .catch(console.error)
      .then(() => {
        if (onPropertyDelete) {
          onPropertyDelete(moduleDtoProperty);
        }
      });
  }, [deleteModuleDtoProperty, moduleDtoProperty, onPropertyDelete]);

  return (
    <>
      <ConfirmationDialog
        isOpen={confirmDelete}
        title={`Delete '${moduleDtoProperty.name}' ?`}
        confirmButton={CONFIRM_BUTTON}
        dismissButton={DISMISS_BUTTON}
        message={<div>Are you sure you want to delete this property?</div>}
        onConfirm={handleConfirmDelete}
        onDismiss={handleDismissDelete}
      />

      <Button
        buttonStyle={EnumButtonStyle.Text}
        icon="trash_2"
        onClick={handleDelete}
        type="button"
      ></Button>
      <Snackbar open={hasError} message={errorMessage} />
    </>
  );
};
