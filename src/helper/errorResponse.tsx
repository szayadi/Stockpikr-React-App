interface ErrorMessage {
  'Error Message': string;
}

export const getErrorResponse = (res: unknown): string => {
  if (!res) {
    return '';
  }

  if (typeof res === 'object' && 'Error Message' in res) {
    const errorResponse = res as ErrorMessage;
    return errorResponse['Error Message'];
  }

  return '';
};
