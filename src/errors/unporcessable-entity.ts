import { StatusCodes }from 'http-status-codes';
import CustomAPIError from'./custom-api';

class UnprosssableEntityError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

export default UnprosssableEntityError;