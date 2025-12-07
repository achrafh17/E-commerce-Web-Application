
export function successResponse(
  message: string,
  data: any = null,
  statusCode = 200,
) {
  return {
    status: 'success',
    statusCode,
    message,
    data,
  };
}
