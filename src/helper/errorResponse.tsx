export const getErrorResponse = (res: any): string => {
  if (res == null) {
    return '';
  }
  return res['Error Message'];
};
