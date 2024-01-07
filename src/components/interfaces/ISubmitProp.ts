
export interface SubmitProp {
  initialValues: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
}