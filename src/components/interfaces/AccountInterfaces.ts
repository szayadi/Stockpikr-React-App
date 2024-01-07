export interface AccountField {
    label: string;
    name: string;
    type: string;
}

export interface AccountFormProps {
  initialValues: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
}