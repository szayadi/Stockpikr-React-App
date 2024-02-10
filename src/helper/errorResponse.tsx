export const getErrorResponse = (res: any): string => {
  if (!res) {
    return '';
  }
  return res['Error Message'];
};
