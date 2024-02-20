import {IAccountValues} from './IAccountValues';

export interface ISubmitProp {
  initialValues: { [key: string]: string };
  onSubmit: (values: IAccountValues) => void;
}
