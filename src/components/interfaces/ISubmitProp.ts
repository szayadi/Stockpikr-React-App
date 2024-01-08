
export interface ISubmitProp {
  initialValues: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
}